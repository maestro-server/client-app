module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  'rules': {
    "linebreak-style": [
      2,
      "unix"
    ],
    "semi": 0,
    "semi-spacing": [2, {            // http://eslint.org/docs/rules/semi-spacing
      "before": false,
      "after": true
    }],
    "no-catch-shadow": 2, // disallow the catch clause parameter name being the same as a variable in the outer scope (off by default in the node environment)
    "no-delete-var": 2, // disallow deletion of variables
    "no-label-var": 2, // disallow labels that share a name with a variable
    "no-shadow": 2, // disallow declaration of variables already declared in the outer scope
    "no-shadow-restricted-names": 2, // disallow shadowing of names such as arguments
    "no-undef": 0, // disallow use of undeclared variables unless mentioned in a /*global */ block
    "no-undef-init": 2, // disallow use of undefined when initializing variables
    "no-unused-vars": ["error", {"vars": "local", "args": "after-used"}], // disallow declaration of variables that are not used in the code
    "no-use-before-define": 2, // disallow use of variables before they are defined
    "complexity": 0, // specify the maximum cyclomatic complexity allowed in a program (off by default)

    "no-var": 2, // require let or const instead of var (off by default)
    "no-multiple-empty-lines": 0,
    "no-nested-ternary": 2,          // http://eslint.org/docs/rules/no-nested-ternary
    "no-new-object": 2,              // http://eslint.org/docs/rules/no-new-object
    "no-spaced-func": 2,             // http://eslint.org/docs/rules/no-spaced-func
    "no-trailing-spaces": 2,         // http://eslint.org/docs/rules/no-trailing-spaces
    "no-extra-parens": [2, "functions"], // http://eslint.org/docs/rules/no-extra-parens
    "no-underscore-dangle": 0,       // http://eslint.org/docs/rules/no-underscore-dangle
    "one-var": [2, "never"],         // http://eslint.org/docs/rules/one-var
    "quotes": 0,
    "no-extend-native": 0,
    "padded-blocks": 0,
    "arrow-parens": 0,
    "generator-star-spacing": 0,
    "camelcase": 0,
    "no-console": 0,
    "vue/*": 0,
    "vue/no-parsing-error": 0,
    "vue/html-indent": 0,
    "vue/this-in-template": 0,
    "vue/valid-v-for": 0,
    "vue/valid-v-bind": 0,
    "vue/no-unused-components": 0,
    // allow debugger during development
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
