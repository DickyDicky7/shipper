<script lang="ts">
    import { GeneralDisplayStore,
             ScreensHistoryStore,
             SCREEN             ,
             isScrolledToBottom ,
             DeliverHistoryStore,
           } from "../global";

    $GeneralDisplayStore.title    =     "Deliver History"    ;
//  $ScreensHistoryStore.push(    SCREEN.DELIVER_HISTORY    );

    const SelectDeliverHistory    = async (): Promise<void> => {

    };

</script>

<!-- <div>Deliver History</div> -->
<div class="        max     col    scroll">
  {#each $DeliverHistoryStore as deliver (deliver._id)}
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
