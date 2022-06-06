export interface UpdatePasswordDTO {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export class ClassUpdatePasswordDTO {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}