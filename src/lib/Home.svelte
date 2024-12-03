<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import {
            AuthResultStore,
        GeneralDisplayStore,
        SCREEN             ,
        ScreensHistoryStore,
           StaffResultStore,
    } from "../global";
    $GeneralDisplayStore.title    =     "Home"   ;
//  $ScreensHistoryStore.push(    SCREEN.HOME   );
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


    const OnClick_GoToDeliverNewButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore = [... $ScreensHistoryStore, SCREEN.DELIVER_NEW];
        console.log($ScreensHistoryStore);
    };
    const OnClick_GoToPickUp_NewButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore = [... $ScreensHistoryStore, SCREEN.PICK_UP_NEW];
        console.log($ScreensHistoryStore);
    };
    const OnClick_GoToDeliverOnGoingButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore = [... $ScreensHistoryStore, SCREEN.DELIVER_ON_GOING];
        console.log($ScreensHistoryStore);
    };
    const OnClick_GoToPickUp_OnGoingButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore = [... $ScreensHistoryStore, SCREEN.PICK_UP_ON_GOING];
        console.log($ScreensHistoryStore);
    };


    $: {
        console.warn($StaffResultStore);
    }
</script>

<!-- <h1 class="center-align">Home</h1> -->
<div class="absolute center middle">
    <button class="extend circle large-elevate inverse-primary  left-round    top-round" on:click={OnClick_GoToPickUp_NewButton}>
        <i class="fa-solid fa-cube"></i>
        <span>Pick Up New</span>
    </button>
    <hr class="medium">
    <button class="extend circle large-elevate         primary right-round    top-round" on:click={OnClick_GoToPickUp_OnGoingButton}>
        <i>add</i>
        <span>Pick Up On Going</span>
    </button>
    <hr class="medium">
    <button class="extend circle large-elevate inverse-primary right-round bottom-round" on:click={OnClick_GoToDeliverNewButton}>
        <i>add</i>
        <span>Deliver New</span>
    </button>
    <hr class="medium">
    <button class="extend circle large-elevate         primary  left-round bottom-round" on:click={OnClick_GoToDeliverOnGoingButton}>
        <i>add</i>
        <span>Deliver On Going</span>
    </button>
</div>
