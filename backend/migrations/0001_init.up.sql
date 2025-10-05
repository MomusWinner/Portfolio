create extension if not exists "uuid-ossp";

create schema portfolio;

create table portfolio.session(
	id         uuid primary key default uuid_generate_v4(),
	tag        varchar(500),
	ip         varchar(32) not null,
	created_at timestamp not null default now()
);

create table portfolio.tag_to_alias(
	id         uuid primary key default uuid_generate_v4(),
	tag        varchar(500) not null unique,
	alias      varchar(1000) not null
);

create table portfolio.time_interval(
	id         uuid primary key default uuid_generate_v4(),
	session_id uuid references portfolio.session on delete cascade not null,
	t_start      timestamp not null,
	t_end        timestamp not null
);

create table portfolio.offer(
  id         uuid primary key default uuid_generate_v4(),
	session_id uuid references portfolio.session on delete cascade,
	name       varchar(200) not null,
	email      varchar(200) not null,
	message    varchar(1000) not null,
	created_at timestamp not null default now()
);

create table portfolio.admin(
	id         uuid primary key default uuid_generate_v4(),
	email      varchar(200) not null unique,
	password   varchar(200) not null,
	created_at timestamp not null default now()
);
