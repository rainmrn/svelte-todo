<script lang="ts">
	let { children } = $props();
</script>

<div class="py-6 border-t hover:cursor-pointer text-zinc-700 border-zinc-300 flex flex-col gap-1.5">
	{@render children()}
</div>
