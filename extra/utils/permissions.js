const permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: [],
    },

}

// Function returns true or false after checking the parameters,modulName,role and permission type
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
// Prints the return value by function
console.log(hasPermission('getUsers', 'trainee', 'write'));