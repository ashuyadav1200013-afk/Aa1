import React from 'react';
import { Award, CheckCircle2, Download, Printer, Share2, X, Sprout, Heart } from 'lucide-react';
import { PostItem } from '../types';

interface KindnessCertificateModalProps {
  post: PostItem | null;
  onClose: () => void;
}

export const KindnessCertificateModal: React.FC<KindnessCertificateModalProps> = ({
  post,
  onClose,
}) => {
  if (!post) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `🏆 Certificate of Kindness awarded to ${post.authorName} on GreenPaws (Developed by Ashu Yadav) for: ${post.title}!`
      );
      alert('Certificate details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl border-4 border-amber-200/60 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border-2 border-dashed border-amber-400/80 p-6 sm:p-8 rounded-xl bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30 text-center relative overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <Sprout className="w-96 h-96 text-emerald-900" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400 flex items-center justify-center text-amber-600">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <p className="text-xs tracking-widest uppercase font-bold text-amber-800">
            GreenPaws Global Initiative
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 mt-1 tracking-tight">
            Certificate of Appreciation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            For Outstanding Kindness Towards Nature & Animals
          </p>

          <div className="my-6">
            <p className="text-xs text-slate-500 italic">This is proudly presented to</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-900 font-serif border-b-2 border-emerald-300 inline-block px-6 py-1 mt-1">
              {post.authorName}
            </p>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              📍 {post.location}
            </p>
          </div>

          <div className="max-w-md mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3.5 rounded-lg border border-slate-200">
            <p className="font-semibold text-slate-900 mb-1">
              &ldquo;{post.title}&rdquo;
            </p>
            <p className="text-slate-600 text-xs">
              Impact: <strong className="text-emerald-700 font-semibold">{post.impactMetric.value} {post.impactMetric.label}</strong>. Your compassion sets a shining example for a greener, kinder world.
            </p>
          </div>

          {/* Verification & Signature footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4 text-left">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" /> Officially Verified Act
              </div>
              <div className="text-[11px] text-slate-500">
                Date: {post.timestamp}
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic font-bold text-slate-800 text-sm">
                Ashu Yadav
              </div>
              <div className="text-[10px] text-slate-500 border-t border-slate-300 pt-0.5">
                Developer & Founder, GreenPaws
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex items-center justify-end gap-2 flex-wrap">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};
