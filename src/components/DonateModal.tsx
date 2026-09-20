import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ExternalLink, 
  X, 
  ShieldCheck, 
  Check, 
  Copy, 
  Globe, 
  Sparkles, 
  Search,
  Award,
  Trees,
  Dog,
  Heart
} from 'lucide-react';
import { TRUSTED_TRUSTS } from '../data/trustedTrusts';
import { TrustedTrust } from '../types';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrustId?: string | null;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose, selectedTrustId }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUpi, setCopiedUpi] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyUpi = (upiId: string, trustId: string) => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(trustId);
    setTimeout(() => setCopiedUpi(null), 2500);
  };

  const filteredTrusts = TRUSTED_TRUSTS.filter((trust) => {
    const matchesCategory = 
      filterCategory === 'all' || 
      (filterCategory === 'animals' && (trust.category === 'animal-rescue' || trust.category === 'street-dogs')) ||
      (filterCategory === 'trees' && trust.category === 'tree-plantation') ||
      (filterCategory === 'cows' && trust.category === 'cow-seva');

    const matchesSearch = 
      trust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trust.hindiName && trust.hindiName.includes(searchQuery)) ||
      trust.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trust.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-emerald-100 relative overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 sm:p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <Sparkles className="w-3 h-3" /> 100% Direct Non-Profit Support
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-200 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> 80G Tax Exemption
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-emerald-300" />
            Verified Animal & Nature Trusts (दान / सहायता)
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl leading-relaxed">
            Bharat ke sabse bade aur bharosemand pashu evam prakriti sansthaon ko seedha sahayata bhejein. Aapka 100% yogdan bina kisi commission ke sidha unke official portal par jayega.
          </p>
        </div>

        {/* Filter and search bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Trusts ({TRUSTED_TRUSTS.length})
            </button>
            <button
              onClick={() => setFilterCategory('animals')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                filterCategory === 'animals'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Dog className="w-3.5 h-3.5" />
              Street Dogs & Animal Hospitals
            </button>
            <button
              onClick={() => setFilterCategory('trees')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                filterCategory === 'trees'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Trees className="w-3.5 h-3.5" />
              Tree Plantations
            </button>
            <button
              onClick={() => setFilterCategory('cows')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                filterCategory === 'cows'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              Gaushala & Cow Seva
            </button>
          </div>

          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trust, city..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        {/* Trusts List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 divide-y divide-slate-100 flex-1">
          {filteredTrusts.map((trust) => (
            <div 
              key={trust.id}
              className={`pt-4 first:pt-0 transition-all ${
                selectedTrustId === trust.id ? 'ring-2 ring-emerald-500 rounded-xl p-3 bg-emerald-50/30' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4 items-start">
                {/* Image */}
                <div className="relative w-full md:w-44 h-36 md:h-32 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={trust.imageUrl}
                    alt={trust.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                    📍 {trust.location}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Trust
                    </span>
                    {trust.taxExemption && (
                      <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                        {trust.taxExemption}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500">
                      Est. {trust.established}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {trust.name}
                  </h3>
                  {trust.hindiName && (
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {trust.hindiName}
                    </p>
                  )}

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {trust.description}
                  </p>

                  <div className="mt-2 text-xs font-medium text-emerald-900 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100 flex items-start gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Impact:</strong> {trust.impactHighlight}</span>
                  </div>

                  {/* Actions & UPI */}
                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
                    {trust.upiId && (
                      <div className="flex items-center gap-1.5 text-xs bg-slate-100/80 px-2.5 py-1 rounded-md">
                        <span className="text-slate-500 font-medium">UPI:</span>
                        <code className="text-slate-800 font-mono font-bold text-[11px]">{trust.upiId}</code>
                        <button
                          onClick={() => handleCopyUpi(trust.upiId!, trust.id)}
                          className="ml-1 p-1 hover:bg-white rounded transition-colors text-slate-500 hover:text-emerald-700 cursor-pointer"
                          title="Copy UPI ID"
                        >
                          {copiedUpi === trust.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                      <a
                        href={trust.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Website
                      </a>

                      <a
                        href={trust.donateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow transition-all transform active:scale-95"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        Donate Directly (ऑफिशियल पोर्टल)
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredTrusts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-500 text-sm">Koi trust nahi mila. Filter reset karke dobara dekhein.</p>
            </div>
          )}
        </div>

        {/* Footer info notice */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>GreenPaws and Ashu Yadav initiative does not collect money directly. All links open the trust's government-registered portal.</span>
        </div>
      </div>
    </div>
  );
};
