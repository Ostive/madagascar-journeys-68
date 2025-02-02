import { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Image from '@editorjs/image';
import Quote from '@editorjs/quote';
import { supabase } from '@/integrations/supabase/client';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Editor({ value, onChange, placeholder }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);

  const uploadImageByFile = async (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (file.size > maxSize) {
      throw new Error("L'image ne doit pas dépasser 5MB");
    }

    if (!file.type.startsWith('image/')) {
      throw new Error("Le fichier doit être une image");
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    if (!fileExt || !validExtensions.includes(fileExt)) {
      throw new Error("Format d'image non supporté. Utilisez JPG, PNG, GIF ou WEBP");
    }

    const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
    const filePath = `content/${fileName}`;

    try {
      // Check bucket access
      const { error: bucketError } = await supabase
        .storage
        .getBucket('blogs');

      if (bucketError) {
        console.error('Bucket access error:', bucketError);
        throw new Error('Erreur d\'accès au bucket de stockage');
      }

      const { error: uploadError } = await supabase.storage
        .from('blogs')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
          cacheControl: '3600'
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('blogs')
        .getPublicUrl(filePath);

      if (urlError) {
        console.error('URL generation error:', urlError);
        throw urlError;
      }

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editor',
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Entrez un titre',
              levels: [2, 3, 4],
              defaultLevel: 2
            }
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile: uploadImageByFile
              }
            }
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                vimeo: true
              }
            }
          },
          quote: {
            class: Quote,
            inlineToolbar: true
          }
        },
        data: value ? JSON.parse(value) : {},
        placeholder: placeholder || 'Commencez à écrire votre article...',
        onChange: async () => {
          const data = await editor.save();
          onChange(JSON.stringify(data));
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="prose prose-emerald max-w-none">
      <div id="editor" className="min-h-[500px]" />
    </div>
  );
}
