<script lang="ts">
    const OnClick_CloseButton = async (
//      e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-calling");
    };
</script>

<div class="overlay blur center-align middle-align" id="shipper-calling" on:click={OnClick_CloseButton}>
    <div class="vertical">
        <div class="vertical">
            <a class="circle extra large-elevate error center center-align">
                <i class="fa-solid fa-phone"></i>
            </a>
            <div class="space"></div>
            <h6 class="center inverse-surface small-padding round">Call Sender@@</h6>
        </div>
        <div class="large-space"></div>
        <div class="large-space"></div>
        <div class="large-space"></div>
        <div class="vertical">
            <a class="circle extra large-elevate tertiary center center-align">
                <i class="fa-solid fa-phone-flip"></i>
            </a>
            <div class="space"></div>
            <h6 class="center inverse-surface small-padding round">Call Receiver</h6>
        </div>
    </div>
</div>

