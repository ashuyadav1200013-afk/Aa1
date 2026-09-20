export type PostCategory = 
  | 'plantation'
  | 'animal-rescue'
  | 'watering'
  | 'bird-care'
  | 'cow-animal-seva'
  | 'cleanup';

export interface CommentItem {
  id: string;
  authorName: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

export interface PostItem {
  id: string;
  authorName: string;
  authorAvatar?: string;
  location: string;
  timestamp: string;
  category: PostCategory;
  title: string;
  story: string;
  imageUrl: string;
  beforeImageUrl?: string;
  likesCount: number;
  isLiked?: boolean;
  comments: CommentItem[];
  tags: string[];
  impactMetric: {
    type: 'trees' | 'animals' | 'water' | 'cleanup';
    value: number;
    label: string;
  };
  verified?: boolean;
}

export interface ImpactStats {
  totalActs: number;
  treesPlanted: number;
  animalsRescued: number;
  waterGivenLiters: number;
  volunteersCount: number;
}

export interface TrustedTrust {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  category: 'animal-rescue' | 'street-dogs' | 'tree-plantation' | 'cow-seva' | 'wildlife';
  location: string;
  established: string;
  impactHighlight: string;
  donateUrl: string;
  officialWebsite: string;
  upiId?: string;
  taxExemption?: string;
  imageUrl: string;
  description: string;
  verified: boolean;
}

