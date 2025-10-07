import { Sql } from "postgres";

export const getSessionsByIDQuery = `-- name: GetSessionsByID :one

select s.id, s.tag, s.ip, s.device, s.created_at, tta.alias from portfolio.session s
left join portfolio.tag_to_alias tta on s.tag = tta.tag
where s.id = $1`;

export interface GetSessionsByIDArgs {
    id: string;
}

export interface GetSessionsByIDRow {
    id: string;
    tag: string | null;
    ip: string;
    device: string;
    createdAt: Date;
    alias: string | null;
}

export async function getSessionsByID(sql: Sql, args: GetSessionsByIDArgs): Promise<GetSessionsByIDRow | null> {
    const rows = await sql.unsafe(getSessionsByIDQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        tag: row[1],
        ip: row[2],
        device: row[3],
        createdAt: row[4],
        alias: row[5]
    };
}

export const getAllSessionsQuery = `-- name: GetAllSessions :many
select 
	s.id,
	s.tag,
	s.ip,
	s.device,
	s.created_at,
	tta.alias,
	coalesce(sum(t.t_end - t.t_start), interval '0') as total_time
from portfolio.session s
left join portfolio.time_interval t on t.session_id = s.id
left join portfolio.tag_to_alias tta on s.tag = tta.tag
group by s.id, s.tag, s.device, s.ip, s.created_at, tta.alias
order by created_at desc`;

export interface GetAllSessionsRow {
    id: string;
    tag: string | null;
    ip: string;
    device: string;
    createdAt: Date;
    alias: string | null;
    totalTime: string | null;
}

export async function getAllSessions(sql: Sql): Promise<GetAllSessionsRow[]> {
    return (await sql.unsafe(getAllSessionsQuery, []).values()).map(row => ({
        id: row[0],
        tag: row[1],
        ip: row[2],
        device: row[3],
        createdAt: row[4],
        alias: row[5],
        totalTime: row[6]
    }));
}

export const createSessionQuery = `-- name: CreateSession :one
insert into portfolio.session(tag, ip, device)
values ($1, $2, $3)
returning id, tag, ip, device, created_at`;

export interface CreateSessionArgs {
    tag: string | null;
    ip: string;
    device: string;
}

export interface CreateSessionRow {
    id: string;
    tag: string | null;
    ip: string;
    device: string;
    createdAt: Date;
}

export async function createSession(sql: Sql, args: CreateSessionArgs): Promise<CreateSessionRow | null> {
    const rows = await sql.unsafe(createSessionQuery, [args.tag, args.ip, args.device]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        tag: row[1],
        ip: row[2],
        device: row[3],
        createdAt: row[4]
    };
}

export const deleteSessionQuery = `-- name: DeleteSession :exec
delete from portfolio.session s
where s.id = $1`;

export interface DeleteSessionArgs {
    id: string;
}

export async function deleteSession(sql: Sql, args: DeleteSessionArgs): Promise<void> {
    await sql.unsafe(deleteSessionQuery, [args.id]);
}

export const getAllAliasesQuery = `-- name: GetAllAliases :many

select tta.id, tta.tag, tta.alias from portfolio.tag_to_alias tta`;

export interface GetAllAliasesRow {
    id: string;
    tag: string;
    alias: string;
}

export async function getAllAliases(sql: Sql): Promise<GetAllAliasesRow[]> {
    return (await sql.unsafe(getAllAliasesQuery, []).values()).map(row => ({
        id: row[0],
        tag: row[1],
        alias: row[2]
    }));
}

export const createAliasQuery = `-- name: CreateAlias :one
insert into portfolio.tag_to_alias(tag, alias)
values ($1, $2)
returning id, tag, alias`;

export interface CreateAliasArgs {
    tag: string;
    alias: string;
}

export interface CreateAliasRow {
    id: string;
    tag: string;
    alias: string;
}

export async function createAlias(sql: Sql, args: CreateAliasArgs): Promise<CreateAliasRow | null> {
    const rows = await sql.unsafe(createAliasQuery, [args.tag, args.alias]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        tag: row[1],
        alias: row[2]
    };
}

export const deleteAliasQuery = `-- name: DeleteAlias :exec
delete from portfolio.tag_to_alias tta
where tta.id = $1`;

export interface DeleteAliasArgs {
    id: string;
}

export async function deleteAlias(sql: Sql, args: DeleteAliasArgs): Promise<void> {
    await sql.unsafe(deleteAliasQuery, [args.id]);
}

export const getTimeIntervalByIDQuery = `-- name: GetTimeIntervalByID :one

select t.id, session_id, t_start, t_end from portfolio.time_interval t 
where t.id = $1`;

