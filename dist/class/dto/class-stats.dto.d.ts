export declare class ClassStatsDto {
    totalClasses: number;
    avgStudents: number;
    totalStudents: number;
    totalTeachers: number;
}
export declare class LevelStatsDto {
    level: string;
    count: number;
    withEducator: number;
}
export declare class ClassTypeStatsDto {
    classType: string;
    count: number;
}
export declare class SchoolStatsDto {
    schoolId: string;
    count: number;
}
export declare class CreationTrendDto {
    month: string;
    count: number;
}
export declare class ClassStatisticsDto {
    summary: ClassStatsDto;
    byLevel: LevelStatsDto[];
    byClassType: ClassTypeStatsDto[];
    topSchools: SchoolStatsDto[];
    creationTrend: CreationTrendDto[];
}
