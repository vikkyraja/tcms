import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .limit(1);

  if (error) {
    console.error("❌ Supabase error:", error.message);
  } else {
    console.log("✅ Supabase Service Role Key is WORKING");
    console.log("Data sample:", data);
  }
}

test();
