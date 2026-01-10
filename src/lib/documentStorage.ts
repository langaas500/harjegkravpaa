const DB_NAME = "harjegkravpaa_docs";
const DB_VERSION = 1;
const STORE_NAME = "documents";

export interface StoredDocument {
  id: string;
  category: DocumentCategory;
  fileName: string;
  fileType: string;
  fileData: ArrayBuffer;
  thumbnail?: string;
  textContent?: string;
  uploadedAt: string;
}

export type DocumentCategory =
  | "kontrakt"
  | "rapport"
  | "verksted"
  | "bilder"
  | "kommunikasjon"
  | "feilkoder"
  | "annet";

export const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  kontrakt: "Kjøpekontrakt / kvittering",
  rapport: "Bilkjøp-rapport",
  verksted: "Verkstedrapport",
  bilder: "Bilder av skaden",
  kommunikasjon: "Kommunikasjon med selger",
  feilkoder: "Feilkoder / OBD",
  annet: "Annet",
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("category", "category", { unique: false });
        store.createIndex("uploadedAt", "uploadedAt", { unique: false });
      }
    };
  });
}

export async function saveDocument(doc: StoredDocument): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(doc);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function getDocument(id: string): Promise<StoredDocument | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
}

export async function getAllDocuments(): Promise<StoredDocument[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
  });
}

export async function getDocumentsByCategory(
  category: DocumentCategory
): Promise<StoredDocument[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const index = store.index("category");
    const request = index.getAll(category);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
  });
}

export async function deleteDocument(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function clearAllDocuments(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export function generateId(): string {
  return `doc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export async function fileToStoredDocument(
  file: File,
  category: DocumentCategory
): Promise<StoredDocument> {
  const arrayBuffer = await file.arrayBuffer();
  
  let thumbnail: string | undefined;
  let textContent: string | undefined;
  
  // Lag thumbnail for bilder
  if (file.type.startsWith("image/")) {
    thumbnail = await createThumbnail(file);
  }
  
  // Ekstraher tekst fra tekstfiler
  if (file.type === "text/plain" || file.type === "text/html") {
    textContent = await file.text();
  }

  return {
    id: generateId(),
    category,
    fileName: file.name,
    fileType: file.type,
    fileData: arrayBuffer,
    thumbnail,
    textContent,
    uploadedAt: new Date().toISOString(),
  };
}

function createThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 150;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = () => resolve("");
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}