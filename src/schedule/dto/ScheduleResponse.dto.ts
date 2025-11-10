export class ScheduleResponseDto {
  description?: string;
  location?: string;
  day: string;
  hour: string;
  subject: string;
  teacherName: string;
  title?: string;
  startDate?: Date;
  endDate?: Date;
  teacher?: string;
  class?: string;
  recurrence?: string;
  color?: string;
}
