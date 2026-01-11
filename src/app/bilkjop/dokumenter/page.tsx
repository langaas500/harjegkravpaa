"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  File,
  Camera,
  MessageSquare,
  Wrench,
  Receipt,
  HelpCircle,
} from "lucide-react";
import {
  StoredDocument,
  DocumentCategory,
  CATEGORY_LABELS,
  saveDocument,
  getAllDocuments,
  deleteDocument,
  fileToStoredDocument,
} from "@/lib/documentStorage";

const CATEGORY_ICONS: Record<DocumentCategory, React.ReactNode> = {
  kontrakt: <Receipt className="h-5 w-5" />,
  rapport: <FileText className="h-5 w-5" />,
  verksted: <Wrench className="h-5 w-5" />,
  bilder: <Camera className="h-5 w-5" />,
  kommunikasjon: <MessageSquare className="h-5 w-5" />,
  feilkoder: <FileText className="h-5 w-5" />,
  annet: <HelpCircle className="h-5 w-5" />,
};

const CATEGORY_ORDER: DocumentCategory[] = [
  "kontrakt",
  "rapport",
  "verksted",
  "bilder",
  "kommunikasjon",
  "feilkoder",
  "annet",
];

export default function DokumenterPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<StoredDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>("kontrakt");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await getAllDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error("Failed to load documents:", err);
      setError("Kunne ikke laste dokumenter");
    } finally {
      setIsLoading(false);
    }
  };

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
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      await uploadFiles(files);
    },
    [selectedCategory]
  );

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await uploadFiles(files);
    e.target.value = "";
  };

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      for (const file of files) {
        if (file.size > 10 * 1024 * 1024) {
          setError(`${file.name} er for stor (maks 10MB)`);
          continue;
        }

        const allowedTypes = [
          // PDF
          "application/pdf",
          // Bilder
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/heic",
          "image/svg+xml",
          "image/gif",
          // Word
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          // Excel
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          // Tekst
          "text/plain",
          // HTML
          "text/html",
        ];

        if (!allowedTypes.includes(file.type)) {
          setError(`${file.name} har ugyldig filtype`);
          continue;
        }

        const doc = await fileToStoredDocument(file, selectedCategory);
        await saveDocument(doc);
      }

      await loadDocuments();
      setSuccess(`${files.length} fil(er) lastet opp`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Kunne ikke laste opp fil(er)");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id);
      await loadDocuments();
      setSuccess("Dokument slettet");
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Kunne ikke slette dokument");
    }
  };

  const getDocumentsByCategory = (category: DocumentCategory) => {
    return documents.filter((doc) => doc.category === category);
  };

  const getTotalCount = () => documents.length;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <main className="bg-nordic text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </main>
    );
  }

  return (
    <main className="bg-nordic text-white">
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake
          </button>
          <span className="text-sm text-slate-500">
            {getTotalCount()} dokument{getTotalCount() !== 1 ? "er" : ""}
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Samle dokumentasjon</h1>
          <p className="text-slate-400">
            Last opp bevis og dokumenter for å styrke saken din. Alt samles i én PDF.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-green-500/30 bg-green-500/10">
            <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
            <p className="text-sm text-green-400">{success}</p>
          </div>
        )}

        {/* Category selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300">
            Velg kategori for opplasting
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 p-3 rounded-xl border transition text-left ${
                  selectedCategory === cat
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 hover:border-white/30 text-slate-400 hover:text-white"
                }`}
              >
                {CATEGORY_ICONS[cat]}
                <span className="text-sm truncate">{CATEGORY_LABELS[cat]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upload zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition ${
            dragActive
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-white/20 hover:border-white/40"
          }`}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.svg,.gif,.doc,.docx,.xls,.xlsx,.txt,.html"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-emerald-400" />
              <p className="text-slate-400">Laster opp...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-white/5">
                <Upload className="h-8 w-8 text-slate-400" />
              </div>
              <div>
                <p className="font-medium">
                  Dra filer hit eller <span className="text-emerald-400">klikk for å velge</span>
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  PDF, bilder, Word, Excel, tekst (maks 10MB per fil)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Document list by category */}
        <div className="space-y-6">
          {CATEGORY_ORDER.map((category) => {
            const docs = getDocumentsByCategory(category);
            if (docs.length === 0) return null;

            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  {CATEGORY_ICONS[category]}
                  <span className="font-medium">{CATEGORY_LABELS[category]}</span>
                  <span className="text-sm text-slate-600">({docs.length})</span>
                </div>

                <div className="grid gap-2">
                  {docs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5"
                    >
                      {/* Thumbnail or icon */}
                      <div className="shrink-0">
                        {doc.thumbnail ? (
                          <img
                            src={doc.thumbnail}
                            alt={doc.fileName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : doc.fileType === "application/pdf" ? (
                          <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-red-400" />
                          </div>
                        ) : doc.fileType.includes("word") || doc.fileType.includes("document") ? (
                          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-blue-400" />
                          </div>
                        ) : doc.fileType.includes("sheet") || doc.fileType.includes("excel") ? (
                          <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-green-400" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                            <File className="h-6 w-6 text-slate-400" />
                          </div>
                        )}
                      </div>

                      {/* File info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{doc.fileName}</p>
                        <p className="text-sm text-slate-500">
                          {formatFileSize(doc.fileData.byteLength)} • {formatDate(doc.uploadedAt)}
                        </p>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {documents.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Ingen dokumenter lastet opp ennå</p>
            <p className="text-sm mt-1">Last opp filer for å komme i gang</p>
          </div>
        )}

        {/* Generate PDF button */}
        {documents.length > 0 && (
          <div className="pt-6 border-t border-white/10">
            <button
              onClick={() => router.push("/bilkjop/dokumenter/generer")}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-teal-500 text-[#0c1220] font-bold text-lg hover:bg-teal-400 transition"
            >
              <Download className="h-5 w-5" />
              Generer samlet PDF
            </button>
            <p className="text-center text-sm text-slate-500 mt-3">
              Kravbrev + alle vedlegg i ett dokument
            </p>
          </div>
        )}
      </div>
    </main>
  );
}