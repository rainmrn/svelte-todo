import { fail, redirect } from "@sveltejs/kit";
import db from "$lib/utilities/db";
import * as argon2 from 'argon2';
import type { Actions } from "./$types";

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email) {
            console.log("Email is missing");
            return fail(400, { email, missing: true });
        }

        const userRow = await db.query("SELECT email FROM users WHERE email = $1", [email.toString()]);
        if ((userRow?.rowCount ?? 0) >= 1) {
            console.log("duplicate email");
            return fail(400, { email, duplicate: true });
        }

        if (!password || password?.toString().length < 8) {
            return fail(400, { email, passwordTooShort: true });
        }

        try {
            const hash = await argon2.hash(password.toString());
            console.log(hash);
            await db.query("INSERT INTO users(email, password) VALUES($1, $2)",
                [email, hash]
            )
        } catch (e) {
            console.error(e);
            return fail(400, { email, genericError: true });
        }

        return redirect(303, "/auth/login");
    }
} satisfies Actions;