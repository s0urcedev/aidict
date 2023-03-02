<script lang="ts">
    import '../app.postcss';
    import { ToolbarButton, Dropdown, ChevronDown } from 'flowbite-svelte';
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import Frame from '../components/Frame.svelte';
    import Menu from '../components/Menu.svelte';
    import Navbar from '../components/Navbar.svelte';
    import type { LayoutData } from './$types';
    import { onMount } from 'svelte';

    export let data: LayoutData;

    function autocomplete(inp: HTMLElement, arr: Array<{id: string, text: string}>): void {
        let currentFocus: number;
        function addActive(x: HTMLCollection): boolean {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add('autocomplete-active');
            return true;
        }
        function removeActive(x: HTMLCollection): void {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove('autocomplete-active');
            }
        }
        function closeAllLists(elmnt: HTMLElement | null = null): void {
            const x = document.getElementsByClassName('autocomplete-items');
            for (let i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode?.removeChild(x[i]);
                }
            }
        }
        inp.addEventListener('input', function(): boolean {
            const val = (this as HTMLInputElement).value;
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            const a = document.createElement('DIV');
            a.setAttribute('id', this.id + 'autocomplete-list');
            a.setAttribute('class', 'autocomplete-items');
            this.parentNode?.appendChild(a);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].text.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    const b = document.createElement('DIV');
                    b.innerHTML = '<strong>' + arr[i].text.substr(0, val.length) + '</strong>';
                    b.innerHTML += arr[i].text.substr(val.length);
                    b.innerHTML += '<input type=\'hidden\' value=\'' + arr[i].id + '\'>';
                    b.addEventListener('click', function() {
                        (inp as HTMLInputElement).value = '';
                        window.location.href = `/words/${this.getElementsByTagName('input')[0].value}`;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
            return true;
        });
        inp.addEventListener('keydown', function(e) {
            const x = document.getElementById(this.id + 'autocomplete-list')?.getElementsByTagName('div') as HTMLCollection;
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) (x[currentFocus] as HTMLButtonElement).click();
                }
            }
        });
        
        document.addEventListener('click', function (e) {
            closeAllLists(e.target as HTMLElement);
        });
    }

    onMount(() => {
        const x = document.getElementById('search-navbar');
        if (x !== null) { autocomplete(x, data.usersWords); }
    });
    
</script>

<style>
    :global(body) {
        zoom: 1;
        background-color: #006885;
    }

    main {
        position: relative;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
  
<Navbar let:hidden let:toggle>
    <ToolbarButton name="Open main menu" on:click={toggle} class="bg-second-dark focus:bg-second-dark focus:ring-first focus:ring-[2px] md:hidden">
        <Menu class="h-[34px] w-[34px] shrink-0" color="#006885" />
    </ToolbarButton>
    {#if hidden}
        <div class="w-full md:flex md:justify-start" {hidden}>
            <ul class="h-[45px] flex flex-col items-center p-3 mt-2 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium bg-second-dark rounded-lg">
                <li><a data-sveltekit-reload href="/" class="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0"><span class="font-e-ukraine text-first hover:opacity-50 text-[20px] font-bold">Home</span></a></li>
                <li><a data-sveltekit-reload href="/my-sets"class="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0"><span class="font-e-ukraine text-first hover:opacity-50 text-[20px] font-bold">My sets</span></a></li>
                <li><div id="nav-menu1" class="cursor-pointer flex items-center justify-between py-2 pr-4 pl-3 md:p-0 rounded md:border-0">
                    <span class="font-e-ukraine text-first hover:opacity-50 text-[20px] font-bold">Authorize</span>
                    <ChevronDown class="h-[34px] w-[34px] shrink-0" color="#006885" />
                <div></li>
                <Dropdown border rounded triggeredBy="#nav-menu1" class="w-[150px] z-20 bg-second focus:bg-second">
                    <li><a data-sveltekit-reload href="/login" class="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0"><span class="py-2 px-4 block font-e-ukraine text-first hover:opacity-50 text-[18px] font-bold">Authorize</span></a></li>
                    <div class="bg-first my-[1px] h-[2px] border-0" />
                    <li><a data-sveltekit-reload href="/sign-out" class="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0"><span class="py-2 px-4 block font-e-ukraine text-first hover:opacity-50 text-[18px] font-bold">Sign Out</span></a></li>
                </Dropdown>
            </ul>
        </div>
    {/if}
    <div>
        <div class="relative block">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="#006885" class="h-[25px] w-[25px] dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </div>
            <input id="search-navbar" class="pl-10 h-[45px] w-[300px] bg-second-dark outline-none border-0 focus:border-first focus:border-[2px] font-bold font-e-ukraine text-first placeholder:text-first text-[20px] rounded-lg" placeholder="Search..." />
        </div>
    </div>
    <div class="w-full md:flex md:justify-end hidden">
        <div class="h-[45px] flex flex-col items-center p-3 mt-2 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium bg-second-dark rounded-lg">
            <span class="font-e-ukraine text-first text-[20px] font-bold">{data.user.name ?? ''} ({data.user.email ?? ''})</span>
        </div>
    </div>
    {#if !hidden}
        <div class="w-full md:block md:w-auto" transition:slide={{ delay: 100, duration: 500, easing: quintOut }}>
            <Frame tag="ul" border rounded color="none" class="flex flex-col p-4 mt-2 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium bg-second-dark border-0">
                <li><a data-sveltekit-reload href="/" class="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0"><span class="font-e-ukraine text-first hover:opacity-50 text-[20px] font-bold">Home</span></a></li>
                <li><a data-sveltekit-reload href="/my-sets"class="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0"><span class="font-e-ukraine text-first hover:opacity-50 text-[20px] font-bold">My sets</span></a></li>
                <li><div id="nav-menu1" class="cursor-pointer flex items-center justify-between py-2 pr-4 pl-3 md:p-0 rounded md:border-0">
                    <span class="font-e-ukraine text-first hover:opacity-50 text-[20px] font-bold">Authroize</span>
                    <ChevronDown class="h-[34px] w-[34px] shrink-0" color="#006885" />
                <div></li>
                <Dropdown border rounded triggeredBy="#nav-menu1" class="w-[150px] z-20 bg-second focus:bg-second">
                    <li><a data-sveltekit-reload href="/login" class="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0"><span class="py-2 px-4 block font-e-ukraine text-first hover:opacity-50 text-[18px] font-bold">Authorize</span></a></li>
                    <div class="bg-first my-[1px] h-[2px] border-0" />
                    <li><a data-sveltekit-reload href="/sign-out" class="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0"><span class="py-2 px-4 block font-e-ukraine text-first hover:opacity-50 text-[18px] font-bold">Sign Out</span></a></li>
                </Dropdown>
            </Frame>
        </div>
    {/if}
</Navbar>

<main>
    <slot />
</main>