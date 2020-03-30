
interface Ipermission {
    all: string[];
    read: string[];
    write: string[];
    delete: string[];

}
interface Iemail {

    traineeEmail: string;
    reviewerEmail: string;

}

interface IpermissionSet {
    getUsers: Ipermission;
}
export { Iemail, IpermissionSet };

