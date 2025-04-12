import db from './db';
import type { RequestEvent } from '@sveltejs/kit';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
}

export interface User {
    id: number;
}

export type SessionValidationResult = 
    { session: Session; user: User } |
    { session: null; user: null };


export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function createSession(token: string, userId: number): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId: userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // + 1 month
    }
    const insertSessionQuery = {
        text: "INSERT INTO user_sessions(id, user_id, expires_at) VALUES($1, $2, $3)",
        values: [session.id, session.userId, session.expiresAt]
    }
    await db.query(insertSessionQuery);
    console.log("New session created for user id:", userId);

    return session;
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.query("DELETE FROM user_session WHERE id = $1", [sessionId]);
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	await db.query("DELETE FROM user_session WHERE user_id = $1", [userId]);
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    console.log("Validating session cookies...");

    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const sessionQueryResult = await db.query("SELECT us.id, us.user_id, us.expires_at FROM user_sessions us INNER JOIN users ON us.user_id = users.id WHERE us.id = $1", [sessionId]);

    const invalidSession: SessionValidationResult = {
        session: null, user: null
    }

    if (sessionQueryResult === null) {
        return invalidSession;
    }

    console.log(sessionQueryResult.rows[0]);

    const session: Session = {
        id: sessionQueryResult.rows[0].id,
        userId: sessionQueryResult.rows[0].user_id,
        expiresAt: sessionQueryResult.rows[0].expires_at
    };

    const user: User = {
        id: sessionQueryResult.rows[0].user_id
    }
    
    if (Date.now() >= session.expiresAt.getTime()) {
        await invalidateSession(session.id);
        return invalidSession;
    }

    // refresh session expiry date if user logs in 15 days before expiry or later
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await db.query("INSERT INTO user_sessions(id, user_id, expires_at) VALUES($1, $2, $3)", [session.id, session.userId, session.expiresAt]);
    }

    return { session: session, user: user };
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) : void {
    event.cookies.set("session", token, {
        httpOnly: true, // only accessible server-side
        sameSite: "lax",
        expires: expiresAt,
        path: "/" // can be accessed from all routes
    });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
    event.cookies.set("session", "", { 
        httpOnly: true, 
        sameSite: "lax",
        maxAge: 0,
        path: "/"
    });
}