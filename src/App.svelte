<script lang="ts">
    import "beercss";
    import "material-dynamic-colors";
    import Auth from "./lib/Auth.svelte";
    import { AuthResultStore } from "./global";
    import Home from "./lib/Home.svelte";
</script>

<main class="responsive">
    {#if $AuthResultStore.data.id !== ""}
        <Home></Home>
    {:else}
        <Auth></Auth>
    {/if}
</main>

<style>
</style>
