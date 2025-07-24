export interface EmailDraft {
  id: number;
  prompt: string;
  content: string;
  recipient: string;
  tone: string;
  status: 'draft' | 'sent' | 'failed';
  created_at: string;
  sent_at?: string;
  subject?: string;
  type: 'general' | 'meeting';
}

export interface EmailStats {
  total_sent: number;
  total_drafts: number;
  success_rate: number;
  recent_activity: number;
  popular_tones: Record<string, number>;
  monthly_stats: Array<{
    month: string;
    sent: number;
    drafts: number;
  }>;
}

export interface Settings {
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
  default_tone: string;
  auto_save_drafts: boolean;
  email_signature: string;
  notification_preferences: {
    email_sent: boolean;
    draft_saved: boolean;
    generation_complete: boolean;
  };
}

export type Tone = 'formal' | 'casual' | 'friendly' | 'apologetic' | 'persuasive' | 'urgent';