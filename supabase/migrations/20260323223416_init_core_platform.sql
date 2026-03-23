create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint households_owner_user_id_unique unique (owner_user_id)
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households (id) on delete cascade,
  name text not null,
  age_or_grade_band text,
  notes text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  subject text not null,
  title text not null,
  description text not null default '',
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint goals_status_check check (status in ('draft', 'active', 'paused', 'completed', 'archived'))
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households (id) on delete cascade,
  student_id uuid references public.students (id) on delete set null,
  title text not null,
  resource_type text not null,
  source_url text,
  notes text not null default '',
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint resources_type_check check (
    resource_type in ('book', 'workbook', 'pdf', 'link', 'video', 'app', 'project', 'activity', 'other')
  ),
  constraint resources_status_check check (status in ('active', 'archived'))
);

create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  goal_id uuid not null references public.goals (id) on delete cascade,
  title text not null,
  description text not null default '',
  status text not null default 'draft',
  parent_approved boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint branches_status_check check (status in ('draft', 'proposed', 'active', 'paused', 'completed', 'archived'))
);

create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references public.branches (id) on delete cascade,
  title text not null,
  description text not null default '',
  sort_order integer not null default 0,
  status text not null default 'upcoming',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint milestones_status_check check (status in ('upcoming', 'active', 'completed'))
);

create table if not exists public.learning_cards (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  branch_id uuid references public.branches (id) on delete set null,
  milestone_id uuid references public.milestones (id) on delete set null,
  title text not null,
  description text not null default '',
  card_type text not null default 'lesson',
  status text not null default 'suggested',
  sort_order integer not null default 0,
  estimated_effort integer,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint learning_cards_card_type_check check (
    card_type in ('lesson', 'review', 'mastery_check', 'project', 'practice', 'other')
  ),
  constraint learning_cards_status_check check (
    status in ('suggested', 'ready', 'in_progress', 'completed', 'skipped', 'archived')
  )
);

create table if not exists public.progress_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  learning_card_id uuid not null references public.learning_cards (id) on delete cascade,
  event_type text not null,
  score_or_result text,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint progress_events_type_check check (
    event_type in ('completed', 'attempted', 'reviewed', 'mastery_pass', 'mastery_needs_review')
  )
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'trialing',
  trial_ends_at timestamptz,
  current_period_ends_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint subscriptions_household_id_unique unique (household_id),
  constraint subscriptions_status_check check (status in ('trialing', 'active', 'past_due', 'canceled', 'expired'))
);

create index if not exists students_household_id_idx on public.students (household_id);
create index if not exists goals_student_id_idx on public.goals (student_id);
create index if not exists resources_household_id_idx on public.resources (household_id);
create index if not exists resources_student_id_idx on public.resources (student_id);
create index if not exists branches_student_id_idx on public.branches (student_id);
create index if not exists branches_goal_id_idx on public.branches (goal_id);
create index if not exists milestones_branch_id_idx on public.milestones (branch_id);
create index if not exists learning_cards_student_id_idx on public.learning_cards (student_id);
create index if not exists learning_cards_branch_id_idx on public.learning_cards (branch_id);
create index if not exists learning_cards_milestone_id_idx on public.learning_cards (milestone_id);
create index if not exists progress_events_student_id_idx on public.progress_events (student_id);
create index if not exists progress_events_learning_card_id_idx on public.progress_events (learning_card_id);

create trigger set_households_updated_at
before update on public.households
for each row
execute function public.set_updated_at();

create trigger set_students_updated_at
before update on public.students
for each row
execute function public.set_updated_at();

create trigger set_goals_updated_at
before update on public.goals
for each row
execute function public.set_updated_at();

create trigger set_resources_updated_at
before update on public.resources
for each row
execute function public.set_updated_at();

create trigger set_branches_updated_at
before update on public.branches
for each row
execute function public.set_updated_at();

create trigger set_milestones_updated_at
before update on public.milestones
for each row
execute function public.set_updated_at();

create trigger set_learning_cards_updated_at
before update on public.learning_cards
for each row
execute function public.set_updated_at();

create trigger set_subscriptions_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();

alter table public.households enable row level security;
alter table public.students enable row level security;
alter table public.goals enable row level security;
alter table public.resources enable row level security;
alter table public.branches enable row level security;
alter table public.milestones enable row level security;
alter table public.learning_cards enable row level security;
alter table public.progress_events enable row level security;
alter table public.subscriptions enable row level security;

create policy "Households are owner scoped"
on public.households
for all
using (auth.uid() = owner_user_id)
with check (auth.uid() = owner_user_id);

create policy "Students are household scoped"
on public.students
for all
using (
  exists (
    select 1
    from public.households
    where households.id = students.household_id
      and households.owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.households
    where households.id = students.household_id
      and households.owner_user_id = auth.uid()
  )
);

create policy "Goals are student scoped"
on public.goals
for all
using (
  exists (
    select 1
    from public.students
    join public.households on households.id = students.household_id
    where students.id = goals.student_id
      and households.owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.students
    join public.households on households.id = students.household_id
    where students.id = goals.student_id
      and households.owner_user_id = auth.uid()
  )
);

create policy "Resources are household scoped"
on public.resources
for all
using (
  exists (
    select 1
    from public.households
    where households.id = resources.household_id
      and households.owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.households
    where households.id = resources.household_id
      and households.owner_user_id = auth.uid()
  )
);

create policy "Branches are household scoped"
on public.branches
for all
using (
  exists (
    select 1
    from public.students
    join public.households on households.id = students.household_id
    where students.id = branches.student_id
      and households.owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.students
    join public.households on households.id = students.household_id
    where students.id = branches.student_id
      and households.owner_user_id = auth.uid()
  )
);

create policy "Milestones are household scoped"
on public.milestones
for all
using (
  exists (
    select 1
    from public.branches
    join public.students on students.id = branches.student_id
    join public.households on households.id = students.household_id
    where branches.id = milestones.branch_id
      and households.owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.branches
    join public.students on students.id = branches.student_id
    join public.households on households.id = students.household_id
    where branches.id = milestones.branch_id
      and households.owner_user_id = auth.uid()
  )
);

create policy "Learning cards are household scoped"
on public.learning_cards
for all
using (
  exists (
    select 1
    from public.students
    join public.households on households.id = students.household_id
    where students.id = learning_cards.student_id
      and households.owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.students
    join public.households on households.id = students.household_id
    where students.id = learning_cards.student_id
      and households.owner_user_id = auth.uid()
  )
);

create policy "Progress events are household scoped"
on public.progress_events
for all
using (
  exists (
    select 1
    from public.students
    join public.households on households.id = students.household_id
    where students.id = progress_events.student_id
      and households.owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.students
    join public.households on households.id = students.household_id
    where students.id = progress_events.student_id
      and households.owner_user_id = auth.uid()
  )
);

create policy "Subscriptions are household scoped"
on public.subscriptions
for all
using (
  exists (
    select 1
    from public.households
    where households.id = subscriptions.household_id
      and households.owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.households
    where households.id = subscriptions.household_id
      and households.owner_user_id = auth.uid()
  )
);
