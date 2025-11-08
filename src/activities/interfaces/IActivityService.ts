export interface IActivityService {
  getActivitiesBySchool(schoolId: string): Promise<any[]>;
  createActivity(body: any): Promise<any>;
  updateActivity(updateData: any): Promise<any>;
  deleteActivity(id: string): Promise<void>;
}