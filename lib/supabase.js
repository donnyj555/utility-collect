// lib/supabase.js
// Supabase client + all database and auth helper functions

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// ── AUTH ──────────────────────────────────────────────────────────────────────

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// ── AGENT PROFILE ─────────────────────────────────────────────────────────────

export async function getAgentProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) throw error;
  return data;
}

export async function createAgentProfile({ fullName, brokerage, intakeSlug }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("agents")
    .insert({
      id: user.id,
      email: user.email,
      full_name: fullName,
      brokerage,
      intake_slug: intakeSlug,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── LISTINGS ──────────────────────────────────────────────────────────────────

export async function getListings() {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createListing({
  address,
  city,
  sellerName,
  sellerEmail,
  mlsNumber,
  listPrice,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No authenticated user");

  // 1️⃣ Ensure agent exists
  const { data: agent, error: agentError } = await supabase
    .from("agents")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (agentError) throw agentError;

  // If agent doesn't exist, create it
  if (!agent) {
    const { error: insertAgentError } = await supabase.from("agents").insert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || "New Agent",
    });

    if (insertAgentError) throw insertAgentError;
  }

  // 2️⃣ Now safely create listing
  const { data, error } = await supabase
    .from("listings")
    .insert({
      agent_id: user.id,
      address,
      city,
      seller_name: sellerName,
      seller_email: sellerEmail,
      mls_number: mlsNumber,
      list_price: listPrice,
      status: "sent",
      sent_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Used by seller form — no auth required, just the token
export async function getListingByToken(token) {
  const { data, error } = await supabase
    .from("listings")
    .select("*, agents(full_name, email)")
    .eq("intake_token", token)
    .single();
  if (error) throw error;
  return data;
}

export async function markListingInProgress(token) {
  const { error } = await supabase
    .from("listings")
    .update({ status: "in_progress" })
    .eq("intake_token", token);
  if (error) throw error;
}

export async function submitUtilities(token, utilities) {
  const { data, error } = await supabase
    .from("listings")
    .update({
      utilities,
      status: "submitted",
      submitted_at: new Date().toISOString(),
    })
    .eq("intake_token", token)
    .select("*, agents(full_name, email)")
    .single();
  if (error) throw error;
  return data;
}

export async function deleteListing(id) {
  const { error } = await supabase.from("listings").delete().eq("id", id);
  if (error) throw error;
}
