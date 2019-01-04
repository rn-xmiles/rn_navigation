module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:flowtype/recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },

    settings: {
        flowtype: {
            onlyFilesWithFlowAnnotation: true, //只在添加@flow注释的文件才做检查
        },
        react: {
            createClass: 'createReactClass', // Regex for Component Factory to use,
            // default to "createReactClass"
            pragma: 'React', // Pragma to use, default to "React"
            // version: '16.0', // React version, default to the latest React stable release
            flowVersion: '0.79', // Flow version
        },
        propWrapperFunctions: [
            // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
            'forbidExtraProps',
            { property: 'freeze', object: 'Object' },
            { property: 'myFavoriteWrapper' },
        ],
    },

    plugins: ['react', 'flowtype'],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'max-len': ['error', { code: 120, tabWidth: 4, comments: 150 }],
    },
}
