-- UtilityCollect — Supabase Database Schema
-- HOW TO USE: Go to https://app.supabase.com → SQL Editor → New Query → paste this → Run
-- ── Agents table ─────────────────────────────────────────────────────────────
CREATE TABLE agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  brokerage TEXT,
  intake_slug TEXT UNIQUE -- e.g. "jamie-dawson" for /agent/jamie-dawson reusable link
);
-- ── Listings table ────────────────────────────────────────────────────────────
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  -- Property
  address TEXT NOT NULL,
  city TEXT,
  mls_number TEXT,
  list_price TEXT,
  -- Seller
  seller_name TEXT NOT NULL,
  seller_email TEXT,
  -- Status
  status TEXT DEFAULT 'sent' CHECK (
    status IN ('sent', 'in_progress', 'submitted', 'overdue')
  ),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submitted_at TIMESTAMP WITH TIME ZONE,
  -- Utilities (filled in by seller — stored as JSON)
  utilities JSONB DEFAULT '{}'::jsonb,
  -- Unique unguessable token for the seller intake link
  intake_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex')
);
-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX listings_agent_id_idx ON listings(agent_id);
CREATE INDEX listings_status_idx ON listings(status);
CREATE INDEX listings_intake_token_idx ON listings(intake_token);
-- ── Row Level Security ────────────────────────────────────────────────────────
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
-- Agents can only see/edit their own profile
CREATE POLICY "Agents read own profile" ON agents FOR
SELECT USING (auth.uid() = id);
CREATE POLICY "Agents update own profile" ON agents FOR
UPDATE USING (auth.uid() = id);
-- Agents can only see/edit their own listings
CREATE POLICY "Agents read own listings" ON listings FOR
SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Agents insert own listings" ON listings FOR
INSERT WITH CHECK (auth.uid() = agent_id);
CREATE POLICY "Agents update own listings" ON listings FOR
UPDATE USING (auth.uid() = agent_id);
CREATE POLICY "Agents delete own listings" ON listings FOR DELETE USING (auth.uid() = agent_id);
-- Sellers can read and update a listing using only its intake_token (no login needed)
CREATE POLICY "Seller read by token" ON listings FOR
SELECT USING (intake_token IS NOT NULL);
CREATE POLICY "Seller update by token" ON listings FOR
UPDATE USING (intake_token IS NOT NULL) WITH CHECK (intake_token IS NOT NULL);