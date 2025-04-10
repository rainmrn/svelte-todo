<script lang="ts">
    let { children } = $props();
</script>

<nav class="box-border h-full min-w-[260px] border-r border-r-neutral-300 bg-white">
    {@render children?.()}
</nav>
