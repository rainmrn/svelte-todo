<script lang="ts">
	import type { PageProps } from './$types';
	import LoginForm from '$lib/components/LoginForm.svelte';
	let { form }: PageProps = $props();
</script>

<LoginForm emailFieldValue={form?.email ?? ''}>
	{#snippet errorMsg()}
		{#if form?.missing}
			Email is missing.
		{:else if form?.emailNotExist}
			This email is not registered.
		{:else if form?.wrongCredentials}
			Wrong credentials.
		{:else if form?.genericError}
			An error occurred while logging in.
		{/if}
	{/snippet}
</LoginForm>
