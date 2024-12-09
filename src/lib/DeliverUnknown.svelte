<script lang="ts">
    import { GeneralDisplayStore,
             ScreensHistoryStore,
             SCREEN             ,
             isScrolledToBottom ,
             DeliverUnknownStore,
           } from "../global";

    $GeneralDisplayStore.title    =     "Deliver Unknown"    ;
//  $ScreensHistoryStore.push(    SCREEN.DELIVER_UNKNOWN    );

    const SelectDeliverUnknown    = async (): Promise<void> => {

    };

</script>

<!-- <div>Deliver Unknown</div> -->
<div class="        max     col    scroll">
  {#each $DeliverUnknownStore as deliver (deliver._id)}
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
