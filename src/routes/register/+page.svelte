<script lang="ts">
    import { onMount } from 'svelte';
    export let message: string | null = null;
    onMount(async () => {
        const queryString: string = window.location.search;
        const urlParams: URLSearchParams = new URLSearchParams(queryString);
        message = urlParams.get('message');
    });
</script>

<style>
    main {
        position: relative;
        display: block;
        margin: auto;
        margin-top: 20px;
        background-color: #FAF5EE;
        padding: 5px 10px 5px 10px;
        width: 350px;
        border-radius: 0.5em;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

    .register-form span.title {
        font-family: "e-Ukraine", sans-serif;
        color: #006885;
        font-weight: 500;
        font-size: 28px;
        display: block;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .register-form span {
        font-family: "e-Ukraine", sans-serif;
        color: #006885;
        font-size: 16px;
        display: block;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .register-form a {
        font-weight: 800;
        color: #006885;
        text-decoration: underline;
    }

    .register-form input {
        font-family: "e-Ukraine", sans-serif;
        outline: 0;
        background: #F7EFE5;
        width: 100%;
        border: 0;
        margin: auto;
        margin-top: 10px;
        padding: 10px;
        color: #006885;
        font-weight: 500;
        box-sizing: border-box;
        font-size: 18px;
        border-radius: 0.5em;
        text-align: center;
    }

    .register-form input:focus {
        --tw-ring-color: #006885;
    }

    .register-form button {
        font-family: "e-Ukraine", sans-serif;
        text-transform: uppercase;
        text-align: center;
        display: block;
        outline: 0;
        background: #006885;
        width: 100%;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        padding: 10px;
        color: #FAF5EE;
        font-weight: 400;
        font-size: 24px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
        border-radius: 0.5em;
    }

    .register-form button:hover {
        opacity: 0.85;
    }

    .register-form a:hover {
        opacity: 0.85;
    }

    .register-form input::placeholder {
        color: #006885;
        font-weight: 200;
    }

</style>

<svelte:head>
    <title>Register</title>
</svelte:head>

<main>
    <form method="POST" class="register-form">
        <span class="title">Register:</span>
        <input type="text" name="name" placeholder="name" required>
        <input type="email" name="email" placeholder="email" required>
        <input type="password" name="password" placeholder="password" required>
        <input type="password" name="confirmPassword" placeholder="confirm password" required>
        {#if message !== null}
            <span style="color: red; margin-top: 10px; margin-bottom: -5px;">{message}</span>
        {/if}
        <button type="submit">register</button>
        <span style="margin-top: -5px;">Already have an account? <a data-sveltekit-reload href="/login">Login</a></span>
    </form>
</main>