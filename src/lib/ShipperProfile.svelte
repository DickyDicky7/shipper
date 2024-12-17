<script lang="ts">
    const OnClick_CloseButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-profile");
    };
</script>

<dialog  class="max" id="shipper-profile">
    <article class="large-elevate no-round inverse-surface">
        <details>
            <summary class="none inverse-primary-text">
                <!-- svelte-ignore a11y_missing_attribute -->
                <a class="row wave">Header Item</a>
            </summary>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">Deliver Date?!### ######</a>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">Deliver Times!### ######</a>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">Deliver Status### ######</a>
        </details>
    </article>

    <div class="padding absolute center  bottom              "                               >
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="          circle   error large-elevate" on:click={OnClick_CloseButton}>
            <i  class="fa-solid fa-xmark"></i>
        </button>
    </div>
</dialog>



