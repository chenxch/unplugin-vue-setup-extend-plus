import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/*.ts',
    'src/client/index.ts',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  onSuccess: 'npm run build:fix',
}
