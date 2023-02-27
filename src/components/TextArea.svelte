<script>
    export let value = '';
    export let minRows = 1;
    export let maxRows;
    
    $: minHeight = `${minRows * 1.2}em`;
    $: maxHeight = maxRows ? `${maxRows * 1.2}em` : 'auto';
</script>

<div class="container">
    <pre
        aria-hidden="true"
        style="min-height: {minHeight}; max-height: {maxHeight}"
    >{value + '\n'}</pre>

    <textarea bind:value></textarea>	
</div>

<style>
    .container {
        margin-top: 10px;
        position: relative;
    }
    
    pre, textarea {
        font-family: "e-Ukraine", sans-serif;
        outline: 0;
        background: #F7EFE5;
        width: 100%;
        border: 0;
        margin: auto;
        padding: 10px;
        color: #006885;
        font-weight: 500;
        box-sizing: border-box;
        font-size: 18px;
        border-radius: 0.5em;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
		line-height: 1.2;
		overflow: hidden;
        text-align: center;
    }

    textarea {
        position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
    }

    textarea:focus {
        --tw-ring-color: #006885;
    }
</style>