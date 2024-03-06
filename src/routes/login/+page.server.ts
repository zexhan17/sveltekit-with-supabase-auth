import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession } }) => {
    if (await getSession()) {
        throw redirect(303, '/app')
    }
}) satisfies PageServerLoad;

import { redirect } from '@sveltejs/kit';


export const actions = {
    login: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get('email')
        const password = formData.get('password')
        try {
            if (typeof (email) == 'string' && typeof (password) == 'string') {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password })
                if (data.user) {
                    throw redirect(303, '/app');
                } else {
                    console.log(error?.message)
                }
            }

        } catch (error) {
            console.log(error)
        }

    },
    register: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get('email')
        const password = formData.get('password')
        try {
            if (typeof (email) == 'string' && typeof (password) == 'string') {

                const { data, error } = await supabase.auth.signUp({ email, password })
                if (!data.user) {
                    console.log(error?.message)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
};