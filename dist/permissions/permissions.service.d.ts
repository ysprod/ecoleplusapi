import { Permission, PermissionDocument } from './schemas/permission.schema';
import { Model } from 'mongoose';
export declare class PermissionsService {
    private permissionModel;
    constructor(permissionModel: Model<PermissionDocument>);
    create(data: Partial<Permission>): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findById(id: string): Promise<Permission>;
    update(id: string, data: Partial<Permission>): Promise<Permission>;
    remove(id: string): Promise<void>;
}
