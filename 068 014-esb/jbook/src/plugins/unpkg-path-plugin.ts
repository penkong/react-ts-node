import * as esbuild from 'esbuild-wasm'

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    // build is demonstration of bundling process.
    setup(build: esbuild.PluginBuild) {
      // filter : how we control when this func execute
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args)
        return { path: args.path, namespace: 'a' }
      })
      // we can have multiple of this onResolve func
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args)

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `
          }
        }
      })
    }
  }
}
