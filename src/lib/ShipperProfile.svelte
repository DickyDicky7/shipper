<script lang="ts">
    import mary from
"../assets/mary.png";

    const OnClick_CloseButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-profile");
    };
</script>

<dialog  class="max" id="shipper-profile">
    <div class="medium-space"></div>
    <h5  class="center-align">Shipper Profile</h5>
    <div class="medium-space"></div>
    <img class="circle extra
                center
                    large-elevate                         "
     src={mary}
     alt="    "                    >
    <div class="medium-space"></div>
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

<style>img { width: 100px; height: 100px; filter: saturate(150%); }</style>

