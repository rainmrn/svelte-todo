import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    if (event.locals.user === null || event.locals.session === null) {
        return redirect(307, "/auth/login");
    }

    return redirect(303, "/app");
}