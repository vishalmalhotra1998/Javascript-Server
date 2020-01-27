permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: [],
    },

}


const hasPermission = (moduleName, role, permissionsType) => {


    const a = permissions[moduleName][permissionsType];
    console.log("permission ",moduleName,role,permissionsType);
    let flag = false;

    console.log()
    a.forEach(element => {

        if (element === role) {

            flag = true;
        }
    });

    return flag
}
console.log(hasPermission('getUsers', 'trainee', 'write'));