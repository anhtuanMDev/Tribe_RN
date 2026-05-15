export type PlanVibe = 'casual' | 'demo' | 'competitive';
export type PostStatus = 'open' | 'full' | 'closed' | 'expired' | 'disbanded';
export type ParticipantStatus = 'pending' | 'reserved' | 'rejected' | 'cancelled';

export interface ActivityType {
  id: number;
  name: string;
  icon_key: string;
}

export interface PostUser {
  id: number;
  username: string;
}

export interface PostMedia {
  id: number;
  file_url: string;
  order: number;
}

export interface PostParticipant {
  id: number;
  user: PostUser;
  status: ParticipantStatus;
  requested_at: string;
  resolved_at: string | null;
}

export interface Post {
  id: number;
  creator: PostUser;
  title: string;
  description: string;
  activity_type: ActivityType;
  custom_activity: string | null;
  location_name: string;
  latitude: number;
  longitude: number;
  scheduled_start: string;
  scheduled_end: string;
  plan_vibe: PlanVibe;
  open_slots: number | null;       // null = unlimited
  reopen_on_dropout: boolean;
  status: PostStatus;
  filled_count: number;
  remaining_slots: number | null;  // null = unlimited
  participants: PostParticipant[];
  known_participants: PostParticipant[];
  media: PostMedia[];
  distance_km: number | null;
  created_at: string;
}

export interface CreatePostPayload {
  title: string;
  activity_type: number;
  location_name: string;
  latitude: number;
  longitude: number;
  scheduled_start: string;
  scheduled_end: string;
  description?: string;
  plan_vibe?: PlanVibe;
  open_slots?: number | null;
  reopen_on_dropout?: boolean;
  custom_activity?: string | null;
  media_urls?: string[];
}