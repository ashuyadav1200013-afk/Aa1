import React from 'react';
import { Camera, Sparkles, Heart, Sprout, ShieldCheck, Award } from 'lucide-react';
import { ImpactStats } from '../types';

interface HeroBannerProps {
  onOpenCreateModal: () => void;
  onOpenDeveloperModal: () => void;
  onOpenDonateModal: () => void;
  stats: ImpactStats;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenCreateModal,
  onOpenDeveloperModal,
  onOpenDonateModal,
  stats,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60">
      {/* Background glow ornaments */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-5">
        {/* Prominent Developed by Ashu Yadav badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-medium transition-all shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>Developed by <strong className="text-white font-bold tracking-wide">Ashu Yadav</strong></span>
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          <span className="text-emerald-300">Pashu & Prakriti Sewa</span>
          <button 
            onClick={onOpenDeveloperModal}
            className="ml-1 px-2 py-0.5 rounded bg-emerald-600/60 hover:bg-emerald-600 text-white text-[11px] font-semibold transition-colors cursor-pointer"
          >
            About Creator
          </button>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
          Prakriti & Pashu Sewa <br />
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
            Har Chhoti Koshish Ek Bada Badlav
          </span>
        </h1>

        {/* Description in Hindi & English */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-emerald-100/80 leading-relaxed">
          Bharat ke kone-kone se logon ne street dogs ko khana khilaya, ghayal pashuon ka ilaaj kiya, aur Neem, Peepal, Banyan ke paudhe lagaye.
          <strong> Aap bhi apni photo click karke turant post karein ya verified trusts ko sahayata bhejein!</strong>
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-400/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span>Click Photo & Post Deed</span>
          </button>

          <button
            onClick={onOpenDonateModal}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>Donate to Animal Trusts</span>
          </button>

          <a
            href="#community-feed"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base rounded-2xl border border-white/15 backdrop-blur-md transition-all cursor-pointer"
          >
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span>Explore Real Posts</span>
          </a>
        </div>

        {/* Real Stats Display Bar */}
        <div className="pt-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md shadow-2xl">
            <div className="p-2 text-center border-r border-white/10 last:border-r-0">
              <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-white">
                  {stats.totalActs.toLocaleString()}+
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-emerald-200/70 font-medium">
                Good Deeds Logged
              </div>
            </div>

            <div className="p-2 text-center border-r border-white/10 sm:border-r last:border-r-0">
              <div className="flex items-center justify-center gap-1 text-teal-400 mb-1">
                <Sprout className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-white">
                  {stats.treesPlanted.toLocaleString()}+
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-teal-200/70 font-medium">
                Trees & Saplings Planted
              </div>
            </div>

            <div className="p-2 text-center border-r border-white/10 last:border-r-0">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                <Heart className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-white">
                  {stats.animalsRescued.toLocaleString()}+
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-amber-200/70 font-medium">
                Stray Animals Rescued / Fed
              </div>
            </div>

            <div className="p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-sky-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-white">
                  {stats.volunteersCount.toLocaleString()}+
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-sky-200/70 font-medium">
                Active Volunteers Worldwide
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
