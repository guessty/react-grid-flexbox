import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		external: [
			'react', 
			'prop-types'
		],
		output: [
			{
				name: 'reactGridFlexbox',
				file: pkg.browser,
				format: 'umd',
				globals: {
					'react': 'React',
					'prop-types': 'PropTypes'
				},
			},
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			scss({
				output: pkg.css,
			}),
			resolve({
				extensions: ['.js', '.jsx']
			}), // so Rollup can find `js, jsx`
			commonjs(), // so Rollup can convert `ms` to an ES module
			babel({
				exclude: 'node_modules/**' // only transpile our source code
			})
		]
	}
];