export interface GetTimeIntervalByIDArgs {
    id: string;
}

export interface GetTimeIntervalByIDRow {
    id: string;
    sessionId: string;
    tStart: Date;
    tEnd: Date;
}

export async function getTimeIntervalByID(sql: Sql, args: GetTimeIntervalByIDArgs): Promise<GetTimeIntervalByIDRow | null> {
    const rows = await sql.unsafe(getTimeIntervalByIDQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        sessionId: row[1],
        tStart: row[2],
        tEnd: row[3]
    };
}

export const getTimeIntervalsBySessionIDQuery = `-- name: GetTimeIntervalsBySessionID :many
select id, t.session_id, t_start, t_end from portfolio.time_interval t 
where t.session_id = $1
order by t_start desc`;

export interface GetTimeIntervalsBySessionIDArgs {
    sessionId: string;
}

export interface GetTimeIntervalsBySessionIDRow {
    id: string;
    sessionId: string;
    tStart: Date;
    tEnd: Date;
}

export async function getTimeIntervalsBySessionID(sql: Sql, args: GetTimeIntervalsBySessionIDArgs): Promise<GetTimeIntervalsBySessionIDRow[]> {
    return (await sql.unsafe(getTimeIntervalsBySessionIDQuery, [args.sessionId]).values()).map(row => ({
        id: row[0],
        sessionId: row[1],
        tStart: row[2],
        tEnd: row[3]
    }));
}

export const getTimeIntervalsBySessionIDAndDayQuery = `-- name: GetTimeIntervalsBySessionIDAndDay :many
select id, t.session_id, t_start, t_end from portfolio.time_interval t 
where t.session_id = $1 and DATE(t.t_start) = $2
order by t_start desc`;

export interface GetTimeIntervalsBySessionIDAndDayArgs {
    sessionId: string;
    tStart: Date;
}

export interface GetTimeIntervalsBySessionIDAndDayRow {
    id: string;
    sessionId: string;
    tStart: Date;
    tEnd: Date;
}

export async function getTimeIntervalsBySessionIDAndDay(sql: Sql, args: GetTimeIntervalsBySessionIDAndDayArgs): Promise<GetTimeIntervalsBySessionIDAndDayRow[]> {
    return (await sql.unsafe(getTimeIntervalsBySessionIDAndDayQuery, [args.sessionId, args.tStart]).values()).map(row => ({
        id: row[0],
        sessionId: row[1],
        tStart: row[2],
        tEnd: row[3]
    }));
}

export const getAllTimeIntervalsQuery = `-- name: GetAllTimeIntervals :many
select id, t.session_id, t_start, t_end from portfolio.time_interval t 
order by t_start desc`;

export interface GetAllTimeIntervalsRow {
    id: string;
    sessionId: string;
    tStart: Date;
    tEnd: Date;
}

export async function getAllTimeIntervals(sql: Sql): Promise<GetAllTimeIntervalsRow[]> {
    return (await sql.unsafe(getAllTimeIntervalsQuery, []).values()).map(row => ({
        id: row[0],
        sessionId: row[1],
        tStart: row[2],
        tEnd: row[3]
    }));
}

export const createTimeIntervalQuery = `-- name: CreateTimeInterval :one
insert into portfolio.time_interval(session_id, t_start, t_end)
values ($1, $2, $3)
returning id, session_id, t_start, t_end`;

export interface CreateTimeIntervalArgs {
    sessionId: string;
    tStart: Date;
    tEnd: Date;
}

export interface CreateTimeIntervalRow {
    id: string;
    sessionId: string;
    tStart: Date;
    tEnd: Date;
}

export async function createTimeInterval(sql: Sql, args: CreateTimeIntervalArgs): Promise<CreateTimeIntervalRow | null> {
    const rows = await sql.unsafe(createTimeIntervalQuery, [args.sessionId, args.tStart, args.tEnd]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        sessionId: row[1],
        tStart: row[2],
        tEnd: row[3]
    };
}

export const deleteTimeIntervalQuery = `-- name: DeleteTimeInterval :exec
delete from portfolio.time_interval t
where t.id = $1`;

export interface DeleteTimeIntervalArgs {
    id: string;
}

export async function deleteTimeInterval(sql: Sql, args: DeleteTimeIntervalArgs): Promise<void> {
    await sql.unsafe(deleteTimeIntervalQuery, [args.id]);
}

export const getOfferByIDQuery = `-- name: GetOfferByID :one

select o.id, session_id, name, email, message, created_at from portfolio.offer o
where o.id = $1`;

