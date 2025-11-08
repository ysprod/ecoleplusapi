import { ActivityCreateDto } from './activity-create.dto';
declare const ActivityUpdateDto_base: import("@nestjs/mapped-types").MappedType<Partial<ActivityCreateDto>>;
export declare class ActivityUpdateDto extends ActivityUpdateDto_base {
    id?: string;
}
export {};
