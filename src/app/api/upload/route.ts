import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { rateLimit, getIP } from "@/lib/rateLimit";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function getR2Client(): S3Client | null {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function POST(req: NextRequest) {
  const blocked = rateLimit(req, "upload");
  if (blocked) return blocked;

  // Content-Length hard cap before reading body
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  try {
    const R2 = getR2Client();
    if (!R2) {
      return NextResponse.json(
        { error: "Filopplasting er ikke konfigurert" },
        { status: 500 }
      );
    }

    const bucketName = process.env.R2_BUCKET_NAME;
    const publicDomain = process.env.R2_PUBLIC_DOMAIN;

    if (!bucketName || !publicDomain) {
      return NextResponse.json(
        { error: "Filopplasting er ikke konfigurert" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "Ingen fil mottatt" },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "Kategori mangler" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "unsupported_media_type" },
        { status: 415 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "payload_too_large" },
        { status: 413 }
      );
    }

    // Generate unique file key
    const fileId = crypto.randomUUID();
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const key = `${category}/${fileId}.${ext}`;

    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ContentLength: file.size,
    });

    await R2.send(command);

    // Public URL for accessing the file
    const publicUrl = `https://${publicDomain}/${key}`;

    const ip = getIP(req);
    console.log(`[upload] ip=${ip.slice(0, 8)}*** ok size=${file.size}`);

    return NextResponse.json({
      key,
      size: file.size,
      contentType: file.type,
      publicUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Kunne ikke laste opp fil" },
      { status: 500 }
    );
  }
}
