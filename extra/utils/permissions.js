import { permissions } from "../constants.js"
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
    return flag;
}
//Export hasPermission function
export default hasPermission;
