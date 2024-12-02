<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { AuthResultStore, StaffResultStore } from "../global";
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

<h1 class="center-align">Home</h1>
<button class="extend circle medium-elevate">
    <i>add</i>
    <span>Pick Up New</span>
</button>
<button class="extend circle medium-elevate">
    <i>add</i>
    <span>Pick Up On Going</span>
</button>
<button class="extend circle medium-elevate">
    <i>add</i>
    <span>Deliver New</span>
</button>
<button class="extend circle medium-elevate">
    <i>add</i>
    <span>Deliver On Going</span>
</button>
