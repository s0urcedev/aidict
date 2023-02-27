module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['svelte3', '@typescript-eslint'],
    ignorePatterns: [],
    overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
    settings: {
        'svelte3/typescript': () => require('typescript')
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
    },
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    rules: {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'brace-style': [
            'error',
            '1tbs', 
            { 'allowSingleLine': true }
        ],
        'curly': [
            'error',
            'multi-line'
        ],
        'func-call-spacing': [
            'error',
            'never'
        ],
        'block-spacing': [
            'error',
            'always'
        ],
        'key-spacing': [
            'error', 
            { 'beforeColon': false, 'afterColon': true }
        ],
        'keyword-spacing': [
            'error', 
            { 'before': true, 'after': true }
        ],
        'space-before-blocks': 'error',
        'no-duplicate-imports': 'error',
        'no-dupe-keys': 'error',
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'no-undef': 'error',
        '@typescript-eslint/no-var-requires': 0 
    }
};
