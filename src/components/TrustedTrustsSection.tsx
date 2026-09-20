import React from 'react';
import { HeartHandshake, ExternalLink, ShieldCheck, Heart, ArrowRight, Award } from 'lucide-react';
import { TRUSTED_TRUSTS } from '../data/trustedTrusts';

interface TrustedTrustsSectionProps {
  onOpenDonateModal: (trustId?: string) => void;
}

export const TrustedTrustsSection: React.FC<TrustedTrustsSectionProps> = ({ onOpenDonateModal }) => {
  // Take first 4 prominent trusts for the homepage preview
  const previewTrusts = TRUSTED_TRUSTS.slice(0, 4);

  return (
    <div className="mb-10 bg-gradient-to-br from-amber-50/60 via-emerald-50/30 to-teal-50/40 rounded-3xl p-5 sm:p-7 border border-amber-200/70 shadow-sm relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs mb-2 border border-amber-300">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
            <span>Trusted Animal & Nature Non-Profits</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Ghayal Pashuon & Pedon Ke Liye Sahayata Karein (Donate Directly)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Agar aap khud street dog rescue ya tree plantation nahi kar pa rahe, toh Bharat ke in <strong>100% verified aur trusted trusts</strong> ko seedha donation bhejkar be-sahara pashuon ki jaan bachayein.
          </p>
        </div>

        <button
          onClick={() => onOpenDonateModal()}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <span>View All 8+ Verified Trusts</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {previewTrusts.map((trust) => (
          <div 
            key={trust.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                <img
                  src={trust.imageUrl}
                  alt={trust.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-black/65 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  📍 {trust.location}
                </span>
                <span className="absolute bottom-2 right-2 bg-emerald-600/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>

              <div className="p-3.5">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                  {trust.name}
                </h3>
                {trust.hindiName && (
                  <p className="text-[11px] font-medium text-emerald-700 line-clamp-1 mt-0.5">
                    {trust.hindiName}
                  </p>
                )}
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {trust.tagline}
                </p>

                <div className="mt-2.5 flex items-center gap-1 text-[10px] text-emerald-800 font-medium bg-emerald-50 p-1.5 rounded-md">
                  <Award className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{trust.impactHighlight}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 pt-0 mt-2 flex flex-col gap-1.5">
              <a
                href={trust.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Donate Directly</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <button
                onClick={() => onOpenDonateModal(trust.id)}
                className="w-full py-1.5 text-[11px] text-slate-600 hover:text-emerald-700 font-semibold text-center cursor-pointer transition-colors"
              >
                UPI Details & More Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
