<script lang="ts">
    import { GeneralDisplayStore,
             ScreensHistoryStore,
             SCREEN             ,
             isScrolledToBottom ,
             DeliverPick_UpStore,
           } from "../global";

    $GeneralDisplayStore.title    =     "Deliver Pick Up"    ;
//  $ScreensHistoryStore.push(    SCREEN.DELIVER_PICK_UP    );

    const SelectDeliverPick_Up    = async (): Promise<void> => {

    };

</script>

<!-- <div>Deliver Pick Up</div> -->
<div class="        max     col    scroll">
  {#each $DeliverPick_UpStore as deliver (deliver._id)}
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
