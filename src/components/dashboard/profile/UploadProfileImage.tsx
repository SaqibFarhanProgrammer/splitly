// components/modals/UploadImageModal.tsx
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, ImageIcon, Loader2 } from "lucide-react";
import axios from "axios";

interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadImageModal({
  isOpen,
  onClose,
}: UploadImageModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleUpload = async () => {
  //   if (!selectedFile) return;

  //   try {
  //     setIsLoading(true);
      
  //     // Form data banayo
  //     const formData = new FormData();
  //     formData.append("image", selectedFile);

  //     // API call
  //     const response = await axios.post("/api/upload/image", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     // Success pe callback
  //     if (response.data && response.data.imageUrl) {
  //       onImageUploaded?.(response.data.imageUrl);
  //       handleClose();
  //     }
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleClose = () => {
    setSelectedFile(null);
    setPreview(null);
    setIsLoading(false);
    onClose();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white font-['inter-bold']">
            Upload Image
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {!preview ? (
            // Upload Area
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-zinc-400" />
              </div>
              <p className="text-white font-medium mb-1 font-['inter-bold']">
                Click to upload
              </p>
              <p className="text-zinc-500 text-sm font-['inter-beta']">
                or drag and drop
              </p>
              <p className="text-zinc-600 text-xs mt-2 font-['inter-beta']">
                PNG, JPG, GIF up to 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            // Preview Area
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-zinc-400 text-sm text-center font-['inter-beta']">
                {selectedFile?.name}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 border-white/10 text-white hover:bg-white/5 h-10 font-['inter-bold']"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            className="flex-1 bg-white text-black hover:bg-zinc-200 h-10 font-['inter-bold'] disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}