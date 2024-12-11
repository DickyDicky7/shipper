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
        if (staffResult.status === 200
        ||  staffResult.status === 201) {
            StaffResultStore.set(staffResult.data);
        }
    });


    const OnClick_GoToDeliverPick_UpButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore = [... $ScreensHistoryStore, SCREEN.DELIVER_PICK_UP];
        console.log($ScreensHistoryStore);
    };
    const OnClick_GoToDeliverOnGoingButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore = [... $ScreensHistoryStore, SCREEN.DELIVER_ONGOING];
        console.log($ScreensHistoryStore);
    };
    const OnClick_GoToDeliverHistoryButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore = [... $ScreensHistoryStore, SCREEN.DELIVER_HISTORY];
        console.log($ScreensHistoryStore);
    };
    const OnClick_GoToDeliverUnknownButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore = [... $ScreensHistoryStore, SCREEN.DELIVER_UNKNOWN];
        console.log($ScreensHistoryStore);
    };


    $: {
        console.warn($StaffResultStore);
    }
</script>

<!-- <h1 class="center-align">Home</h1> -->
<div class="absolute center middle">
    <button class="extend circle large-elevate inverse-primary  left-round    top-round" on:click={OnClick_GoToDeliverPick_UpButton}>
        <i class="fa-solid fa-cube"></i>
        <span>Deliver Pick Up</span>
    </button>
    <hr class="medium">
    <button class="extend circle large-elevate         primary right-round    top-round" on:click={OnClick_GoToDeliverOnGoingButton}>
        <i>add</i>
        <span>Deliver OnGoing</span>
    </button>
    <hr class="medium">
    <button class="extend circle large-elevate inverse-primary right-round bottom-round" on:click={OnClick_GoToDeliverHistoryButton}>
        <i>add</i>
        <span>Deliver History</span>
    </button>
    <hr class="medium">
    <button class="extend circle large-elevate         primary  left-round bottom-round" on:click={OnClick_GoToDeliverUnknownButton}>
        <i>add</i>
        <span>Deliver Unknown</span>
    </button>
</div>
