import { fail, redirect } from "@sveltejs/kit";
import db from "$lib/utilities/db";
import * as argon2 from 'argon2';
import type { Actions } from "../../$types";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/utilities/session";
import type { Session } from "$lib/utilities/session";

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email) {
			return fail(400, { email, missing: true });
		}

        const userRow = await db.query("SELECT id, email, password FROM users WHERE email = $1", [email.toString()]);
        if ((userRow?.rowCount ?? 0) === 0) {
            return fail(400, { email, emailNotExist: true})
        }

        if (!password) {
            console.log("here");
            return fail(400, { email, wrongCredentials: true });
        }
        
        try {
            const hashInDb: string = userRow.rows[0].password;
            const isValidPassword = await argon2.verify(hashInDb, password.toString());
        
            if (!isValidPassword) {
                return fail(400, { email, wrongCredentials: true });
            }
        } catch (e) {
            console.error(e);
            return fail(400, { email, genericError: true });
        }
        
        // reaching here means password is valid
        if (event.locals.user?.id === userRow.rows[0].id) { // if already logged in
            return redirect(303, "/app"); // redirect to app without creating a new session
        }

        // otherwise, create a new session
        const token = generateSessionToken();
        const newSession: Session = await createSession(token, userRow.rows[0].id);
        event.locals.session = newSession;
        event.locals.user = { id: userRow.rows[0].id };
        setSessionTokenCookie(event, token, newSession.expiresAt);
    
        return redirect(303, "/app");
    }
} satisfies Actions;