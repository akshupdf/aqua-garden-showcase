import { supabase } from "./supabase";

export async function testSupabaseConnection() {
  console.log("🔍 Testing Supabase Connection...");
  console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
  console.log("Has Anon Key:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);

  try {
    // Test basic connection
    const { data, error } = await supabase
      .from("blogs")
      .select("count")
      .limit(1);

    if (error) {
      console.error("❌ Supabase Connection Failed:", error);
      return {
        success: false,
        error: error.message,
        details: error
      };
    }

    console.log("✅ Supabase Connection Successful!");
    return {
      success: true,
      data
    };
  } catch (err) {
    console.error("❌ Unexpected Error:", err);
    return {
      success: false,
      error: "Unexpected error occurred",
      details: err
    };
  }
}

// Run test automatically in development
if (import.meta.env.DEV) {
  testSupabaseConnection();
}