export interface GetOfferByIDArgs {
    id: string;
}

export interface GetOfferByIDRow {
    id: string;
    sessionId: string | null;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

export async function getOfferByID(sql: Sql, args: GetOfferByIDArgs): Promise<GetOfferByIDRow | null> {
    const rows = await sql.unsafe(getOfferByIDQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        sessionId: row[1],
        name: row[2],
        email: row[3],
        message: row[4],
        createdAt: row[5]
    };
}

export const getAllOffersQuery = `-- name: GetAllOffers :many
select o.id, session_id, name, email, message, created_at from portfolio.offer o
order by created_at desc`;

export interface GetAllOffersRow {
    id: string;
    sessionId: string | null;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

export async function getAllOffers(sql: Sql): Promise<GetAllOffersRow[]> {
    return (await sql.unsafe(getAllOffersQuery, []).values()).map(row => ({
        id: row[0],
        sessionId: row[1],
        name: row[2],
        email: row[3],
        message: row[4],
        createdAt: row[5]
    }));
}

export const createOfferQuery = `-- name: CreateOffer :one
insert into portfolio.offer(session_id, name, email, message)
values ($1, $2, $3, $4)
returning id, session_id, name, email, message, created_at`;

export interface CreateOfferArgs {
    sessionId: string | null;
    name: string;
    email: string;
    message: string;
}

export interface CreateOfferRow {
    id: string;
    sessionId: string | null;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

export async function createOffer(sql: Sql, args: CreateOfferArgs): Promise<CreateOfferRow | null> {
    const rows = await sql.unsafe(createOfferQuery, [args.sessionId, args.name, args.email, args.message]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        sessionId: row[1],
        name: row[2],
        email: row[3],
        message: row[4],
        createdAt: row[5]
    };
}

export const deleteOfferQuery = `-- name: DeleteOffer :exec
delete from portfolio.offer o
where o.id = $1`;

export interface DeleteOfferArgs {
    id: string;
}

export async function deleteOffer(sql: Sql, args: DeleteOfferArgs): Promise<void> {
    await sql.unsafe(deleteOfferQuery, [args.id]);
}

export const getAdminByIDQuery = `-- name: GetAdminByID :one



select a.id, email, password, created_at from portfolio.admin a
where a.id = $1`;

export interface GetAdminByIDArgs {
    id: string;
}

export interface GetAdminByIDRow {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
}

export async function getAdminByID(sql: Sql, args: GetAdminByIDArgs): Promise<GetAdminByIDRow | null> {
    const rows = await sql.unsafe(getAdminByIDQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        email: row[1],
        password: row[2],
        createdAt: row[3]
    };
}

export const getAdminByEmailQuery = `-- name: GetAdminByEmail :one
select id, a.email, password, created_at from portfolio.admin a
where a.email = $1`;

export interface GetAdminByEmailArgs {
    email: string;
}

export interface GetAdminByEmailRow {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
}

export async function getAdminByEmail(sql: Sql, args: GetAdminByEmailArgs): Promise<GetAdminByEmailRow | null> {
    const rows = await sql.unsafe(getAdminByEmailQuery, [args.email]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        email: row[1],
        password: row[2],
        createdAt: row[3]
    };
}

export const getAllAdminsQuery = `-- name: GetAllAdmins :many
select a.id, email, password, created_at from portfolio.admin a
order by created_at desc`;

export interface GetAllAdminsRow {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
}

export async function getAllAdmins(sql: Sql): Promise<GetAllAdminsRow[]> {
    return (await sql.unsafe(getAllAdminsQuery, []).values()).map(row => ({
        id: row[0],
        email: row[1],
        password: row[2],
        createdAt: row[3]
    }));
}

export const createAdminQuery = `-- name: CreateAdmin :one
insert into portfolio.admin(email, password)
values ($1, $2)
returning id, email, password, created_at`;

export interface CreateAdminArgs {
    email: string;
    password: string;
}

export interface CreateAdminRow {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
}

export async function createAdmin(sql: Sql, args: CreateAdminArgs): Promise<CreateAdminRow | null> {
    const rows = await sql.unsafe(createAdminQuery, [args.email, args.password]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        email: row[1],
        password: row[2],
        createdAt: row[3]
    };
}

export const deleteAdminQuery = `-- name: DeleteAdmin :exec
delete from portfolio.admin a
where a.id = $1`;

export interface DeleteAdminArgs {
    id: string;
}

export async function deleteAdmin(sql: Sql, args: DeleteAdminArgs): Promise<void> {
    await sql.unsafe(deleteAdminQuery, [args.id]);
}

