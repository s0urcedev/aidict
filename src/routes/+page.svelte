<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    export let data: PageData;
    export let message: string | null = null;
    onMount(async () => {
        if (data.unauthorized && await (await fetch('get-user')).json() === null) goto('/login');
        const queryString: string = window.location.search;
        const urlParams: URLSearchParams = new URLSearchParams(queryString);
        message = urlParams.get('message');
        if (message !== null) {  
            alert(message);
        }
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

    button {
        font-family: "e-Ukraine", sans-serif;
        text-transform: uppercase;
        text-align: center;
        display: block;
        outline: 0;
        background: #006885;
        width: 100%;
        margin: auto;
        margin-top: 5px;
        margin-bottom: 5px;
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

    button:hover {
        opacity: 0.85;
    }
</style>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main>
    <a href="/my-sets"><button>My sets</button></a>
    <a href="/login"><button>Authorize</button></a>
</main>