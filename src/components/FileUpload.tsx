"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, X, FileText, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";

interface UploadedFile {
  key: string;
  name: string;
  type: string;
  publicUrl: string;
}

interface FileUploadProps {
  category: string;
  maxFiles?: number;
  onFilesChange: (files: UploadedFile[]) => void;
  files: UploadedFile[];
}

export default function FileUpload({
  category,
  maxFiles = 5,
  onFilesChange,
  files,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File): Promise<UploadedFile | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Opplasting feilet");
      }

      return {
        key: data.key,
        name: file.name,
        type: data.contentType,
        publicUrl: data.publicUrl,
      };
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const remainingSlots = maxFiles - files.length;
      if (remainingSlots <= 0) {
        setError(`Maks ${maxFiles} filer tillatt`);
        return;
      }

      setError(null);
      setIsUploading(true);

      const filesToUpload = Array.from(fileList).slice(0, remainingSlots);
      const uploadedFiles: UploadedFile[] = [];

      for (const file of filesToUpload) {
        const uploaded = await uploadFile(file);
        if (uploaded) {
          uploadedFiles.push(uploaded);
        }
      }

      if (uploadedFiles.length > 0) {
        onFilesChange([...files, ...uploadedFiles]);
      }

      if (uploadedFiles.length < filesToUpload.length) {
        setError("Noen filer kunne ikke lastes opp");
      }

      setIsUploading(false);
    },
    [files, maxFiles, onFilesChange, category]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = (key: string) => {
    onFilesChange(files.filter((f) => f.key !== key));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4 text-blue-400" />;
    }
    return <FileText className="h-4 w-4 text-orange-400" />;
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${
          dragActive
            ? "border-teal-500 bg-teal-500/10"
            : "border-white/20 hover:border-white/30 bg-white/[0.02]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
            <p className="text-sm text-slate-400">Laster opp...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-slate-500" />
            <p className="text-sm text-slate-400">
              Dra filer hit eller klikk for å velge
            </p>
            <p className="text-xs text-slate-600">
              JPG, PNG, WebP, HEIC eller PDF (maks 10MB per fil)
            </p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Uploaded files */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.key}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                {getFileIcon(file.type)}
                <span className="text-sm text-slate-300 truncate">{file.name}</span>
              </div>
              <button
                onClick={() => removeFile(file.key)}
                className="p-1 hover:bg-white/10 rounded transition"
              >
                <X className="h-4 w-4 text-slate-500 hover:text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* File count */}
      <p className="text-xs text-slate-600">
        {files.length} av {maxFiles} filer lastet opp
      </p>
    </div>
  );
}
