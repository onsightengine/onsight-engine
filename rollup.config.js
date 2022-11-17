

export default [

	{
		input: './Onsight.js',
		treeshake: true,

		output: {

			name: 'onsight',
			extend: true,
			format: 'umd',
			file: './build/onsight.umd.cjs',
			sourcemap: true,

		},

	},

	{
		input: './Onsight.js',
		treeshake: false,

		output: {

			format: 'esm',
			file: './build/onsight.module.js',
			sourcemap: true,

		},

	}

];