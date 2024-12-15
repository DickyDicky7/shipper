<script lang="ts">
    import axios from "axios";
    import { GeneralDisplayStore,
             ScreensHistoryStore,
             SCREEN             ,
             isScrolledToBottom ,
             DeliverUnknownStore,
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

    $GeneralDisplayStore.title    =     "Deliver Unknown"    ;
//  $ScreensHistoryStore.push(    SCREEN.DELIVER_UNKNOWN    );

    const SelectDeliverUnknown    = async (): Promise<void> => {
        const result = await axios.get(
            `https://waseminarcnpm2.azurewebsites.net/protected/deliveries/staff?staffId=${$StaffResultStore.staff._id}`
        );
        if (result.status === 200
        ||  result.status === 201) {
            $DeliverUnknownStore = result.data
                                         .list
            ;
            $DeliverUnknownStore = $DeliverUnknownStore.filter(deliver =>
                deliver.status === "skibidi"
            ||  deliver.status ===         "rizzler"
            ||  deliver.status ===                 "bruh"
            )
            ;
            await DisplaySuccSnackbar("Fetch success", 1000);
        } else {
            await DisplayFailSnackbar("Fetch failure", 1000);
        }
    };

    // onMount(async() => {
    //         await SelectDeliverUnknown();
    // });
</script>

<!-- <div>Deliver Unknown</div> -->
<div class="        max     col  scroll">
  {#each $DeliverUnknownStore as deliver, deliverIndex (deliver._id)}
        <!-- svelte-ignore a11y_click_events_have_key_events --><!-- svelte-ignore a11y_no_static_element_interactions --><!-- svelte-ignore a11y_label_has_associated_control -->
        <div class="row padding surface-container wave large-elevate"
          on:click={    async() => {
        $CurrentDeliveryStore = $DeliverUnknownStore[deliverIndex]
                        await   ui                                 ("#deliver-detail")
        }}
        transition:blur={
        MyBlurParams(deliverIndex * 100) }>
            <button class="circle primary">{deliver._id}</button>
            <div    class="           max">
                <h6 class="small">Headline</h6 >
                <div>##### Supporting text</div>
            </div >
            <label>+15 min</label>
        </div>
  {/each}
</div>
