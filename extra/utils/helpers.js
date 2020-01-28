import { permissions } from '../constants'

const validEmail = (email) => {
    const regex = /([a-zA-Z0-9\+_.])+@successive.tech/g;

    return regex.test(email);
}



const hasPermission = (moduleName, role, permissionsType) => {


    const a = permissions[moduleName][permissionsType];
    console.log("permission ", moduleName, role, permissionsType);
    let flag = false;

    console.log()
    a.forEach(element => {

        if (element === role) {

            flag = true;
        }
    });

    return flag
}

export default validEmail;
export { hasPermission }