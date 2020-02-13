import IVersionModel from './../versionable/IVersionableDocument';
export interface IUserModel extends IVersionModel {
    id: string;
    name: string;
    address: string;
    email: string;
    dob: Date;
    mobileNumber: number;
    hobbies: string[];
}