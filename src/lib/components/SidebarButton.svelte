<script lang="ts">
	import Icon from './Icon.svelte';

	let { icon, children } = $props();
</script>

<button
	class="px-4 w-full flex items-center gap-2 py-1 border-y border-transparent hover:bg-neutral-100 hover:border-neutral-300 duration-50 ease-out cursor-pointer"
>
	<Icon path={icon} />
	{@render children()}
</button>
