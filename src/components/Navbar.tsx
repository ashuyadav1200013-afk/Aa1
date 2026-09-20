import React from 'react';
import { Sprout, HeartHandshake, PlusCircle, Search, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
  onOpenDeveloperModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalActsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCreateModal,
  onOpenDeveloperModal,
  searchQuery,
  setSearchQuery,
  totalActsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Topmost Brand & Developer Banner as explicitly requested */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 px-2 py-0.5 rounded-md font-medium text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-300" /> Official Platform
            </span>
            <span className="font-semibold text-emerald-100">
              Developed by <strong className="text-white underline decoration-emerald-400 font-bold">Ashu Yadav</strong>
            </span>
            <button
              onClick={onOpenDeveloperModal}
              className="text-emerald-300 hover:text-white underline text-[11px] flex items-center gap-0.5 ml-1 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3 h-3" /> View Creator Profile
            </button>
          </div>

          <div className="flex items-center gap-3 text-emerald-200/90 text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Community Feed
            </span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white font-medium">
              🌍 {totalActsCount.toLocaleString()}+ Acts Logged Globally
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-slate-900 font-serif">
                  Green<span className="text-emerald-600">Paws</span>
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" /> BY ASHU YADAV
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none hidden sm:block">
                Prakriti & Pashu Sewa Community
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, plant, dog rescue, or volunteer..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenDeveloperModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              Ashu Yadav Initiative
            </button>

            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="font-bold">Post Photo & Deed</span>
            </button>
          </div>
        </div>

        {/* Mobile search bar row */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plants, street dog rescue, city..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
