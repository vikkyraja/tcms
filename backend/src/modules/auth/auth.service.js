import supabase from "../../config/supabase.js";
import bcrypt from "bcryptjs";

export async function registerUser({ name, email, password, role }) {
  const hash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hash, role }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function loginUser(email, password) {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error("Invalid credentials");

  return user;
}
