
interface Ipermissions {
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
    [index: string]: Ipermissions;
}
export { Iemail, IpermissionSet };