export default interface IUserCreate {
    name: string;
    address: string;
    email: string;
    password: string;
    role: string;
    dob: Date;
    mob: number;
    hobbies: string[];
}