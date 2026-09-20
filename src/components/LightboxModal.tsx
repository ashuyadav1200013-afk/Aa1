import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close image"
        >
          <X className="w-6 h-6" />
        </button>

        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
        />

        <div className="mt-3 text-center px-4">
          <p className="text-white text-sm sm:text-base font-semibold">{title}</p>
          <p className="text-emerald-400 text-xs mt-0.5">GreenPaws Community Photo • Developed by Ashu Yadav</p>
        </div>
      </div>
    </div>
  );
};
