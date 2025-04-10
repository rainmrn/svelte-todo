<script lang="ts">
    import { page } from "$app/state";
    import Icon from "./Icon.svelte";
	let { icon, path, children } = $props();

    let active: boolean = $derived(page.url.pathname === path);
</script>

<a href={path}
	class={['box flex items-center gap-2 px-4 py-1 border-y hover:cursor-pointer duration-50 ease-out',
    {'text-red-600 border-red-300 bg-red-100' : active},
    {'text-neutral-700 border-transparent hover:border-neutral-300 hover:bg-neutral-100' : !active}]}
>
    <Icon path={icon} />
    {@render children()}
</a>
