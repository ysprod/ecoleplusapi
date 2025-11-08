import { SupportService } from './support.service';
import { SupportDataDto } from './dtos/support-data.dto';
export declare class SupportController {
    private readonly supportService;
    constructor(supportService: SupportService);
    postSupport(data: SupportDataDto): Promise<{
        success: boolean;
    }>;
}
