----------
-- SESSION
----------

-- name: GetSessionsByID :one
select s.id, s.tag, s.ip, s.created_at, tta.alias from portfolio.session s
left join portfolio.tag_to_alias tta on s.tag = tta.tag
where s.id = $1;

-- name: GetAllSessions :many
select 
	s.id,
	s.tag,
	s.ip,
	s.created_at,
	tta.alias,
	coalesce(sum(t.t_end - t.t_start), interval '0') as total_time
from portfolio.session s
left join portfolio.time_interval t on t.session_id = s.id
left join portfolio.tag_to_alias tta on s.tag = tta.tag
group by s.id, s.tag, s.ip, s.created_at, tta.alias
order by created_at desc;

-- name: CreateSession :one
insert into portfolio.session(tag, ip)
values ($1, $2)
returning *;

-- name: DeleteSession :exec
delete from portfolio.session s
where s.id = $1;

----------
-- ALIAS
----------

-- name: GetAllAliases :many
select tta.id, tta.tag, tta.alias from portfolio.tag_to_alias tta;

-- name: CreateAlias :one
insert into portfolio.tag_to_alias(tag, alias)
values ($1, $2)
returning *;

-- name: DeleteAlias :exec
delete from portfolio.tag_to_alias tta
where tta.id = $1;

----------------
-- TIME INTERVAL
----------------

-- name: GetTimeIntervalByID :one
select t.id, session_id, t_start, t_end from portfolio.time_interval t 
where t.id = $1;

-- name: GetTimeIntervalsBySessionID :many
select id, t.session_id, t_start, t_end from portfolio.time_interval t 
where t.session_id = $1
order by t_start desc;

-- name: GetTimeIntervalsBySessionIDAndDay :many
select id, t.session_id, t_start, t_end from portfolio.time_interval t 
-- where t.session_id = $1 and t.t_start >= $2::date and t.t_start < ($2::date + INTERVAL '1 day')
where t.session_id = $1 and DATE(t.t_start) = $2
order by t_start desc;

-- name: GetAllTimeIntervals :many
select id, t.session_id, t_start, t_end from portfolio.time_interval t 
order by t_start desc;

-- name: CreateTimeInterval :one
insert into portfolio.time_interval(session_id, t_start, t_end)
values ($1, $2, $3)
returning *;

-- name: DeleteTimeInterval :exec
delete from portfolio.time_interval t
where t.id = $1;

--------
-- OFFER
--------

-- name: GetOfferByID :one
select o.id, session_id, name, email, message, created_at from portfolio.offer o
where o.id = $1;

-- name: GetAllOffers :many
select o.id, session_id, name, email, message, created_at from portfolio.offer o
order by created_at desc;

-- name: CreateOffer :one
insert into portfolio.offer(session_id, name, email, message)
values ($1, $2, $3, $4)
returning *;

-- name: DeleteOffer :exec
delete from portfolio.offer o
where o.id = $1;

---------
-- ACTION
---------

-- -- name: GetActionByID :one
-- select o.id, session_id, name, created_at from portfolio.action o
-- where o.id = $1;
--
-- -- name: GetAllAction :many
-- select o.id, session_id, name, created_at from portfolio.action o
-- order by created_at desc;
--
-- -- name: CreateAction :one
-- insert into portfolio.action(session_id, name)
-- values ($1, $2)
-- returning *;
--
-- -- name: DeleteActionById :exec
-- delete from portfolio.action a
-- where a.id = $1;

--------
-- ADMIN
--------

-- name: GetAdminByID :one
select a.id, email, password, created_at from portfolio.admin a
where a.id = $1;

-- name: GetAdminByEmail :one
select id, a.email, password, created_at from portfolio.admin a
where a.email = $1;

-- name: GetAllAdmins :many
select a.id, email, password, created_at from portfolio.admin a
order by created_at desc;

-- name: CreateAdmin :one
insert into portfolio.admin(email, password)
values ($1, $2)
returning *;

-- name: DeleteAdmin :exec
delete from portfolio.admin a
where a.id = $1;
