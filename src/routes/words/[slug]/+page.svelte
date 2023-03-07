<script lang="ts">
    import { languages } from '../../../laguages';
    import type { PageData } from './$types';

    export let data: PageData;

    export function deleteWord() {
        fetch('/delete-word', {
            method: 'POST',
            body: JSON.stringify({ setId: data.word?.setId, wordId: data.word?.id, wordName: data.word?.word, wordLanguage: data.word?.language }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => window.location.href = `/sets/${data.word?.setId}`);
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
    <title>{data.word?.word}</title>
</svelte:head>

<main>
    <pre><u>{languages['isoToName'][data.word?.language ?? '']}:</u> {data.word?.word}</pre>
    {#each data.word?.translations ?? [] as translation}
        {#if translation.language !== 'None'}
            <pre><u>{languages['isoToName'][translation.language]}:</u> {translation.translation}</pre>
        {/if}
    {/each}
    <pre><u>Notes:</u><br>{data.word?.notes}</pre>
    <button on:click={deleteWord}>Delete word</button>
</main>