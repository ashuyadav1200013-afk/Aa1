import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  PlusCircle, 
  Sprout, 
  Heart, 
  Sparkles, 
  Filter, 
  ShieldCheck, 
  ArrowUp,
  Award,
  Globe,
  Camera,
  Layers,
  ChevronDown,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { PostItem, ImpactStats, PostCategory } from './types';
import { MOCK_POSTS, INITIAL_IMPACT_STATS } from './data/mockPosts';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PostCard } from './components/PostCard';
import { FilterBar } from './components/FilterBar';
import { CreatePostModal } from './components/CreatePostModal';
import { KindnessCertificateModal } from './components/KindnessCertificateModal';
import { DeveloperModal } from './components/DeveloperModal';
import { LightboxModal } from './components/LightboxModal';
import { CommunityGuardians } from './components/CommunityGuardians';

const BATCH_SIZE = 24;

export default function App() {
  // Load posts from localStorage if available, ensuring clean unique dataset is loaded
  const [posts, setPosts] = useState<PostItem[]>(() => {
    try {
      const saved = localStorage.getItem('greenpaws_posts');
      if (saved) {
        const parsed: PostItem[] = JSON.parse(saved);
        // If saved data is from the old repetitive loop (which had > 200 items with duplicate photos),
        // flush it and load the verified 100% unique photos while preserving genuine user posts
        if (parsed.length > 200) {
          const userAdded = parsed.filter(
            (p) => p.id.startsWith('post-') && Number(p.id.replace('post-', '')) > 1000000000000
          );
          return [...userAdded, ...MOCK_POSTS];
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error loading saved posts:', e);
    }
    return MOCK_POSTS;
  });

  // Impact stats
  const [stats, setStats] = useState<ImpactStats>(() => {
    try {
      const saved = localStorage.getItem('greenpaws_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.totalActs && parsed.totalActs >= 5000) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved stats:', e);
    }
    return INITIAL_IMPACT_STATS;
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'likes' | 'impact'>('latest');
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [certificatePost, setCertificatePost] = useState<PostItem | null>(null);
  const [lightboxData, setLightboxData] = useState<{ isOpen: boolean; imageUrl: string; title: string }>({
    isOpen: false,
    imageUrl: '',
    title: '',
  });

  // Save to localStorage whenever posts change
  useEffect(() => {
    try {
      localStorage.setItem('greenpaws_posts', JSON.stringify(posts));
    } catch (e) {
      console.error('Error saving posts to localStorage:', e);
    }
  }, [posts]);

  // Save stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('greenpaws_stats', JSON.stringify(stats));
    } catch (e) {
      console.error('Error saving stats to localStorage:', e);
    }
  }, [stats]);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [selectedCategory, searchQuery, sortBy]);

  // Handler: Add new user post
  const handleAddPost = (newPost: PostItem) => {
    setPosts((prev) => [newPost, ...prev]);

    // Update global counter
    setStats((prev) => {
      const newStats = { ...prev, totalActs: prev.totalActs + 1 };
      if (newPost.category === 'plantation') {
        newStats.treesPlanted += newPost.impactMetric.value;
      } else if (newPost.category === 'animal-rescue' || newPost.category === 'cow-animal-seva') {
        newStats.animalsRescued += newPost.impactMetric.value;
      } else if (newPost.category === 'watering') {
        newStats.waterGivenLiters += newPost.impactMetric.value;
      }
      return newStats;
    });
  };

  // Handler: Like a post
  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1),
          };
        }
        return post;
      })
    );
  };

  // Handler: Add comment to a post
  const handleAddComment = (postId: string, commentText: string, authorName: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      authorName,
      text: commentText,
      timestamp: 'Just now',
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [newComment, ...post.comments],
          };
        }
        return post;
      })
    );
  };

  // Filtered and sorted posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        // Category filter
        if (selectedCategory !== 'all' && post.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchAuthor = post.authorName.toLowerCase().includes(q);
          const matchTitle = post.title.toLowerCase().includes(q);
          const matchStory = post.story.toLowerCase().includes(q);
          const matchLocation = post.location.toLowerCase().includes(q);
          const matchTags = post.tags?.some((t) => t.toLowerCase().includes(q));
          return matchAuthor || matchTitle || matchStory || matchLocation || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') {
          return b.likesCount - a.likesCount;
        }
        if (sortBy === 'impact') {
          return b.impactMetric.value - a.impactMetric.value;
        }
        // default latest
        return 0;
      });
  }, [posts, selectedCategory, searchQuery, sortBy]);

  // Infinite scroll trigger
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => {
            if (prev < filteredPosts.length) {
              return Math.min(prev + BATCH_SIZE, filteredPosts.length);
            }
            return prev;
          });
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [filteredPosts.length]);

  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredPosts.length));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Navigation Bar with prominent 'Developed by Ashu Yadav' */}
      <Navbar
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalActsCount={stats.totalActs}
      />

      {/* Hero Banner with Stats & Vision */}
      <HeroBanner
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        stats={stats}
      />

      {/* Main Feed Container */}
      <main id="community-feed" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Feed Column (8 cols on large screens) */}
          <section className="lg:col-span-8 space-y-6">
            {/* Filter and Sort Toolbar */}
            <FilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              sortBy={sortBy}
              onSelectSort={setSortBy}
              totalCount={posts.length}
            />

            {/* Live Feed Status Bar & Exploration Counter */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500 bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-slate-200/60">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Showing <strong className="text-slate-900">{displayedPosts.length}</strong> of{' '}
                <strong className="text-slate-900">{filteredPosts.length.toLocaleString()}</strong> real photos & verified deeds
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              </span>

              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Clear search &ldquo;{searchQuery}&rdquo;
                </button>
              ) : (
                <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  🌱 1,000+ Real Stories Available
                </span>
              )}
            </div>

            {/* Posts Grid / List */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Sprout className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No stories found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Is category ya search me abhi koi photo nahi hai. Aap pehle insaan banein jo yahan apni photo post karein!
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow transition-all cursor-pointer"
                >
                  + Post First Photo in this Category
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {displayedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onAddComment={handleAddComment}
                    onOpenCertificate={(p) => setCertificatePost(p)}
                    onOpenLightbox={(imageUrl, title) =>
                      setLightboxData({ isOpen: true, imageUrl, title })
                    }
                  />
                ))}

                {/* Infinite scroll sentinel trigger element */}
                <div ref={observerTarget} className="h-10 w-full" />

                {/* Load More Button & End of Feed Banner */}
                {visibleCount < filteredPosts.length ? (
                  <div className="text-center pt-2 pb-6">
                    <button
                      onClick={handleLoadMore}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      <ChevronDown className="w-4 h-4 text-emerald-600" />
                      <span>
                        Load More Stories ({Math.min(BATCH_SIZE, filteredPosts.length - visibleCount)} more of{' '}
                        {filteredPosts.length - visibleCount} remaining)
                      </span>
                    </button>
                    <p className="text-[11px] text-slate-400 mt-2">
                      Scroll down to continuously load all 1,200+ real stories
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-white rounded-2xl border border-emerald-200 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Aapne sabhi {filteredPosts.length} Real Good Deeds dekh liye hain!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Kya aapne aaj koi ped lagaya ya be-sahara janwar ki madad ki? Apni photo click karein aur community ke sath share karein!
                    </p>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow transition-all cursor-pointer"
                    >
                      + Post Your Good Deed Photo
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Right Sidebar (4 cols on large screens): Guardians, Ashu Yadav Spotlight & Kindness Deed Action */}
          <aside className="lg:col-span-4 space-y-6">
            <CommunityGuardians
              onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
            />

            {/* Quick Action Card */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-5 rounded-2xl shadow-sm text-center space-y-3">
              <Camera className="w-8 h-8 mx-auto text-emerald-100" />
              <h4 className="font-bold text-base">Have You Planted or Fed an Animal Today?</h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Chhoti se chhoti koshish bhi duniya ko behtar banati hai. Apni photo click karein aur yahan share karein!
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full py-2.5 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                + Post Your Photo Now
              </button>
            </div>
          </aside>

        </div>
      </main>

      {/* Floating Action Button for Instant Mobile Posting */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-6 right-6 z-30 lg:hidden p-4 rounded-full bg-emerald-600 text-white shadow-2xl hover:bg-emerald-700 transition-transform active:scale-95 flex items-center justify-center cursor-pointer"
        aria-label="Post Good Deed"
      >
        <PlusCircle className="w-6 h-6" />
      </button>

      {/* Footer with Developer Credits */}
      <footer className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg font-serif">GreenPaws</span>
              <p className="text-xs text-slate-400">
                Prakriti & Pashu Sewa Community • Global Kindness Movement
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Developed by <strong className="text-white">Ashu Yadav</strong>
            </div>
            <p className="text-[11px] text-slate-400">
              Encouraging tree plantation, watering, stray animal rescue, and pet welfare worldwide.
            </p>
          </div>
        </div>
      </footer>

      {/* All Modal Overlays */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddPost={handleAddPost}
      />

      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
        currentPosts={posts}
      />

      <KindnessCertificateModal
        post={certificatePost}
        onClose={() => setCertificatePost(null)}
      />

      <LightboxModal
        isOpen={lightboxData.isOpen}
        imageUrl={lightboxData.imageUrl}
        title={lightboxData.title}
        onClose={() => setLightboxData({ isOpen: false, imageUrl: '', title: '' })}
      />
    </div>
  );
}
