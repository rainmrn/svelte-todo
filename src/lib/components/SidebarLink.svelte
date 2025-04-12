<script lang="ts">
	import { page } from '$app/state';
	import Icon from './Icon.svelte';
	let { icon, path, children } = $props();

	let active: boolean = $derived(page.url.pathname === path);
</script>

<a
	href={path}
	class={[
		'box flex items-center gap-2 px-4 py-1 border-y hover:cursor-pointer duration-50 ease-out',
		{ 'text-amber-600 border-amber-300 bg-amber-100': active },
		{ 'text-zinc-700 border-transparent hover:border-zinc-300 hover:bg-zinc-100': !active }
	]}
>
	<Icon path={icon} />
	{@render children()}
</a>
