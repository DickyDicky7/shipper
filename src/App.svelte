<script lang="ts">
    import "beercss";
    import "material-dynamic-colors";
    import Auth from "./lib/Auth.svelte";
    import {    AuthResultStore,
            GeneralDisplayStore,
            ScreensHistoryStore,
            SCREEN             ,
            CurrentDeliveryStore,
            CurrentOrder___Store,
            DisplaySuccSnackbar,
            DisplayFailSnackbar,
            DisplayInfoSnackbar,
           }    from "./global";
    import Home from "./lib/Home.svelte";
    import { onMount }    from                      "svelte";
    import ShipperProfile from "./lib/ShipperProfile.svelte";
    import ShipperCalling from "./lib/ShipperCalling.svelte";
    import ShipperGoogleMap
from"./lib/ShipperGoogleMap.svelte";
    import DeliverPick_Up from
    "./lib/DeliverPick_Up.svelte";
    import DeliverOnGoing from
    "./lib/DeliverOnGoing.svelte";
    import DeliverHistory from
    "./lib/DeliverHistory.svelte";
    import DeliverUnknown from
    "./lib/DeliverUnknown.svelte";
    import Deliver_Detail from
    "./lib/Deliver_Detail.svelte";
    import { App } from "@capacitor/app";
    onMount(async () => {
//      await ui("theme", "#3F51B5");
        await ui("theme", "#CDDC39");
    });
    const OnClick_ShipperCallingButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-calling");
    };
    const OnClick_ShipperProfileButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-profile");
    };
    const OnClick_ShipperMessageButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-message");
    };
    const OnClick_PressedGo_BackButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore =
        $ScreensHistoryStore.slice(0, -1);
        console.log($ScreensHistoryStore);
    };
    const OnClick_ShipperGoogleMapButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-google-map");
    };

    window.onunhandledrejection = async (e: PromiseRejectionEvent) => {                            await DisplayFailSnackbar(e.reason, 10000); };
    window.onerror              = async (e: string    |     Event) => { if (!(e instanceof Event)) await DisplayFailSnackbar(e       , 10000); };

    let lastScreen: SCREEN;
    ScreensHistoryStore.subscribe((screens: SCREEN[]) => lastScreen = screens.at(-1) ?? SCREEN.HOME);

    App.addListener("backButton", async () => {
        if (document.getElementById("deliver-detail")?.className.includes("active")) {
            await ui("#deliver-detail");
        }
        if (document.getElementById("shipper-calling")?.className.includes("active")) {
            await ui("#shipper-calling");
        }
        if (document.getElementById("shipper-profile")?.className.includes("active")) {
            await ui("#shipper-profile");
        }
        if (document.getElementById("shipper-message")?.className.includes("active")) {
            await ui("#shipper-message");
        }
        if (document.getElementById("shipper-google-map")?.className.includes("active")) {
            await ui("#shipper-google-map");
        }
    });
</script>

<header class="primary-container fixed">
    {#if $AuthResultStore.data.token !== ""}
    <nav>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle transparent" on:click={OnClick_PressedGo_BackButton}>
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h5 class="max">{$GeneralDisplayStore.title}</h5>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle transparent">
            <i class="fa-solid fa-info"></i>
            <menu id="info-setting" class="large-elevate padding-small no-wrap vertical">
                <label class="switch">
                    <input type="checkbox">
                    <span></span>
                </label>
                <div class="space"></div>
                <label class="switch">
                    <input type="checkbox">
                    <span></span>
                </label>
            </menu>
        </button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle transparent">
            <i class="fa-solid fa-gear"></i>
            <menu id="gear-setting" class="large-elevate padding-small no-wrap vertical">
                <label class="switch">
                    <input type="checkbox">
                    <span></span>
                </label>
                <div class="space"></div>
                <label class="switch">
                    <input type="checkbox">
                    <span></span>
                </label>
            </menu>
        </button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle transparent">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
    </nav>
    {/if}
</header>
<main class="responsive">
    {#if $AuthResultStore.data.id !== ""}
        {#if lastScreen === SCREEN.HOME}
        <Home></Home>
        {:else if lastScreen === SCREEN.DELIVER_PICK_UP}
        <DeliverPick_Up></DeliverPick_Up>
        {:else if lastScreen === SCREEN.DELIVER_ONGOING}
        <DeliverOnGoing></DeliverOnGoing>
        {:else if lastScreen === SCREEN.DELIVER_HISTORY}
        <DeliverHistory></DeliverHistory>
        {:else if lastScreen === SCREEN.DELIVER_UNKNOWN}
        <DeliverUnknown></DeliverUnknown>
        {/if}
        <ShipperCalling></ShipperCalling>
        <ShipperProfile></ShipperProfile>
        <Deliver_Detail></Deliver_Detail>
        <ShipperGoogleMap></ShipperGoogleMap>
    {:else}
        <Auth></Auth>
    {/if}
    <div class="snackbar tertiary       " id="succ-snackbar">Some text here</div>
    <div class="snackbar error          " id="fail-snackbar">Some text here</div>
    <div class="snackbar inverse-surface" id="info-snackbar">Some text here</div>
</main>
<footer class="primary-container fixed">
    {#if $AuthResultStore.data.token !== ""}        
    <nav>
        <div class="max row center-align">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="square transparent" on:click={OnClick_ShipperCallingButton}>
                <i class="fa-solid fa-phone"></i>
            </button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="square transparent">
                <i class="fa-solid fa-truck"></i>
            </button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="square transparent" on:click={OnClick_ShipperProfileButton}>
                <i class="fa-solid fa-user"></i>
            </button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="square transparent" on:click={OnClick_ShipperGoogleMapButton}>
                <i class="fa-solid fa-map"></i>
            </button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="square transparent" on:click={OnClick_ShipperMessageButton}>
                <i class="fa-solid fa-message"></i>
            </button>
        </div>
    </nav>
    {/if}
</footer>

<style>
    @font-face {
     font-family:            'SF Mono Regular'                        ;
     font-weight: normal;
     font-style : normal;
     src: url('./assets/fonts/SF-Mono-Regular.otf') format('opentype');
    }

    * {
        font-family: 'SF Mono Regular', 'fontawesome';
    }
</style>





