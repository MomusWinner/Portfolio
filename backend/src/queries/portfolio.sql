-- name: GetSessionsByID :one
select s.id, ip, time_spent, created_at from portfolio.session s
where s.id = $1;
