export enum AuthPermissions {
    Create = 1,
    Read,
    Update,
    Delete,
}

export interface AuthPermissionDto {
    path: string;
    permissions: AuthPermissions[];
}

export interface AuthDto {
    token: string;
    expDate: string;
    permissions?: AuthPermissionDto[];
}
