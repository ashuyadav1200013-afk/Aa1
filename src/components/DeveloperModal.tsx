import React, { useState } from 'react';
import { Award, Heart, Sparkles, X, ShieldCheck, Download, Copy, Check, Code2, ServerOff } from 'lucide-react';
import { PostItem } from '../types';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPosts?: PostItem[];
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose, currentPosts = [] }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentPosts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "greenpaws_community_posts.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(currentPosts, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 relative overflow-hidden my-6 max-h-[92vh] flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background decorative gradient */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-100 rounded-full blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl font-black text-emerald-800 tracking-wider">
                AY
              </div>
            </div>
            <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Platform Creator & Lead Developer
          </div>

          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Ashu Yadav
          </h3>
          <p className="text-slate-500 text-sm mt-0.5">
            Full-Stack Developer & Environmental Activist
          </p>

          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-left w-full space-y-2.5">
            <div className="flex items-start gap-3">
              <span className="text-lg">🌱</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Mission:</strong> Har insaan ko motivate karna ki wo ped lagaye, be-sahara street animals (dogs, cows, birds) ki seva kare aur real photos share kare.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🐾</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>100% Real Photographs:</strong> Platform par har photo genuine hai. Koi bhi fake repeated loops ya AI generator nahi hai.
              </p>
            </div>
          </div>

          {/* Vercel & GitHub Offline Static Architecture info card */}
          <div className="mt-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-left w-full space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <ServerOff className="w-4 h-4 text-emerald-700" />
              <span>100% Offline Static (No API / Server Required)</span>
            </div>
            <p className="text-[11px] text-emerald-800/90 leading-relaxed">
              Ye website poori tarah pure client-side code me banayi gayi hai. Aap ise <strong>GitHub par push karke Vercel par bina kisi server ya API ke direct deploy</strong> kar sakte hain. Jab koi nayi photo post karega, wo turant browser code & localStorage me safely store ho jayegi.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={handleDownloadJSON}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download Posts JSON ({currentPosts.length})
              </button>
              <button
                onClick={handleCopyJSON}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-emerald-100/60 border border-emerald-300 text-emerald-800 rounded-lg font-semibold text-xs transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <Award className="w-4 h-4 text-emerald-600" /> Verified Green Creator
            </span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Ashu Yadav
            </span>
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow transition-all cursor-pointer"
          >
            Back to Community Feed
          </button>
        </div>
      </div>
    </div>
  );
};
