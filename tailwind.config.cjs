const config = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
    ],

    theme: {
        extend: {},
        colors: {
            'first': '#006885',
            'second': '#FAF5EE',
            'second-dark': '#F7EFE5'
        },
        fontFamily: {
            'e-ukraine': ['e-Ukraine', 'sans-serif']
        }
    },

    plugins: [
        require('flowbite/plugin')
    ],
    darkMode: 'class',
};

module.exports = config;