import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  Sparkles, 
  Check, 
  Sprout, 
  Heart, 
  Droplets, 
  Layers, 
  MapPin, 
  AlertCircle,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PostItem, PostCategory } from '../types';
import { SAMPLE_PHOTO_PRESETS } from '../data/mockPosts';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (newPost: PostItem) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onAddPost,
}) => {
  const [photoSourceMode, setPhotoSourceMode] = useState<'upload' | 'camera' | 'preset'>('upload');
  
  // Form fields
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<PostCategory>('plantation');
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [beforeImageUrl, setBeforeImageUrl] = useState('');
  const [impactCount, setImpactCount] = useState<number>(1);
  const [impactLabel, setImpactLabel] = useState<string>('Paudhe Lagaye');
  const [tagsInput, setTagsInput] = useState('TreePlantation, GreenEarth');

  // Camera handling
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Auto-fill sensible impact label when category changes
  useEffect(() => {
    switch (category) {
      case 'plantation':
        setImpactLabel('Paudhe / Saplings Planted');
        setTagsInput('TreePlantation, GreenEarth, CleanAir');
        break;
      case 'animal-rescue':
        setImpactLabel('Animal Rescued & Treated');
        setTagsInput('StreetDogRescue, AnimalCare, FirstAid');
        break;
      case 'watering':
        setImpactLabel('Liters Water Given to Trees');
        setTagsInput('SaveTrees, WaterThePlants, SummerCare');
        break;
      case 'bird-care':
        setImpactLabel('Water Bowls Placed for Birds');
        setTagsInput('BirdFeeder, SaveBirds, ChhatParPaani');
        break;
      case 'cow-animal-seva':
        setImpactLabel('Animals Fed Healthy Meal');
        setTagsInput('GauSeva, AnimalKindness, StreetFood');
        break;
      case 'cleanup':
        setImpactLabel('kg Plastic Waste Cleaned');
        setTagsInput('CleanIndia, PlasticFree, NatureLove');
        break;
    }
  }, [category]);

  // Clean up camera stream when modal closes or mode changes
  useEffect(() => {
    if (!isOpen || photoSourceMode !== 'camera') {
      stopCamera();
    }
  }, [isOpen, photoSourceMode]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Camera access not granted or unavailable. Please upload a photo or pick a sample photo.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.80);
      setImageUrl(dataUrl);
      stopCamera();
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1000;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.78));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isBefore = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      if (isBefore) {
        setBeforeImageUrl(compressed);
      } else {
        setImageUrl(compressed);
      }
    } catch (err) {
      console.error('Error compressing image:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please click or upload a photo of your good deed!');
      return;
    }
    if (!authorName.trim()) {
      alert('Please enter your name!');
      return;
    }
    if (!title.trim()) {
      alert('Please enter a short title for your deed!');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      authorName: authorName.trim(),
      location: location.trim() || 'India',
      timestamp: 'Just now',
      category,
      title: title.trim(),
      story: story.trim() || 'Maine ye nek kaam kiya taaki nature aur be-sahara janwaron ki madad ho sake.',
      imageUrl,
      beforeImageUrl: beforeImageUrl || undefined,
      likesCount: 1,
      isLiked: true,
      verified: true,
      tags: tags.length > 0 ? tags : ['GreenPaws', 'PashuSewa', 'KindnessMatters'],
      impactMetric: {
        type: category === 'plantation' ? 'trees' : category === 'watering' ? 'water' : 'animals',
        value: Number(impactCount) || 1,
        label: impactLabel || 'Acts of Kindness',
      },
      comments: [
        {
          id: `c-init-${Date.now()}`,
          authorName: 'GreenPaws Community',
          text: `Shabash ${authorName}! Aise hi dharti aur be-zubaan janwaron ki seva karte rahein.`,
          timestamp: 'Just now',
        },
      ],
    };

    onAddPost(newPost);

    // Confetti celebration blast!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#14b8a6', '#f59e0b', '#3b82f6'],
    });

    // Reset fields & close
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl border border-slate-200 relative my-6 max-h-[92vh] flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Share Your Good Deed
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Apni Photo & Story Post Karein 🌱🐾
            </h2>
            <p className="text-xs text-slate-500">
              Platform developed by Ashu Yadav for Tree Planters & Animal Rescuers
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Photo Source Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              1. Photo Add Karein (Camera Click, Upload ya Sample) *
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setPhotoSourceMode('camera');
                  startCamera();
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  photoSourceMode === 'camera'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Live Camera</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setPhotoSourceMode('upload');
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  photoSourceMode === 'upload'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload File</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setPhotoSourceMode('preset');
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  photoSourceMode === 'preset'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Quick Preset</span>
              </button>
            </div>

            {/* Mode 1: Camera Interface */}
            {photoSourceMode === 'camera' && (
              <div className="bg-slate-950 rounded-xl overflow-hidden p-2 text-center relative">
                {cameraError ? (
                  <div className="py-6 px-4 text-rose-300 text-xs flex flex-col items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-rose-400" />
                    <span>{cameraError}</span>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs"
                    >
                      Try Camera Again
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full max-h-64 object-cover rounded-lg bg-black"
                    />
                    <div className="mt-2 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={captureCameraPhoto}
                        className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full text-xs shadow-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <Camera className="w-4 h-4" /> Click Photo Now
                      </button>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs"
                        title="Reset Camera"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mode 2: File Upload */}
            {photoSourceMode === 'upload' && (
              <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/30 rounded-xl p-4 text-center hover:bg-emerald-50/50 transition-colors">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="hidden"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center cursor-pointer space-y-1"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    Click to choose photo from mobile / computer
                  </span>
                  <span className="text-[11px] text-slate-500">
                    JPG, PNG, or WEBP supported
                  </span>
                </label>
              </div>
            )}

            {/* Mode 3: Presets */}
            {photoSourceMode === 'preset' && (
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_PHOTO_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setCategory(preset.category);
                      setTitle(preset.title);
                    }}
                    className={`p-1.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                      imageUrl === preset.url
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-16 object-cover rounded-lg"
                    />
                    <span className="text-[10px] font-semibold text-slate-800 line-clamp-1">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Image Preview Thumbnail */}
            {imageUrl && (
              <div className="mt-2.5 p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-12 h-12 rounded-lg object-cover border border-emerald-300 shadow-xs"
                  />
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">
                      ✓ Photo Attached Successfully!
                    </span>
                    <span className="text-[10px] text-emerald-700">
                      Ready to publish on community feed
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="text-xs text-rose-600 hover:underline px-2"
                >
                  Change Photo
                </button>
              </div>
            )}
          </div>

          {/* User Details: Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Aapka Naam (Your Name) *
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Jaise: Ashu Yadav ya Rahul Sharma"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Aapka Shahar / Location *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Jaise: Jaipur, Delhi, Mumbai, Lucknow"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Category Choose Karein (Nek Kaam Ka Prakar) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'plantation', label: '🌱 Paudhe Lagaye', desc: 'Trees & Plants' },
                { id: 'animal-rescue', label: '🐕 Animal Rescue', desc: 'Dog/Pup Care & First Aid' },
                { id: 'watering', label: '💧 Paani Diya', desc: 'Watering Dry Plants' },
                { id: 'bird-care', label: '🐦 Bird Feeder', desc: 'Mitti ke Sakore / Daana' },
                { id: 'cow-animal-seva', label: '🐄 Cow Seva', desc: 'Hara Chara & Shelter' },
                { id: 'cleanup', label: '🌿 Nature Clean', desc: 'Plastic Waste Removal' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as PostCategory)}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    category === cat.id
                      ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{cat.label}</div>
                  <div className="text-[10px] text-slate-500">{cat.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title & Story */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Post Title / Headline *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Jaise: Gali ke chote puppy ke chot par dava lagai / 5 Neem ke paudhe lagaye"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Story Details (Kya hua tha, kaise dekhbhal ki...)
              </label>
              <textarea
                rows={3}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Poori detail likhein: kahan lagaya ya kiske saath rescue kiya..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Impact Quantity Metric */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Impact Number (Count)
              </label>
              <input
                type="number"
                min={1}
                value={impactCount}
                onChange={(e) => setImpactCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Impact Description
              </label>
              <input
                type="text"
                value={impactLabel}
                onChange={(e) => setImpactLabel(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Optional: Before Photo for Rescued Animal or Plant Site */}
          <div className="text-xs">
            <span className="text-slate-600 font-medium">Optional: Before Photo (e.g. Injured condition / Dry land)</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, true)}
              className="mt-1 block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            />
            {beforeImageUrl && (
              <span className="text-[11px] text-emerald-700 block mt-1">
                ✓ Before photo attached for comparison slider!
              </span>
            )}
          </div>

          {/* Footer Submit Button */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Post Now on Live Feed</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
