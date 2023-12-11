import { Request, Response } from 'express';
import * as pkg from '../../package.json';

abstract class ServerController {
	static async getStatus(req: Request, res: Response) {
		const { name, version, description, author } = pkg;

		const serverData = {
			name,
			version,
			description,
			author,
			server: 'running',
			database: 'connected',
		};

		return res.json(serverData);
	}
}

export default ServerController;