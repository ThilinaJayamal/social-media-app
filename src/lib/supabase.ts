import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://lqcljuyxndfdbefxvunv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxY2xqdXl4bmRmZGJlZnh2dW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzMDY2NzAsImV4cCI6MjAzODg4MjY3MH0.IYQHsX45jY2JFMOPNKoKHYkkF7HopO2ZlcX1chLyNGo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})