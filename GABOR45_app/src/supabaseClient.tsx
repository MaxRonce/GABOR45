import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://sktoqgbcjidoohzeobcz.supabase.co';
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdG9xZ2Jjamlkb29oemVvYmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNDg2NjQsImV4cCI6MjAxMzYyNDY2NH0.bHTlOnAimquiX5Ndvs7pje_O3X2B0NtBoPIs_oU5z7k';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

