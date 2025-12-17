// src/types/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          nickname: string | null;
          avatar_url: string | null;
          location: string | null;
          points_balance: number;
          created_at: string;
        };
        Insert: {
          id: string;
          nickname?: string | null;
          avatar_url?: string | null;
          location?: string | null;
          points_balance?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          nickname?: string | null;
          avatar_url?: string | null;
          location?: string | null;
          points_balance?: number;
          created_at?: string;
        };
      }; // <--- 注意这里的逗号
      mood_logs: {
        Row: {
          id: number;
          user_id: string;
          mood_type: string | null;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          mood_type?: string | null;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          mood_type?: string | null;
          note?: string | null;
          created_at?: string;
        };
      };
    };
  };
}