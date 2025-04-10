<script lang="ts">
	import '../app.css';
	
	import Sidebar from '$lib/components/Sidebar.svelte';
	import SidebarButton from '$lib/components/SidebarButton.svelte';
	import SidebarSection from '$lib/components/SidebarSection.svelte';
	import SidebarLink from '$lib/components/SidebarLink.svelte';
	import { mdiAccount, mdiInbox, mdiPlusCircle, mdiWeatherSunny } from '@mdi/js';

	let { children } = $props();
</script>

<div class="h-screen grid grid-cols-[auto_1fr]">
	<Sidebar>
		<SidebarSection>
			<SidebarButton icon={mdiAccount}>
				User
			</SidebarButton>
		</SidebarSection>
		<SidebarSection>
			<SidebarLink icon={mdiPlusCircle} path="/add">
				Add task
			</SidebarLink>
			<SidebarLink icon={mdiInbox} path="/inbox">
				Inbox
			</SidebarLink>
			<SidebarLink icon={mdiWeatherSunny} path="/today">
				Today
			</SidebarLink>
		</SidebarSection>
	</Sidebar>
	<div class="h-full w-full overflow-auto bg-neutral-50">{@render children()}</div>
</div>
