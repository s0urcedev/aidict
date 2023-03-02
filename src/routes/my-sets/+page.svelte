<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    export function createNew() {
        fetch('/create-set', {
            method: 'POST',
            body: JSON.stringify({ setName: prompt('New set name:') }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json()).then(data => window.location.href = `/sets/${data}`);
    }
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

    span.title {
        font-family: "e-Ukraine", sans-serif;
        color: #006885;
        font-weight: 500;
        font-size: 28px;
        text-decoration: none;
        display: block;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: #FAF5EE;
        padding: 10px;
        border-radius: 0;
    }

    span {
        font-family: "e-Ukraine", sans-serif;
        color: #006885;
        font-size: 24px;
        font-weight: 500;
        display: block;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: #F7EFE5;
        padding: 10px;
        border-radius: 0.5em;
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
    <title>My sets</title>
</svelte:head>

<main>
    <span class="title">My sets</span>
    <hr style="height:2px; border-width:0; color:#006885; background-color:#006885">
    {#each data.sets as set}
        <a data-sveltekit-reload href="/sets/{set.id}"><span>{set.name}</span></a>
    {/each}
    <button on:click={createNew}>Create new</button>
</main>