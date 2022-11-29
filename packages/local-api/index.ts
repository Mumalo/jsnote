import express from 'express';
import path from 'path';
import {createProxyMiddleware} from "http-proxy-middleware";
import { createCellsRouter } from "./src/routes/cells";
// import * as l from "@jjsnote";

export const serve = (
		port: number,
		fileName: string,
		dir: string,
		useProxy: boolean
) => {
   const app = express();
	app.use(createCellsRouter(fileName, dir));

	if (useProxy) {
		 app.use(createProxyMiddleware({
			 target: 'http://localhost:3000',
			 ws: true,
			 logLevel: 'silent'
		 }));
	} else {
		// does not work well with symbolic links
		console.log('Production run....')
		const packagePath = require.resolve(
				'@jjsnote/local-client/build/index.html'
		);
		app.use(express.static(path.dirname(packagePath)));
	}


	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject)
	});
}
