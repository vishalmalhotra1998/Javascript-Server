permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: [],
    },

}


function hasPermission(moduleName, role, permissionsType) {
    const a = permissions[moduleName][permissionsType];
    let flag = false;
    
    console.log()
    a.forEach(element => {
       
        if (element === role) {

            flag = true;
        }
    });

   return flag
}
console.log(hasPermission('getUsers', 'traine', 'write'));