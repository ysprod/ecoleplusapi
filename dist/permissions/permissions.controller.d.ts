import { Permission } from './schemas/permission.schema';
import { PermissionsService } from './permissions.service';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    findAll(): Promise<Permission[]>;
    create(data: Partial<Permission>): Promise<Permission>;
}
