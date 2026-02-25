"use client";

import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/Profile.Context";
import { useState, useRef } from "react";
import { X, Upload, ImageIcon } from "lucide-react";
import axios from "axios";

export function UploadImageModal() {
  const { isUploadImageShow, setisUploadImageShow } = useProfileContext();

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadImageShow) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Only image files allowed");
      return;
    }

    setError(null);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleRemove = () => {
    setPreview(null);
    setFile(null);
    setError(null);
  };

  const UploadImageOnCloudinery = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "/api/profile/uploadoncloudinery",
        formData,
      );
      console.log(response.data.result);
      setisUploadImageShow(false);

      setPreview(response.data.result.url);
    } catch (err) {
      setError("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setisUploadImageShow(false)}
      />

      <div className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Upload Image</h2>
          <button
            onClick={() => setisUploadImageShow(false)}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        <div className="p-5">
          {!preview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-zinc-400" />
              </div>

              <p className="text-white font-medium mb-1">Click to upload</p>
              <p className="text-zinc-500 text-sm">PNG, JPG, GIF up to 10MB</p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleRemove}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        <div className="p-5 border-t border-white/10 flex gap-3">
          <Button
            variant="outline"
            onClick={() => setisUploadImageShow(false)}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            onClick={UploadImageOnCloudinery}
            disabled={!file || isUploading}
            className="flex-1 disabled:opacity-50"
          >
            {isUploading ? (
              "Uploading..."
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
