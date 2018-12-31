module.exports = {
    // processors: ['stylelint-processor-html'],

    extends: [
        // 'stylelint-config-standard',
        'stylelint-config-react-native-css-modules',
    ],
    plugins: [/* 'stylelint-scss', */ 'stylelint-react-native'],
    rules: {
        'selector-class-pattern': '^[a-z][a-zA-Z0-9]*$',
        indentation: 4,
        'max-nesting-depth': 2, // 允许嵌套的深度为2
        // 'at-rule-no-unknown': [
        //     true,
        //     {
        //         ignoreAtRules: ['extends', 'include'],
        //     },
        // ],
    },
}
