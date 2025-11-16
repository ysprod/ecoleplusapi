import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
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
}
