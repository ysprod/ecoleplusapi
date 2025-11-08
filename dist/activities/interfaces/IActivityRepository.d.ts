export interface IActivityRepository {
    findBySchool(schoolId: string): Promise<any[]>;
    create(activityData: any): Promise<any>;
    updateById(updateData: any): Promise<any>;
    deleteById(id: string): Promise<void>;
}
