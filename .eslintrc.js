module.exports = {
	root: true,
	extends: [
		'plugin:vue/recommended',
	],
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	rules: {
		'quotes': ['error', 'single'],
		'quote-props': ['error', 'consistent-as-needed'],
		'indent': ['error', 'tab'],
		'vue/html-indent': ['error', 'tab'],
		'comma-dangle': ['error', 'always-multiline'],
	},
};
