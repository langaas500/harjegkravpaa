import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType, fileSize, category } = await req.json();

    // Validate file type
    if (!ALLOWED_TYPES.includes(fileType)) {
      return NextResponse.json(
        { error: "Filtype ikke støttet. Bruk JPG, PNG, WebP, HEIC eller PDF." },
        { status: 400 }
      );
    }

    // Validate file size
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Filen er for stor. Maks 10MB." },
        { status: 400 }
      );
    }

    // Generate unique file key
    const fileId = crypto.randomUUID();
    const ext = fileName.split(".").pop()?.toLowerCase() || "bin";
    const key = `${category}/${fileId}.${ext}`;

    // Create presigned URL for direct upload
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
      ContentLength: fileSize,
    });

    const presignedUrl = await getSignedUrl(R2, command, { expiresIn: 300 }); // 5 min

    // Public URL for accessing the file later
    const publicUrl = `https://${process.env.R2_PUBLIC_DOMAIN}/${key}`;

    return NextResponse.json({
      presignedUrl,
      key,
      publicUrl,
    });
  } catch (error) {
    console.error("Upload presign error:", error);
    return NextResponse.json(
      { error: "Kunne ikke generere opplastingslenke" },
      { status: 500 }
    );
  }
}
