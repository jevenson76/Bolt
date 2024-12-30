import { useState } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';

export function useLogoUpload() {
  const supabase = useSupabase();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadLogo = async (file: File) => {
    try {
      setUploading(true);
      setError(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('logos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload logo'));
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadLogo, uploading, error };
}