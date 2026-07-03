import { z } from 'zod';

const platformSchema = z.enum(['youtube', 'naver_blog', 'instagram']);

export const creatorRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  platform: platformSchema,
  handle: z.string().optional(),
  profileImageUrl: z.url().optional(),
  followers: z.number().optional(),
  avgViews: z.number().optional(),
  engagementRate: z.number().optional(),
  recentPostAt: z.string().optional(),
  score: z.number().optional(),
  tags: z.array(z.string()),
  url: z.url().optional()
});

export const videoItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnailUrl: z.url(),
  channelName: z.string(),
  views: z.number().optional(),
  publishedAt: z.string().optional(),
  url: z.url(),
  score: z.number().optional()
});

export const blogRowSchema = z.object({
  id: z.string(),
  title: z.string(),
  bloggerName: z.string(),
  url: z.url(),
  category: z.string().optional(),
  visitors: z.number().optional(),
  postCount: z.number().optional(),
  recentPostAt: z.string().optional(),
  score: z.number().optional(),
  tags: z.array(z.string())
});

export const instagramItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  handle: z.string(),
  profileImageUrl: z.url().optional(),
  followers: z.number().optional(),
  engagementRate: z.number().optional(),
  avgLikes: z.number().optional(),
  avgComments: z.number().optional(),
  url: z.url().optional(),
  score: z.number().optional(),
  tags: z.array(z.string())
});

export const chartDatumSchema = z.object({
  name: z.string(),
  value: z.number(),
  secondary: z.number().optional()
});

export const summaryCardSchema = z.object({
  label: z.string(),
  value: z.string(),
  description: z.string().optional(),
  tone: z.enum(['default', 'success', 'warning']).optional()
});

const baseArtifactSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional()
});

export const creatorTableArtifactSchema = baseArtifactSchema.extend({
  kind: z.literal('creator_table'),
  rows: z.array(creatorRowSchema)
});

export const videoGridArtifactSchema = baseArtifactSchema.extend({
  kind: z.literal('video_grid'),
  items: z.array(videoItemSchema)
});

export const blogTableArtifactSchema = baseArtifactSchema.extend({
  kind: z.literal('blog_table'),
  rows: z.array(blogRowSchema)
});

export const instagramGridArtifactSchema = baseArtifactSchema.extend({
  kind: z.literal('instagram_grid'),
  items: z.array(instagramItemSchema)
});

export const chartArtifactSchema = baseArtifactSchema.extend({
  kind: z.literal('chart'),
  chartType: z.enum(['bar', 'line', 'pie']),
  data: z.array(chartDatumSchema)
});

export const campaignSummaryArtifactSchema = baseArtifactSchema.extend({
  kind: z.literal('campaign_summary'),
  summaryCards: z.array(summaryCardSchema),
  recommendedCreators: z.array(creatorRowSchema).optional()
});

export const artifactSchema = z.discriminatedUnion('kind', [
  creatorTableArtifactSchema,
  videoGridArtifactSchema,
  blogTableArtifactSchema,
  instagramGridArtifactSchema,
  chartArtifactSchema,
  campaignSummaryArtifactSchema
]);

export type CreatorRow = z.infer<typeof creatorRowSchema>;
export type VideoItem = z.infer<typeof videoItemSchema>;
export type BlogRow = z.infer<typeof blogRowSchema>;
export type InstagramItem = z.infer<typeof instagramItemSchema>;
export type ChartDatum = z.infer<typeof chartDatumSchema>;
export type SummaryCard = z.infer<typeof summaryCardSchema>;
export type AppArtifact = z.infer<typeof artifactSchema>;
