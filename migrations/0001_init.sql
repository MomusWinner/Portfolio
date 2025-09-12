create extension if not exists "uuid-ossp";

create schema portfolio;

create table portfolio.session(
	id         uuid primary key default uuid_generate_v4(),
	ip         string not null,
	time_spent bigint not null default 0,
	created_at timestamp not null default now()
);

create table portfolio.offer(
    id         uuid primary key default uuid_generate_v4(),
	session_id uuid references session on delete cascade,
	name       string not null,
	email      string not null,
	message    string not null
);

create table portfolio.project_info(
	id         uuid primary key default uuid_generate_v4(),
	session_id uuid references session on delete cascade,
	name       varchar(200) not null,
	time_spent bigint not null default 0
);

create table portfolio.action(
	id         uuid primary key default uuid_generate_v4(),
	session_id uuid references session on delete cascade,
	name varchar(200) not null
);

create table portfolio.admin(
	id         uuid primary key default uuid_generate_v4(),
	email      varchar(200) not null unique,
	password   varchar(200) not null,
	created_at timestamp not null default now()
);
