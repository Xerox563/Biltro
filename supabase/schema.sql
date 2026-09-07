create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_name text not null,
  shop_name text,
  purchase_date date not null,
  warranty_months integer not null,
  expiry_date date not null,
  bill_image_path text,
  created_at timestamptz not null default now()
);

alter table items enable row level security;

create policy "users can view their own items"
  on items for select
  using (auth.uid() = user_id);

create policy "users can insert their own items"
  on items for insert
  with check (auth.uid() = user_id);

create policy "users can update their own items"
  on items for update
  using (auth.uid() = user_id);

create policy "users can delete their own items"
  on items for delete
  using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('bills', 'bills', false)
on conflict (id) do nothing;

create policy "users can upload their own bills"
  on storage.objects for insert
  with check (bucket_id = 'bills' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users can view their own bills"
  on storage.objects for select
  using (bucket_id = 'bills' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users can delete their own bills"
  on storage.objects for delete
  using (bucket_id = 'bills' and auth.uid()::text = (storage.foldername(name))[1]);
