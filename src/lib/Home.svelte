<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import {
            AuthResultStore,
        GeneralDisplayStore,
           StaffResultStore,
    } from "../global";
    $GeneralDisplayStore.title = "Home";
    onMount(async () => {
        if ($StaffResultStore.staff._id !== "") {
            return;
        }
        const staffResult = await axios.post(
            "/protected/get-staff-by-user-id",
            {
                userId: $AuthResultStore.data.id,
            },
            {
                baseURL: "https://waseminarcnpm2.azurewebsites.net",
            },
        );
        console.dir(staffResult, { depth: null });
        if (staffResult.status === 200) {
            StaffResultStore.set(staffResult.data);
        }
    });

    $: {
        console.warn($StaffResultStore);
    }
</script>

<!-- <h1 class="center-align">Home</h1> -->
<div class="absolute center middle">
    <button class="extend circle large-elevate inverse-primary  left-round    top-round">
        <i class="fa-solid fa-cube"></i>
        <span>Pick Up New</span>
    </button>
    <hr class="medium">
    <button class="extend circle large-elevate         primary right-round    top-round">
        <i>add</i>
        <span>Pick Up On Going</span>
    </button>
    <hr class="medium">
    <button class="extend circle large-elevate inverse-primary right-round bottom-round">
        <i>add</i>
        <span>Deliver New</span>
    </button>
    <hr class="medium">
    <button class="extend circle large-elevate         primary  left-round bottom-round">
        <i>add</i>
        <span>Deliver On Going</span>
    </button>
</div>
