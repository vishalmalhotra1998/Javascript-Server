import { permissions } from "../constants.js"

// Function for checking the role in given permmisions
const hasPermission = (moduleName, role, permissionType) => {
    console.log('permission', moduleName, role, permissionType);
    if (permissions.hasOwnProperty(moduleName)) {
        return (permissions[moduleName][permissionType].includes(role)) || 
        (permissions[moduleName].all && permissions[moduleName]['all'].includes(role));
    }
    return false;
};

console.log(hasPermission('getUsers', 'trainer', 'write'));

export default hasPermission;