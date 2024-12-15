<script lang="ts">
    import axios from "axios";
    import {     AuthResultStore,
             GeneralDisplayStore,
             DisplaySuccSnackbar,
             DisplayFailSnackbar,
             DisplayInfoSnackbar,
                    MyBlurParams,
           } from "../global";
    import { onMount } from "svelte"           ;
    import { blur    } from "svelte/transition";
    $GeneralDisplayStore.title = "Auth";
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
        if (authResult.status === 200
        ||  authResult.status === 201) {
            AuthResultStore.set(authResult.data);
            ui("#succ-snackbar");
        } else {
            ui("#fail-snackbar");
        }
    };

    $: {
        console.warn($AuthResultStore);
    }
</script>

<div class="padding absolute center middle">
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <div class="field label round center large-elevate extra">
        <input type="text" bind:value={username} />
        <label>Username</label>
    </div>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <div class="field label round center large-elevate extra">
        <input type="text" bind:value={password} />
        <label>Password</label>
    </div>
    <button
        class="center large-elevate inverse-primary"
        on:click={OnClick_SignInButton}>Sign In</button
    >
</div>
