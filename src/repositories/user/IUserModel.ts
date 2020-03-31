import IVersionModel from './../versionable/IVersionableDocument';
export interface IUserModel extends IVersionModel {
    id: string;
    name: string;
    address: string;
    password: string;
    email: string;
    role: string;
    dob: Date;
    mob: number;
    hobbies: string[];
}