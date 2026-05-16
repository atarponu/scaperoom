-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Sessions
create table sessions (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  player_name text,
  current_scene text default 'intro',
  completed boolean default false
);

-- Memory snapshots (full game state per save point)
create table memory_snapshots (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id) on delete cascade,
  snapshot jsonb not null,
  created_at timestamptz default now()
);

-- Index for fast retrieval of latest snapshot
create index memory_snapshots_session_created
  on memory_snapshots(session_id, created_at desc);

-- Row Level Security (optional, enable for multi-user)
-- alter table sessions enable row level security;
-- alter table memory_snapshots enable row level security;
