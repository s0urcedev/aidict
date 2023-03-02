<script lang="ts">
    import { onMount } from 'svelte';

    export let message: string | null = null;
    onMount(async () => {
        const queryString: string = window.location.search;
        const urlParams: URLSearchParams = new URLSearchParams(queryString);
        message = urlParams.get('message');
        if (message !== null) {  
            alert(message);
        }
        window.location.href = '/my-sets';
    });
</script>