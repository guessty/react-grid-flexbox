import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default [
	{
		input: 'src/main.ts',
		external: [
			'react', 
			'prop-types',
			'styled-components'
		],
		output: [
			{
				name: 'reactGridFlexbox',
				file: pkg.browser,
				format: 'umd',
				globals: {
					'react': 'React',
					'prop-types': 'PropTypes',
					'styled-components': 'styled'
				},
			},
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			resolve({
				extensions: ['.js', '.jsx']
			}), // so Rollup can find `js, jsx`
			typescript({
				typescript: require('typescript'),
			}),
			commonjs(), // so Rollup can convert `ms` to an ES module
			babel({
				exclude: 'node_modules/**', // only transpile our source code
				plugins: ['external-helpers']
			})
		]
	}
];
