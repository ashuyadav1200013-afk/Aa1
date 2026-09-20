import React from 'react';
import { Sparkles, ShieldCheck, Users, MapPin, HeartHandshake, Heart, ExternalLink } from 'lucide-react';

interface CommunityGuardiansProps {
  onOpenDeveloperModal: () => void;
  onOpenCreateModal: () => void;
  onOpenDonateModal?: () => void;
}

export const CommunityGuardians: React.FC<CommunityGuardiansProps> = ({
  onOpenDeveloperModal,
  onOpenCreateModal,
  onOpenDonateModal,
}) => {
  const topGuardians = [
    {
      name: 'Dr. Ramesh Chandra',
      location: 'Varanasi, UP',
      role: 'Veterinary Surgeon',
      badge: 'Animal Healer of the Month',
      deeds: '148 Animals Treated',
      specialty: 'Emergency Maggot & Wound First-Aid',
    },
    {
      name: 'Pooja Verma',
      location: 'Noida, UP',
      role: 'Urban Forester',
      badge: 'Green Warrior 2026',
      deeds: '320 Trees Planted',
      specialty: 'Neem & Peepal Afforestation',
    },
    {
      name: 'Manish Chawla',
      location: 'Delhi, NCR',
      role: 'Bird Seva Volunteer',
      badge: 'Bird Guardian',
      deeds: '160 Water Bowls Placed',
      specialty: 'Summer Water for Birds',
    },
    {
      name: 'Dr. Arvind Swaminathan',
      location: 'Chennai, TN',
      role: 'Wildlife & Animal Rescuer',
      badge: 'Rescue Specialist',
      deeds: '115 Rescues Completed',
      specialty: 'Injured Street Dogs & Puppies',
    },
    {
      name: 'Santosh Deshmukh',
      location: 'Pune, Maharashtra',
      role: 'Eco Activist & Plogger',
      badge: 'Clean Hill Hero',
      deeds: '95 Cleanup Drives',
      specialty: 'Plastic-Free Nature Habitats',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Lead Developer Spotlight Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-5 shadow-lg border border-emerald-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Project Developer Credit
        </div>

        <h3 className="text-xl font-bold font-serif tracking-tight">
          Developed by Ashu Yadav
        </h3>
        <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
          Dedicated to every human who plants a tree, places a water bowl for thirsty birds, or rescues a suffering animal on the street.
        </p>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-emerald-800/60">
          <button
            onClick={onOpenDeveloperModal}
            className="text-xs font-bold text-white hover:text-amber-200 underline decoration-emerald-400 transition-colors cursor-pointer"
          >
            Learn More About Ashu →
          </button>
          <button
            onClick={onOpenCreateModal}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg shadow transition-all cursor-pointer"
          >
            + Post Your Deed
          </button>
        </div>
      </div>

      {/* Top Guardians Leaderboard - Clean initials without fake stock faces */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900">Top Verified Guardians</h4>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
            India & Global Heroes
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {topGuardians.map((guardian, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl border border-slate-200/70 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between gap-3 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs tracking-wider border border-emerald-200 shrink-0">
                  {guardian.name
                    .split(' ')
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900">
                      {guardian.name}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{guardian.location}</span>
                    <span>•</span>
                    <span>{guardian.role}</span>
                  </div>
                  <p className="text-[10px] font-medium text-emerald-700 mt-0.5">
                    {guardian.specialty}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-black text-slate-800 block">
                  {guardian.deeds}
                </span>
                <span className="text-[9px] text-emerald-600 font-medium bg-emerald-50 px-1 py-0.2 rounded">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Animal & Tree Trust Donation Card */}
      {onOpenDonateModal && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
            <span>Support Real Animal Trusts</span>
          </div>
          <p className="text-[11px] text-amber-900/80 leading-relaxed">
            Animal Aid Unlimited, Friendicoes aur SankalpTaru jaise verified trusts ko direct sahayata bhejein.
          </p>
          <button
            onClick={onOpenDonateModal}
            className="w-full py-2 px-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Donate Directly to Trusts</span>
          </button>
        </div>
      )}
    </div>
  );
};
