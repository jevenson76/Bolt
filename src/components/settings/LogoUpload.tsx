import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useLogoUpload } from '../../hooks/useLogoUpload';

interface LogoUploadProps {
  onUploadComplete: (url: string) => void;
}

export function LogoUpload({ onUploadComplete }: LogoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadLogo, uploading, error } = useLogoUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    const url = await uploadLogo(file);
    if (url) {
      onUploadComplete(url);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
      >
        <Upload className="h-5 w-5" />
        {uploading ? 'Uploading...' : 'Upload Logo'}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}