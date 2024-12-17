<script lang="ts">
    const OnClick_CloseButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-profile");
    };
</script>

<dialog  class="max" id="shipper-profile">
    <div class="padding absolute center  bottom              "                               >
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="          circle   error large-elevate" on:click={OnClick_CloseButton}>
            <i  class="fa-solid fa-xmark"></i>
        </button>
    </div>
</dialog>



