import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Award, 
  MapPin, 
  CheckCircle, 
  Sprout, 
  ShieldAlert, 
  Send, 
  Sparkles,
  Maximize2,
  Layers
} from 'lucide-react';
import { PostItem, CommentItem } from '../types';

interface PostCardProps {
  post: PostItem;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string, authorName: string) => void;
  onOpenCertificate: (post: PostItem) => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onAddComment,
  onOpenCertificate,
  onOpenLightbox,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [authorNameInput, setAuthorNameInput] = useState('');
  const [showBefore, setShowBefore] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExpandedStory, setIsExpandedStory] = useState(false);

  const getCategoryBadge = (category: PostItem['category']) => {
    switch (category) {
      case 'plantation':
        return {
          label: '🌱 Planted Sapling',
          classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'animal-rescue':
        return {
          label: '🐕 Animal Rescue & First Aid',
          classes: 'bg-amber-50 text-amber-900 border-amber-200',
        };
      case 'watering':
        return {
          label: '💧 Watering & Plant Care',
          classes: 'bg-sky-50 text-sky-800 border-sky-200',
        };
      case 'bird-care':
        return {
          label: '🐦 Bird Feeder & Sakore',
          classes: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        };
      case 'cow-animal-seva':
        return {
          label: '🐄 Cow / Animal Seva',
          classes: 'bg-purple-50 text-purple-800 border-purple-200',
        };
      case 'cleanup':
        return {
          label: '🌿 Nature Clean-up',
          classes: 'bg-teal-50 text-teal-800 border-teal-200',
        };
      default:
        return {
          label: '🌱 Good Deed',
          classes: 'bg-slate-50 text-slate-800 border-slate-200',
        };
    }
  };

  const badge = getCategoryBadge(post.category);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const author = authorNameInput.trim() || 'Kind Volunteer';
    onAddComment(post.id, commentInput.trim(), author);
    setCommentInput('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out this inspiring act on GreenPaws (Developed by Ashu Yadav): "${post.title}" by ${post.authorName} in ${post.location}!`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayedImage = (showBefore && post.beforeImageUrl) ? post.beforeImageUrl : post.imageUrl;

  return (
    <article 
      id={`post-${post.id}`}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Post Author Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-bold flex items-center justify-center text-xs tracking-wider shadow-xs shrink-0">
              {post.authorName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {post.authorName}
                </span>
                {post.verified && (
                  <span className="inline-flex items-center text-emerald-600 text-xs" title="Verified Act">
                    <CheckCircle className="w-3.5 h-3.5 fill-emerald-100" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {post.location}
                </span>
                <span>•</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Category Tag */}
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.classes}`}>
            {badge.label}
          </span>
        </div>

        {/* Post Image Container */}
        <div className="relative bg-slate-900 group aspect-4/3 sm:aspect-16/10 overflow-hidden">
          <img
            src={displayedImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102 cursor-pointer"
            onClick={() => onOpenLightbox(displayedImage, post.title)}
          />

          {/* Enlarge Button */}
          <button
            onClick={() => onOpenLightbox(displayedImage, post.title)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            title="Enlarge photo"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Before & After Toggle Switch if available */}
          {post.beforeImageUrl && (
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md rounded-lg p-1 flex items-center gap-1 border border-white/20">
              <button
                type="button"
                onClick={() => setShowBefore(true)}
                className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-colors ${
                  showBefore ? 'bg-amber-500 text-white' : 'text-slate-200 hover:text-white'
                }`}
              >
                Before / Rescue
              </button>
              <button
                type="button"
                onClick={() => setShowBefore(false)}
                className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-colors ${
                  !showBefore ? 'bg-emerald-600 text-white' : 'text-slate-200 hover:text-white'
                }`}
              >
                After / Healed ✨
              </button>
            </div>
          )}

          {/* Impact Pill Floating */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {post.impactMetric.value} {post.impactMetric.label}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {post.title}
          </h2>

          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className={isExpandedStory ? '' : 'line-clamp-3'}>
              {post.story}
            </p>
            {post.story.length > 150 && (
              <button
                onClick={() => setIsExpandedStory(!isExpandedStory)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 mt-1 cursor-pointer"
              >
                {isExpandedStory ? 'Show less' : 'Read full story...'}
              </button>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Bar & Stats */}
      <div className="border-t border-slate-100 px-4 py-3 bg-slate-50/50">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Like / Cheer Button */}
            <button
              onClick={() => onLike(post.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                post.isLiked
                  ? 'bg-rose-50 text-rose-600 scale-105'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-rose-600'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  post.isLiked ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
              <span>{post.likesCount}</span>
            </button>

            {/* Comments Toggle Button */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments.length}</span>
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Certificate Button */}
            <button
              onClick={() => onOpenCertificate(post)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer"
              title="View Kindness Certificate"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xs:inline">Certificate</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors relative cursor-pointer"
              title="Share post"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Comment Drawer / Section */}
        {showComments && (
          <div className="mt-3 pt-3 border-t border-slate-200 space-y-3 animate-fade-in">
            {/* Existing Comments */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {post.comments.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-2">
                  Be the first to appreciate this good deed!
                </p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-2.5 rounded-xl border border-slate-200/70 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">
                        {comment.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-600">{comment.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Ashu)"
                  value={authorNameInput}
                  onChange={(e) => setAuthorNameInput(e.target.value)}
                  className="w-1/3 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Write a warm note of appreciation..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!commentInput.trim()}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </article>
  );
};
