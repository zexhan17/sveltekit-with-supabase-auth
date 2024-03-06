<script lang="ts">
    import type { LayoutData } from "./$types";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    export let data: LayoutData;

    let { session, supabase } = data;
    $: ({ session, supabase } = data);

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate("supabase:auth");
            }
        });

        return () => subscription.unsubscribe();
    });
</script>

{#if !!session}
    <h1>Authenticated</h1>
{/if}

<slot />
