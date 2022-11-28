import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: esbuild.Service;

export default async (code: string): Promise<{code: string, err: string}> => {
    // initialize es-build
    // bundle and return result

    if (!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }

    try {
        const result = await service.build({
            entryPoints: ['index.ts'],
            bundle: true,
            write: false,
            // plugins are ran from left to right
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(code)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            },
            jsxFactory: '_React.createElement',
            jsxFragment: '_React.Fragment'
        })
        return {
            code: result.outputFiles[0].text,
            err: ""
        };
    } catch (err) {
        if (err instanceof Error) {
            return {
                err: err.message,
                code: ""
            }
        }

        return {
            err: err as string,
            code: ""
        }
    }
}

