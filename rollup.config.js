import {
  builtinModules,
} from 'module';
import prettier from 'rollup-plugin-prettier';
import {
  terser,
} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      plugins: [
        terser(),
        prettier({
          parser: 'babel',
        }),
      ],
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  watch: {
    include: 'src/**',
  },
  external: [
    ...builtinModules,
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          target: 'ESNEXT',
        },
      },
    }),
  ],
};
