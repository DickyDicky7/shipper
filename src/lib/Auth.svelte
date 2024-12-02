<script lang="ts">
    import axios from "axios";
    import { AuthResultStore } from "../global";
    let username: string = "sh1";
    let password: string = "sh1";
    const OnClick_SignInButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
    ) => {
        const authResult = await axios.post(
            "/auth/sign-in",
            {
                username: username,
                password: password,
            },
            {
                baseURL: "https://waseminarcnpm2.azurewebsites.net",
            },
        );
        console.dir(authResult, { depth: null });
        if (authResult.status === 200) {
            AuthResultStore.set(authResult.data);
        }
    };

    $: {
        console.warn($AuthResultStore);
    }
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<div class="field label border round center medium-elevate">
    <input type="text" bind:value={username} />
    <label>Username</label>
</div>
<!-- svelte-ignore a11y_label_has_associated_control -->
<div class="field label border round center medium-elevate">
    <input type="text" bind:value={password} />
    <label>Password</label>
</div>
<button class="center medium-elevate" on:click={OnClick_SignInButton}
    >Sign In</button
>
