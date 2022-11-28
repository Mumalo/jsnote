import path from "path";
import { Command } from "commander";
import  { serve } from "@jjsnote/local-api";

interface LocalApiError {
	code: string;
}

const isProduction = process.env.NODE_ENV === 'production';

const isLocalApiError = (err: any): err is LocalApiError => {
	return typeof err.code === "string";
};

export const serveCommand = new Command()
		.command('serve [fileName]')
		.description('Open a file for editing')
		.option('-p, --port <number>', 'port to run server on', '4005')
		.action(async (fileName = 'notebook.js', options: {port: string}) => {
			try{
				const dir = path.join(process.cwd(), path.dirname(fileName));
				await serve(
						parseInt(options.port),
						path.basename(fileName),
						dir,
						!isProduction);
				console.log(
						`Opened ${fileName}. Navigate to http://localhost:${options.port} to edit file`
				)
			} catch (err) {
				if (isLocalApiError(err)) {
					if (err.code === "EADDRINUSE") {
						console.error("Port is in use. Try running on a different port.");
					}
				} else if (err instanceof Error) {
					console.log("Here's the problem", err.message);
				}
				process.exit(1);
			}
		});
