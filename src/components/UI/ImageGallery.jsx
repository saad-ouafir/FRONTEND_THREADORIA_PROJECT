import { useState, useCallback, useEffect, useRef } from "react";
import { Play, ChevronLeft, ChevronRight, X, Download, Pause } from "lucide-react";

const ImageGallery = ({
  media = [],
  autoPlayVideos = true,
  autoPlayInterval = 5000,
  enableSwipe = true,
  maxVisibleItems = null, // Auto-calculate if null
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [gridCols, setGridCols] = useState(2);
  const autoPlayTimerRef = useRef(null);
  const touchStartRef = useRef(0);
  const galleryRef = useRef(null);

  const currentMedia = media[currentIndex] || {};
  const isVideo = currentMedia.type === "video";

  // **Responsive grid calculation**
  useEffect(() => {
    const calculateGridColumns = () => {
      const width = window.innerWidth;
      if (width < 640) return 1; // Mobile: 1 column
      if (width < 768) return 2; // Tablet: 2 columns
      return 3; // Desktop: 3 columns
    };

    const updateGrid = () => setGridCols(calculateGridColumns());
    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  // **Dynamic visible items based on grid**
  const visibleMediaCount = maxVisibleItems || gridCols * 2;
  const visibleMedia = media.slice(0, visibleMediaCount);
  const hasMore = media.length > visibleMediaCount;

  // **Navigation callbacks**
  const nextMedia = useCallback(() => {
    if (media.length === 0) return;
    setIsLoading(true);
    setCurrentIndex(prevIndex => (prevIndex + 1) % media.length);
  }, [media.length]);

  const prevMedia = useCallback(() => {
    if (media.length === 0) return;
    setIsLoading(true);
    setCurrentIndex(prevIndex => (prevIndex - 1 + media.length) % media.length);
  }, [media.length]);

  // **Auto-play timer**
  const startAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    setIsAutoPlaying(true);

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % media.length);
      setIsLoading(true);
    }, autoPlayInterval);
  }, [media.length, autoPlayInterval]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    setIsAutoPlaying(false);
  }, []);

  // **Auto-play when entering fullscreen**
  useEffect(() => {
    if (isFullscreen && !isVideo) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isFullscreen, isVideo, startAutoPlay, stopAutoPlay]);

  // **Keyboard navigation (enhanced)**
  useEffect(() => {
    const handleKeyDown = e => {
      if (!isFullscreen) return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          nextMedia();
          stopAutoPlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevMedia();
          stopAutoPlay();
          break;
        case "Escape":
          setIsFullscreen(false);
          break;
        case " ":
          e.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          if (!isAutoPlaying) startAutoPlay();
          else stopAutoPlay();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, nextMedia, prevMedia, isAutoPlaying, startAutoPlay, stopAutoPlay]);

  // **Swipe gesture detection**
  const handleTouchStart = useCallback(e => {
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    e => {
      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchStartRef.current - touchEnd;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          nextMedia(); // Swipe left = next
        } else {
          prevMedia(); // Swipe right = previous
        }
        stopAutoPlay();
      }
    },
    [nextMedia, prevMedia, stopAutoPlay],
  );

  // **Image preloading for better performance**
  const preloadImage = useCallback(url => {
    if (!url) return;
    const img = new Image();
    img.src = url;
  }, []);

  useEffect(() => {
    // Preload next and previous images
    if (media.length > 1) {
      const nextIndex = (currentIndex + 1) % media.length;
      const prevIndex = (currentIndex - 1 + media.length) % media.length;

      if (media[nextIndex]?.url && media[nextIndex].type !== "video") {
        preloadImage(media[nextIndex].url);
      }
      if (media[prevIndex]?.url && media[prevIndex].type !== "video") {
        preloadImage(media[prevIndex].url);
      }
    }
  }, [currentIndex, media, preloadImage]);

  const handleMediaLoad = () => setIsLoading(false);

  const openFullscreen = index => {
    setIsLoading(true);
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  const handleClose = () => {
    setIsFullscreen(false);
    setIsLoading(true);
    stopAutoPlay();
  };

  const handleDownload = () => {
    if (!currentMedia?.url) return;
    const fallbackExtension = currentMedia.type === "video" ? "mp4" : "jpg";
    const fileName = currentMedia.fileName || `media-${currentIndex + 1}.${fallbackExtension}`;
    const link = document.createElement("a");
    link.href = currentMedia.url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!media || media.length === 0) {
    return null;
  }

  return (
    <>
      {/* Responsive Grid Gallery */}
      <div className="w-full px-2 sm:px-4">
        <div
          className={`grid gap-1 overflow-hidden ${
            gridCols === 1
              ? "grid-cols-1"
              : gridCols === 2
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
          }`}
        >
          {visibleMedia.map((item, index) => {
            const isItemVideo = item.type === "video";
            const isLastVisible = index === visibleMediaCount - 1;

            return (
              <button
                key={index}
                type="button"
                onClick={() => openFullscreen(index)}
                className="relative group cursor-pointer overflow-hidden aspect-square hover:opacity-90 transition-opacity"
                aria-label={`Open media ${index + 1}`}
              >
                {isItemVideo ? (
                  <>
                    <video
                      src={item.url}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      muted
                      poster={item.poster}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.url}
                    alt={item.alt || `Media ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                {hasMore && isLastVisible && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-xl sm:text-2xl font-semibold">
                      +{media.length - visibleMediaCount}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          ref={galleryRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 flex-shrink-0">
            <span className="text-white/80 text-xs sm:text-sm font-medium">
              {currentIndex + 1} / {media.length}
            </span>
            <div className="flex items-center gap-1 sm:gap-2">
              {!isVideo && (
                <button
                  type="button"
                  onClick={() => (isAutoPlaying ? stopAutoPlay() : startAutoPlay())}
                  className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
                  aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
                  title="Space to toggle"
                >
                  {isAutoPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={handleDownload}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
                aria-label="Download media"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center relative px-4 sm:px-8 lg:px-16 overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}

            <div
              className={`max-w-full max-h-full transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            >
              {isVideo ? (
                <video
                  key={currentIndex}
                  src={currentMedia.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] sm:max-h-[85vh]"
                  poster={currentMedia.poster}
                  onLoadedData={handleMediaLoad}
                />
              ) : (
                <img
                  key={currentIndex}
                  src={currentMedia.url}
                  alt={currentMedia.alt || `Media ${currentIndex + 1}`}
                  className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain"
                  onLoad={handleMediaLoad}
                />
              )}
            </div>

            {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
            {media.length > 1 && (
              <>
                <button
                  onClick={() => {
                    prevMedia();
                    stopAutoPlay();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hidden sm:flex"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                  onClick={() => {
                    nextMedia();
                    stopAutoPlay();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hidden sm:flex"
                  aria-label="Next media"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Strip - Responsive */}
          {media.length > 1 && (
            <div className="p-3 sm:p-4 flex justify-center gap-1 sm:gap-2 overflow-x-auto flex-shrink-0">
              {media.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsLoading(true);
                    setCurrentIndex(index);
                    stopAutoPlay();
                  }}
                  className={`shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? "border-white scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Jump to media ${index + 1}`}
                >
                  {item.type === "video" ? (
                    <video src={item.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img
                      src={item.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Mobile swipe indicator */}
          <div className="text-center text-white/40 text-xs sm:text-sm pb-2 sm:hidden">Swipe to navigate</div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
