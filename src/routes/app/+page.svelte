<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    import { goto } from "$app/navigation";
    let loading = false;

    const logOut = async () => {
        loading = true;
        const { error } = await data.supabase.auth.signOut();
        if (!error) {
            await goto("/login", { invalidateAll: true, replaceState: true });
        }
    };
</script>

<h1>Welcome App</h1>
<br />
<button on:click={logOut}>
    {loading ? "loading" : "logout"}
</button>
