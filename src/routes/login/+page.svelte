<script lang="ts">
    import { enhance } from "$app/forms";
    let loading = false;
</script>

<br />
<br />
{loading ? "loading" : ""}
<br />
<br />

<form
    method="post"
    action="?/login"
    use:enhance={() => {
        loading = true;
        return async ({ update }) => {
            update();
        };
    }}
>
    <input type="email" name="email" />
    <br />
    <br />
    <input type="text" name="password" />
    <br />
    <br />
    <button type="submit">login</button>
</form>

<br />
<br />

<form
    method="post"
    action="?/register"
    use:enhance={() => {
        loading = true;
        return async ({ update }) => {
            loading = false;
            update();
        };
    }}
>
    <input type="email" name="email" />
    <br />
    <br />
    <input type="text" name="password" />
    <br />
    <br />
    <button type="submit">signUp</button>
</form>
