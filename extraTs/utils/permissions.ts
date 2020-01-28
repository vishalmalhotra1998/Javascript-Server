import { permissions } from '../constants';
const hasPermission = (moduleName: string, role: string, permissionsType: string): boolean => {
    const a = permissions[moduleName][permissionsType];
    console.log('permission', moduleName, role, permissionsType);
    let flag = false;
    console.log();
    a.forEach(element => {
        if (element === role) {
            flag = true;
        }
    });
    return flag;
};
// Export hasPermission function
export default hasPermission;
