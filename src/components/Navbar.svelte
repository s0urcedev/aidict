<script lang="ts">
    import Frame from './Frame.svelte';
    import classNames from 'classnames';
    export let navClass = 'px-2 py-2 w-full bg-second';
    export let navDivClass = 'mx-auto flex md:flex-nowrap flex-wrap justify-between md:justify-center items-center';
    export let fluid = true;
    let hidden = true;
    let toggle = () => {
        hidden = !hidden;
    };
</script>
  
<Frame tag="nav" class={classNames(navClass, $$props.class)}>
    <div class={classNames(navDivClass, fluid && 'container')}>
        <slot {hidden} {toggle} />
    </div>
</Frame>