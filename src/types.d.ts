export interface PullRequest {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
}

export interface Summary {
  month: string;
  opened: number;
  closed: number;
}
