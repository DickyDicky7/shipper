<script lang="ts">
    import { GeneralDisplayStore,
             ScreensHistoryStore,
             SCREEN             ,
             isScrolledToBottom ,
             DeliverOnGoingStore,
           } from "../global";

    $GeneralDisplayStore.title    =     "Deliver OnGoing"    ;
//  $ScreensHistoryStore.push(    SCREEN.DELIVER_ONGOING    );
    
    const SelectDeliverOnGoing    = async (): Promise<void> => {

    };

    // window.ontouchmove = (e: TouchEvent) => {
    //     if (isScrolledToBottom()) console.log("bottom");
    // };
    
    // window.onwheel     = (e: WheelEvent) => {
    //     if (isScrolledToBottom()) console.log("bottom");
    // };    
</script>

<!-- <div>Deliver OnGoing</div> -->
<div class="        max     col    scroll">
    {#each $DeliverOnGoingStore as deliver (deliver._id)}
        <div class="row padding surface-container wave large-elevate"
          on:click={    async() =>
                        await   ui                                 ("#deliver-detail")}
        >
            <button class="circle primary">{deliver._id}</button>
            <div    class="           max">
                <h6 class="small">Headline</h6 >
                <div>##### Supporting text</div>
            </div >
            <label>+15 min</label>
        </div>
    {/each}
</div>
