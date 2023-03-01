<script lang="ts">
    import { languages } from '../../../../laguages';
    import TextArea from '../../../../components/TextArea.svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';

    export let data: PageData;
    
    export let word = '', language = 'en', numberOfTranslations = 1;
    export let translationLanguages = Array(10).fill('None');
    export let translations = Array(10).fill('');
    export let notes = '';

    export async function translate(word: string, from: string, to: string): Promise<string> {
        if (word === '' || from === '' || to === '' || to === 'None') {
            return '';
        } else {
            return await (await fetch('/translate', {
                method: 'POST',
                body: JSON.stringify({ word: word, from: from, to: to }),
                headers: {
                    'content-type': 'application/json'
                }
            })).json();
        }
    }

    export async function makeNotes(language: string, word: string): Promise<string> {
        if (language === '' || word === '') {
            return '';
        } else {
            return await (await fetch('/make-notes', {
                method: 'POST',
                body: JSON.stringify({ language: language, word: word }),
                headers: {
                    'content-type': 'application/json'
                }
            })).json();
        }
    }

    export function createNew() {
        let collectedTranslations = Array(10);
        for (let i = 0; i < 10; i ++) {
            collectedTranslations[i] = { language: translationLanguages[i], translation: translations[i] };
        }
        fetch('/create-word', {
            method: 'POST',
            body: JSON.stringify({ setId: data.set._id, word: word, language: language, translations: collectedTranslations, notes: notes }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => goto(`/sets/${data.set._id}`));
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

    .add-form span.title {
        font-family: "e-Ukraine", sans-serif;
        color: #006885;
        font-weight: 500;
        font-size: 28px;
        text-decoration: none;
        display: block;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .add-form span {
        font-family: "e-Ukraine", sans-serif;
        color: #006885;
        font-size: 20px;
        font-weight: 500;
        text-decoration: underline;
        display: block;
        text-align: center;
        margin-top: 10px;
    }

    .add-form input {
        font-family: "e-Ukraine", sans-serif;
        outline: 0;
        background: #F7EFE5;
        width: calc(100% - 36% - 5px);
        border: 0;
        margin: auto;
        margin-top: 10px;
        padding: 10px;
        color: #006885;
        font-weight: 500;
        box-sizing: border-box;
        font-size: 18px;
        border-radius: 0.5em;
        height: 45px;
    }

    .add-form select {
        font-family: "e-Ukraine", sans-serif;
        outline: 0;
        background: #F7EFE5;
        width: 36%;
        border: 0;
        margin: auto;
        margin-top: 10px;
        padding: 10px;
        color: #006885;
        font-weight: 500;
        box-sizing: border-box;
        font-size: 18px;
        border-radius: 0.5em;
        height: 45px;
    }

    .add-form input:focus {
        --tw-ring-color: #006885;
    }

    .add-form select:focus {
        --tw-ring-color: #006885;
    }

    .add-form button {
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

    .add-form button:hover {
        opacity: 0.85;
    }

    .add-form input::placeholder {
        color: #006885;
        font-weight: 200;
    }

    .add-form select::placeholder {
        color: #006885;
        font-weight: 200;
    }

</style>

<svelte:head>
    <title>Add word</title>
</svelte:head>

<main>
    <form method="POST" class="add-form" id="addForm" on:submit={(event) => { event.preventDefault(); }}>
        <span class="title">Add word:</span>
        <span>Original:</span>
        <div>
            <select bind:value={language} on:change={async () => {
                translationLanguages = Array(10).fill('None');
                translations = Array(10).fill('');
                notes = '';
            }} name="language">
                {#each Object.entries(languages['isoToName']) as [iso, name]}
                    {#if name === 'English'}
                        <option value={iso} selected>{name}</option>
                    {:else}
                        <option value={iso}>{name}</option>
                    {/if}
                {/each}
            </select>
            <input bind:value={word} on:input={async () => {
                translationLanguages = Array(10).fill('None');
                translations = Array(10).fill('');
                notes = '';
            }} name="name" placeholder="word" required>
        </div>
        <span>Translations:</span>
        <input type="number" style="width: 100%; text-align: center;" min=0 max=10 bind:value={numberOfTranslations} name="numberOfTranslations" placeholder="Number of translations">
        {#each Array(numberOfTranslations) as _, index}
            <div>    
                <select bind:value={translationLanguages[index]} on:change={async () => {
                    translations[index] = '...';
                    translations[index] = await translate(word, language, translationLanguages[index]);
                }} name="translate_language{index}">
                    <option value="None" selected>None</option>
                    {#each Object.entries(languages['isoToName']) as [iso, name]}
                        <option value={iso}>{name}</option>
                    {/each}
                </select>
                <input bind:value={translations[index]} name="translation{index}" placeholder="translation">
            </div>
        {/each}
        <span>Notes:</span>
        <TextArea bind:value={notes} minRows={4} maxRows={40}></TextArea>
        <button on:click={async () => {
            notes = '...';
            notes = (await makeNotes(languages['isoToName'][language], word)).trim();
        }}>Make notes with AI</button>
        <button on:click={createNew}>Add to the list</button>
    </form>
</main>