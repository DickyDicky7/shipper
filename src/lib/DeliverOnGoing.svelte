<script lang="ts">
    import axios from "axios";    
    import { GeneralDisplayStore,
             ScreensHistoryStore,
             SCREEN             ,
             isScrolledToBottom ,
             DeliverOnGoingStore,
             CurrentDeliveryStore,
             CurrentOrder___Store,
             StaffResultStore,
             DisplaySuccSnackbar,
             DisplayFailSnackbar,
             DisplayInfoSnackbar,
             MyBlurParams,
           } from "../global";
    import { onMount } from "svelte";
    import { blur    } from "svelte/transition";

    $GeneralDisplayStore.title    =     "Deliver OnGoing"    ;
//  $ScreensHistoryStore.push(    SCREEN.DELIVER_ONGOING    );
    
    const SelectDeliverOnGoing    = async (): Promise<void> => {
        const result = await axios.get(
            `https://waseminarcnpm2.azurewebsites.net/protected/deliveries/staff?staffId=${$StaffResultStore.staff._id}`
        );
        if (result.status === 200
        ||  result.status === 201) {
            $DeliverOnGoingStore = result.data
                                         .list
            ;
            $DeliverOnGoingStore = $DeliverOnGoingStore.filter(deliver =>
                deliver.status === "inProgress"
            )
            ;
            await DisplaySuccSnackbar("Fetch success", 1000);
        } else {
            await DisplayFailSnackbar("Fetch failure", 1000);
        }
    };

    // window.ontouchmove = (e: TouchEvent) => {
    //     if (isScrolledToBottom()) console.log("bottom");
    // };
    
    // window.onwheel     = (e: WheelEvent) => {
    //     if (isScrolledToBottom()) console.log("bottom");
    // };    

    onMount(async() => {
            await SelectDeliverOnGoing();
    });
</script>

<!-- <div>Deliver OnGoing</div> -->
<div class="        max     col    scroll">
    {#each $DeliverOnGoingStore as deliver, deliverIndex (deliver._id)}
        <!-- svelte-ignore a11y_click_events_have_key_events --><!-- svelte-ignore a11y_no_static_element_interactions --><!-- svelte-ignore a11y_label_has_associated_control -->
        <div class="row padding surface-dim wave large-elevate"
          on:click={    async() => {
        $CurrentDeliveryStore = $DeliverOnGoingStore[deliverIndex]
                        await   ui                                 ("#deliver-detail")
        }}
        transition:blur={
        MyBlurParams(deliverIndex * 100) }>
            <button class="circle inverse-surface">{deliver._id}</button>
            <div    class="           max        ">
                <h6 class="small">Headline</h6 >
                <div>##### Supporting text</div>
            </div >
            <label>+15 min</label>
        </div>
    {/each}
</div>
