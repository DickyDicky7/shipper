<script lang="ts">
    const OnClick_CloseButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#deliver-detail");
    };

    let tabNumber: number = 1;
</script>

<dialog  class="max" id="deliver-detail">
    <div class="padding absolute center     top              "                               >
        <div>
            <div class="                  small-space        "></div>
            <nav class="         tabbed   small large-elevate">
                <!-- svelte-ignore a11y_missing_attribute -->
                <a class={`${tabNumber === 1 ? "active" : ""}`} on:click={async () => { tabNumber = 1; }}>
                    <i>info</i>
                    <span>Info Delivery</span>
                </a>
                <!-- svelte-ignore a11y_missing_attribute -->
                <a class={`${tabNumber === 2 ? "active" : ""}`} on:click={async () => { tabNumber = 2; }}>
                    <i>info</i>
                    <span>Info Order@@@</span>
                </a>
            </nav>
            <div class={`page padding left ${tabNumber === 1 ? "active" : ""}`}>
                <div class="medium-space"></div>
                <h5  class="center-align">Info Delivery</h5>
                <div class="medium-space"></div>
            </div>
            <div class={`page padding left ${tabNumber === 2 ? "active" : ""}`}>
                <div class="medium-space"></div>
                <h5  class="center-align">Info Order@@@</h5>
                <div class="medium-space"></div>
                <article class="large-elevate">
                    <details>
                        <summary class="none inverse-primary-text">
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave">Header Item</a>
                        </summary>
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <a class="row wave primary-text">Item</a>
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <a class="row wave primary-text">Item</a>
                        <details>
                            <summary class="none inverse-primary-text">
                                <!-- svelte-ignore a11y_missing_attribute -->
                                <a class="row wave">Sender Info</a>
                            </summary>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Sender name### ######</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Sender address ######</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Sender #phone# number</a>
                        </details>
                        <details>
                            <summary class="none inverse-primary-text">
                                <!-- svelte-ignore a11y_missing_attribute -->
                                <a class="row wave">Receiver Info</a>
                            </summary>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Receiver name### ######</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Receiver address ######</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Receiver #phone# number</a>
                        </details>
                        <details>
                            <summary class="none inverse-primary-text">
                                <!-- svelte-ignore a11y_missing_attribute -->
                                <a class="row wave">Delivery Info</a>
                            </summary>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Shipment type</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Delivery type</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Status</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Package size</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Pick up date</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Pick up time</a>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave primary-text">Value</a>
                        </details>
                    </details>
                </article>
            </div>
        </div>
    </div>
    <div class="padding absolute center  bottom              "                               >
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle primary-container large-elevate" on:click={OnClick_CloseButton}>
            <i  class="fa-solid fa-xmark"></i>
        </button>
    </div>
</dialog>



