import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {Database} from "./types/supabase";

const supabaseUrl: string = 'https://sktoqgbcjidoohzeobcz.supabase.co';
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdG9xZ2Jjamlkb29oemVvYmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNDg2NjQsImV4cCI6MjAxMzYyNDY2NH0.bHTlOnAimquiX5Ndvs7pje_O3X2B0NtBoPIs_oU5z7k';


//service key
const supabaseServiceKey : string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdG9xZ2Jjamlkb29oemVvYmN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODA0ODY2NCwiZXhwIjoyMDEzNjI0NjY0fQ.tN3pIC9Tz5FDX_R3KGWD6eaDCRFgyhdZNdLOvZzFof0"
//export const supabase: SupabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
export const supabase: SupabaseClient = createClient<Database>(supabaseUrl, supabaseServiceKey);

