<script lang="ts">
    import { goto } from '$app/navigation';
    import { languages } from '../../../laguages';
    import type { PageData } from './$types';

    export let data: PageData;

    export function deleteSet() {
        fetch('/delete-set', {
            method: 'POST',
            body: JSON.stringify({ setId: data.set.id, setName: data.set.name, words: data.set.words }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => window.location.href = '/my-sets');
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
        width: 650px;
        border-radius: 0.5em;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

    @media (max-width: 400px) {
        main {
            width: 350px;
        }
    }

    span.title {
        font-family: "e-Ukraine", sans-serif;
        color: #006885;
        font-weight: 500;
        font-size: 28px;
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
        display: block;
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
    <title>{data.set.name}</title>
</svelte:head>

<main>
    <span class="title">{data.set.name}</span>
    <hr style="height:2px; border-width:0; color:#006885; background-color:#006885">
    {#each data.set.words as word}
        <a data-sveltekit-reload href="/words/{word.id}"><span>{word.word} (<u>{languages['isoToName'][word.language]}</u>)</span></a>
    {/each}
    <button on:click={() => goto(`/sets/${data.set.id}/add-word`)}>Add a word</button>
    <button on:click={deleteSet}>Delete the set</button>
</main>