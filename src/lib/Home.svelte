<script lang="ts">
    import { onMount } from "svelte"           ;
    import { blur    } from "svelte/transition";
    import axios from "axios";
    import {
            AuthResultStore,
        GeneralDisplayStore,
        SCREEN             ,
        ScreensHistoryStore,
           StaffResultStore,
        DisplaySuccSnackbar,
        DisplayFailSnackbar,
        DisplayInfoSnackbar,
               MyBlurParams,
        CurrentDeliveryStore,
        CurrentOrder___Store,
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


    const a = async() => {
        $CurrentOrder___Store.senderInfo.address = "Trường tiểu học Nguyễn Thượng Hiền, Hẻm 108/5 Đường Nguyễn Thượng Hiền, Quận Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
    }
    
    import
    OneSignal from
   "onesignal-cordova-plugin";
    //------------------------------------------------------------------------------------@@
    OneSignal.Debug.setLogLevel(6);
    OneSignal.initialize("9aea25d1-efcd-4578-9fad-ffeb401ae64e");
                let externalId = $AuthResultStore.data.id       ;
    OneSignal.login(externalId)   ;
    OneSignal.Notifications.addEventListener("click", async (e) => {
                let                                          clickedData  =  e.notification;
        console.log("Notification ########## @clicked: "  +  clickedData);
    });
    OneSignal.Notifications
    .requestPermission(true)
    .then((success: Boolean) => {
        console.log("Notification permission @granted: "  +  success    );
    });
    //------------------------------------------------------------------------------------@@
</script>

<!-- <h1 class="center-align">Home</h1> -->
<div class="absolute center middle center-align">
    <button class="extend circle large-elevate primary-container  left-round    top-round" on:click={OnClick_GoToDeliverPick_UpButton}>
        <i class="fa-solid fa-angles-down"></i>
        <span>Deliver Pick Up</span>
    </button>
    <hr class="medium surface-dim">
    <button class="extend circle large-elevate inverse-surface   right-round    top-round" on:click={OnClick_GoToDeliverOnGoingButton}>
        <i class="fa-solid fa-angles-up  "></i>
        <span>Deliver OnGoing</span>
    </button>
    <hr class="medium surface-dim">
    <button class="extend circle large-elevate primary-container right-round bottom-round" on:click={OnClick_GoToDeliverHistoryButton}>
        <i class="fa-solid fa-clock-rotate-left"></i>
        <span>Deliver History</span>
    </button>
    <hr class="medium surface-dim">
    <button class="extend circle large-elevate inverse-surface    left-round bottom-round" on:click={OnClick_GoToDeliverUnknownButton}>
        <i class="fa-solid fa-question"></i>
        <span>Deliver Unknown</span>
    </button>
    <button on:click={a}>click</button>
</div>
