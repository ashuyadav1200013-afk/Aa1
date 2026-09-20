import React from 'react';
import { Award, Heart, Sparkles, X, ShieldCheck, HeartHandshake, Trees, Dog } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDonateModal?: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose, onOpenDonateModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 relative overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background decorative elements */}
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
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl font-black text-emerald-800 tracking-wider font-serif">
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

          <h3 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            Ashu Yadav
          </h3>
          <p className="text-slate-500 text-sm mt-0.5 font-medium">
            Environmental & Animal Welfare Activist
          </p>

          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-left w-full space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-xl">🌱</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Humara Sankalp (Mission):</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Har gali aur mohalle me log aage aakar be-sahara street dogs, pashuon aur pakshiyon ki dekhbhal karein aur zyada se zyada chhayadaar ped (Neem, Peepal, Banyan) lagayein.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
              <span className="text-xl">🐾</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Be-sahara Pashu Seva:</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Ghayal street dogs ka turant ilaaj, daily roti/biscuit/milk feeding, aur garmiyon me har mod par mitti ke sakore me peene ka saaf paani rakhna.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action to Donate */}
          {onOpenDonateModal && (
            <div className="mt-4 w-full">
              <button
                onClick={() => {
                  onClose();
                  onOpenDonateModal();
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95"
              >
                <HeartHandshake className="w-4 h-4" />
                Verified Animal Trusts Ko Sahayata / Donate Karein
              </button>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between w-full pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Award className="w-4 h-4 text-emerald-600" /> Verified Green Initiative
            </span>
            <span className="flex items-center gap-1 font-medium">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Ashu Yadav
            </span>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow transition-all cursor-pointer"
          >
            Explore Community Acts
          </button>
        </div>
      </div>
    </div>
  );
};
