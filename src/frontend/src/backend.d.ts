import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export interface TeamMember {
    name: string;
    designation: string;
}
export interface CompanyProfile {
    dateOfBirth: bigint;
    createdAt: bigint;
    email: string;
    updatedAt: bigint;
    companyWebsite: string;
    companyAddress: string;
    lastName: string;
    servicesNeeded: Array<ServiceType>;
    firstName: string;
}
export enum ServiceType {
    customSolutions = "customSolutions",
    processOptimization = "processOptimization",
    aiSupportAgents = "aiSupportAgents",
    automationBots = "automationBots"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOrUpdateTeamMember(name: string, designation: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrUpdateCompanyProfile(email: string, firstName: string, lastName: string, dateOfBirth: bigint, companyWebsite: string, companyAddress: string, servicesNeeded: Array<ServiceType>): Promise<void>;
    deleteCompanyProfile(): Promise<void>;
    deleteTeamMember(name: string): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getCompanyProfile(): Promise<CompanyProfile>;
    getCompanyProfileById(userId: UserId): Promise<CompanyProfile>;
    getTeamMembers(): Promise<Array<TeamMember>>;
    getTeamMembersById(userId: UserId): Promise<Array<TeamMember>>;
    isCallerAdmin(): Promise<boolean>;
}
