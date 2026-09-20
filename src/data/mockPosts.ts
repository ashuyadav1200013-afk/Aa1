import { PostItem, ImpactStats } from '../types';
import {
  UNIQUE_REAL_POSTS,
  INITIAL_IMPACT_STATS,
  SAMPLE_PHOTO_PRESETS,
} from './postsDatabase';

export { INITIAL_IMPACT_STATS, SAMPLE_PHOTO_PRESETS, UNIQUE_REAL_POSTS };

// Pure static offline dataset - each post has a 100% unique, non-repeating real photo!
export const MOCK_POSTS: PostItem[] = UNIQUE_REAL_POSTS;
