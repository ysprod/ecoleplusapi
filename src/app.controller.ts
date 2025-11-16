import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@ApiTags('Root')
@Controller()
export class AppController {
	constructor(@InjectConnection() private readonly connection: Connection) {}

	@Get('health')
	@ApiOperation({ summary: 'Health check' })
	@ApiResponse({ status: 200, description: 'Application is healthy' })
	getHealth() {
		return {
			status: 'ok',
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
		};
	}

	@Get('health/db')
	@ApiOperation({ summary: 'Health check - Database' })
	@ApiResponse({ status: 200, description: 'Database health status' })
	async getDbHealth() {
		try {
			const readyState = this.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
			const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
			let pingOk: boolean | undefined = undefined;
			try {
				// ping may throw if no db yet
				const admin = this.connection.db?.admin?.();
				if (admin) {
					const ping = await admin.ping();
					pingOk = ping?.ok === 1;
				}
			} catch {
				pingOk = false;
			}
			return {
				ok: readyState === 1 && pingOk !== false,
				readyState,
				state: states[readyState] || 'unknown',
				ping: pingOk,
				dbName: this.connection.name,
				host: (this.connection as any).host,
				timestamp: new Date().toISOString(),
			};
		} catch (error: any) {
			return {
				ok: false,
				error: error?.message || String(error),
				timestamp: new Date().toISOString(),
			};
		}
	}
}
