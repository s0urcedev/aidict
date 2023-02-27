<script lang="ts">
    import { goto } from '$app/navigation';
    import { languages } from '../../../laguages';
    import type { PageData } from './$types';

    export let data: PageData;

    export function deleteWord() {
        fetch('/delete-word', {
            method: 'POST',
            body: JSON.stringify({ setId: JSON.parse(data.word).setId, wordId: JSON.parse(data.word)._id, wordName: JSON.parse(data.word).word, wordLanguage: JSON.parse(data.word).language }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => goto(`/sets/${JSON.parse(data.word).setId}`));
    }
</script>

<style>
    main {
        position: relative;
        display: block;
        margin: auto;
        margin-top: 20px;
        background-color: #FAF5EE;
        padding: 10px;
        width: 350px;
        border-radius: 0.5em;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

    pre {
        font-family: "e-Ukraine", sans-serif;
        color: #006885;
        font-size: 24px;
        display: block;
        margin-top: 5px;
        margin-bottom: 5px;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
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
        width: auto;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 0;
        padding: 15px;
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
    <title>{JSON.parse(data.word ?? '').word}</title>
</svelte:head>

<main>
    <pre><u>{languages['isoToName'][JSON.parse(data.word).language]}:</u> {JSON.parse(data.word).word}</pre>
    {#each JSON.parse(data.word ?? '').translations as translation}
        {#if translation.language !== 'None'}
            <pre><u>{languages['isoToName'][translation.language]}:</u> {translation.translation}</pre>
        {/if}
    {/each}
    <pre><u>Notes:</u><br>{JSON.parse(data.word).explanation}</pre>
    <button on:click={deleteWord}>Delete word</button>
</main>