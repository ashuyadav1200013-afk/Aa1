import React from 'react';
import { 
  Sparkles, 
  Sprout, 
  Heart, 
  Droplets, 
  Layers, 
  TrendingUp, 
  Clock, 
  Award,
  Bird,
  Flame
} from 'lucide-react';
import { PostCategory } from '../types';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: 'latest' | 'likes' | 'impact';
  onSelectSort: (sort: 'latest' | 'likes' | 'impact') => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
  totalCount,
}) => {
  const categories = [
    { id: 'all', label: 'All Good Deeds', icon: Sparkles, count: totalCount },
    { id: 'plantation', label: '🌱 Tree Plantation', icon: Sprout },
    { id: 'animal-rescue', label: '🐕 Animal Rescue & Dogs', icon: Heart },
    { id: 'watering', label: '💧 Watering Plants', icon: Droplets },
    { id: 'bird-care', label: '🐦 Bird Water & Feed', icon: Bird },
    { id: 'cow-animal-seva', label: '🐄 Cow Seva', icon: Layers },
    { id: 'cleanup', label: '🌿 Nature Clean-up', icon: Award },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs space-y-3">
      {/* Category Pills Slider / Flex */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Sort:</span>
          <button
            onClick={() => onSelectSort('latest')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              sortBy === 'latest'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3 h-3 inline mr-1" />
            Recent
          </button>

          <button
            onClick={() => onSelectSort('likes')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              sortBy === 'likes'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-3 h-3 inline mr-1 text-amber-400" />
            Most Liked
          </button>

          <button
            onClick={() => onSelectSort('impact')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              sortBy === 'impact'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3 h-3 inline mr-1 text-emerald-400" />
            Top Impact
          </button>
        </div>
      </div>
    </div>
  );
};
