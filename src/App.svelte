<script lang="ts">
    import "beercss";
    import "material-dynamic-colors";
    import Auth from "./lib/Auth.svelte";
    import {    AuthResultStore,
            GeneralDisplayStore,
            ScreensHistoryStore,
            SCREEN             ,
           }    from "./global";
    import Home from "./lib/Home.svelte";
    import { onMount }    from                      "svelte";
    import ShipperProfile from "./lib/ShipperProfile.svelte";
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
    import DeliverPickUp from "./lib/DeliverPick_Up.svelte";
    onMount(async () => {
        await ui("theme", "#FF5722");
    });
    const OnClick_ShipperProfileButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-profile");
    };
    const OnClick_PressedGo_BackButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        $ScreensHistoryStore =
        $ScreensHistoryStore.slice(0, -1);
        console.log($ScreensHistoryStore);
    };

    let lastScreen: SCREEN;
    ScreensHistoryStore.subscribe((screens: SCREEN[]) => lastScreen = screens.at(-1) ?? SCREEN.HOME);
</script>

<header class="primary-container fixed">
    <nav>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle transparent" on:click={OnClick_PressedGo_BackButton}>
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h5 class="max">{$GeneralDisplayStore.title}</h5>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle transparent">
            <i class="fa-solid fa-info"></i>
        </button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle transparent">
            <i class="fa-solid fa-gear"></i>
        </button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle transparent">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
    </nav>
</header>
<main class="responsive">
    {#if $AuthResultStore.data.id !== ""}
        {#if lastScreen === SCREEN.HOME}
        <Home></Home>
        {:else if lastScreen === SCREEN.DELIVER_PICK_UP}
        <DeliverPickUp></DeliverPickUp>
        {:else if lastScreen === SCREEN.DELIVER_ONGOING}
        <DeliverOnGoing></DeliverOnGoing>
        {:else if lastScreen === SCREEN.DELIVER_HISTORY}
        <DeliverHistory></DeliverHistory>
        {:else if lastScreen === SCREEN.DELIVER_UNKNOWN}
        <DeliverUnknown></DeliverUnknown>
        {/if}
        <ShipperProfile></ShipperProfile>
        <Deliver_Detail></Deliver_Detail>
    {:else}
        <Auth></Auth>
    {/if}
    <div class="snackbar tertiary" id="succ-snackbar">Some text here</div>
    <div class="snackbar error   " id="fail-snackbar">Some text here</div>
    <div class="snackbar         " id="info-snackbar">Some text here</div>
</main>
<footer class="primary-container fixed">
    <nav>
        <div class="max row center-align">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="square transparent">
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
            <button class="square transparent">
                <i class="fa-solid fa-map"></i>
            </button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="square transparent">
                <i class="fa-solid fa-message"></i>
            </button>
        </div>
    </nav>
</footer>

<style>
    * {
        font-family: 'SF Mono Regular', 'fontawesome';
    }
</style>

