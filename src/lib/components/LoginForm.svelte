<script lang="ts">
	let inputStyle =
		'dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 w-full rounded px-4 py-2.5 focus-visible:outline-none focus-visible:border-amber-600  dark:focus-visible:border-amber-500/40';
	let { signUp = false, errorMsg, emailFieldValue } = $props();
</script>

<main
	class="h-dvh w-full flex flex-col justify-center items-center bg-amber-50 dark:bg-amber-800/10"
>
	<div
		class="bg-zinc-50 dark:bg-zinc-900 flex flex-col gap-3 items-center justify-evenly rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-md
    px-8 md:px-14 py-8 relative -top-3
    w-6/7 h-3/5 sm:w-5/7 md:w-4/7 lg:w-3/7 xl:w-2/6 2xl:w-2/7"
	>
		<h1 class="text-3xl font-bold dark:text-zinc-50">
			{#if signUp}
				Sign up
			{:else}
				Log in
			{/if}
		</h1>
		<form method="POST" class="w-full flex flex-col gap-3 items-center">
			<div class="self-start text-sm text-red-600 italic h-4">
				{@render errorMsg()}
			</div>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={emailFieldValue}
				class={inputStyle}
			/>
			<input type="password" name="password" placeholder="Password" class={inputStyle} />
			<button
				class="px-4 py-2.5 border bg-amber-50 border-amber-300 text-amber-600 font-semibold shadow-md shadow-amber-800/10 w-full rounded duration-50 ease-in-out cursor-pointer
                hover:text-zinc-50 hover:bg-amber-600 hover:border-amber-600
                dark:text-amber-100 dark:bg-amber-800 dark:border-amber-600
                dark:hover:bg-amber-700"
				type="submit">Submit</button
			>
			<p class="pt-1 text-zinc-600 dark:text-zinc-400 text-sm self-end">
				{#if signUp}
					Already registered?
				{:else}
					Don't have an account?
				{/if}
				<a
					href={signUp ? 'login' : 'signup'}
					class="ml-0.5 underline hover:text-amber-700 dark:hover:text-amber-400"
				>
					{#if signUp}
						Go to login
					{:else}
						Sign up
					{/if}
				</a>
			</p>
		</form>
	</div>
</main>
