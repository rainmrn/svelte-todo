<script lang="ts">
	import type { PageProps } from './$types';
	import LoginForm from '$lib/components/LoginForm.svelte';
	let { form }: PageProps = $props();
</script>

<LoginForm signUp emailFieldValue={form?.email ?? ''}>
	{#snippet errorMsg()}
		{#if form?.missing}
			Email is missing.
		{:else if form?.duplicate}
			This email is already used.
		{:else if form?.passwordTooShort}
			Password must be at least 8 characters.
		{:else if form?.genericError}
			An error occurred while signing up.
		{/if}
	{/snippet}
</LoginForm>
