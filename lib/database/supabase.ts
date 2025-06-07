import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role key for server-side operations
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          image_url: string | null;
          author: string | null;
          slug: string | null;
          is_published: boolean;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          image_url?: string | null;
          author?: string | null;
          slug?: string | null;
          is_published?: boolean;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          image_url?: string | null;
          author?: string | null;
          slug?: string | null;
          is_published?: boolean;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      about: {
        Row: {
          id: string;
          title: string;
          content: string;
          image_url: string | null;
          section: string | null;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          image_url?: string | null;
          section?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          image_url?: string | null;
          section?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      profile: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          title: string; // Av. unvanı
          about: string;
          specialties: string[]; // Uzmanlık alanları
          profile_image_url: string | null;
          social_links: {
            linkedin?: string;
            twitter?: string;
            instagram?: string;
            facebook?: string;
          } | null;
          career_history: {
            id: string;
            position: string;
            company: string;
            start_date: string;
            end_date: string | null;
            description: string | null;
            is_current: boolean;
          }[] | null;
          education_history: {
            id: string;
            degree: string;
            school: string;
            field_of_study: string | null;
            start_date: string;
            end_date: string | null;
            description: string | null;
            is_current: boolean;
          }[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          title: string;
          about: string;
          specialties: string[];
          profile_image_url?: string | null;
          social_links?: {
            linkedin?: string;
            twitter?: string;
            instagram?: string;
            facebook?: string;
          } | null;
          career_history?: {
            id: string;
            position: string;
            company: string;
            start_date: string;
            end_date: string | null;
            description: string | null;
            is_current: boolean;
          }[] | null;
          education_history?: {
            id: string;
            degree: string;
            school: string;
            field_of_study: string | null;
            start_date: string;
            end_date: string | null;
            description: string | null;
            is_current: boolean;
          }[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          title?: string;
          about?: string;
          specialties?: string[];
          profile_image_url?: string | null;
          social_links?: {
            linkedin?: string;
            twitter?: string;
            instagram?: string;
            facebook?: string;
          } | null;
          career_history?: {
            id: string;
            position: string;
            company: string;
            start_date: string;
            end_date: string | null;
            description: string | null;
            is_current: boolean;
          }[] | null;
          education_history?: {
            id: string;
            degree: string;
            school: string;
            field_of_study: string | null;
            start_date: string;
            end_date: string | null;
            description: string | null;
            is_current: boolean;
          }[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 