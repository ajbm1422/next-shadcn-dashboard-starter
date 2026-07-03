const STORAGE_KEY = 'infinder-video-fallbacks';

export type VideoFallback = {
  id: string;
  videoId?: string;
  title: string;
  thumbnail?: string;
  channelName?: string;
  channelId?: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  duration?: number;
  publishedAt?: string;
  topic?: string;
  engagementRate?: number;
  likeRate?: number;
  commentRate?: number;
  source: 'channel' | 'content';
  savedAt: number;
};

export function saveVideoFallback(video: Omit<VideoFallback, 'savedAt'>) {
  if (typeof window === 'undefined' || !video.id) return;

  const current = readStore();
  const item = { ...video, savedAt: Date.now() };
  current[video.id] = item;

  if (video.videoId) {
    current[video.videoId] = item;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trimStore(current)));
  } catch {
    // Best-effort cache for client-side detail fallbacks.
  }
}

export function getVideoFallback(id: string) {
  if (typeof window === 'undefined' || !id) return null;
  const store = readStore();
  return store[id] ?? null;
}

export function extractYoutubeVideoId(value: string | undefined) {
  if (!value) return '';

  const patterns = [
    /\/vi\/([^/?#]+)/,
    /\/embed\/([^/?#]+)/,
    /youtu\.be\/([^/?#]+)/,
    /[?&]v=([^&#]+)/
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }

  return '';
}

export function youtubeEmbedUrl(videoId: string | undefined) {
  if (!videoId || !/^[\w-]{6,}$/.test(videoId)) return '';
  return `https://www.youtube.com/embed/${videoId}`;
}

function readStore() {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, VideoFallback>) : {};
  } catch {
    return {};
  }
}

function trimStore(store: Record<string, VideoFallback>) {
  const entries = Object.entries(store)
    .toSorted(([, a], [, b]) => b.savedAt - a.savedAt)
    .slice(0, 80);

  return Object.fromEntries(entries);
}
