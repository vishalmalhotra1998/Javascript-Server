import { validDiamondRows } from "./patterns"
import { validEquilateralRows } from "./patterns";
import { validateUser } from './utils'
import { hasPermission } from './utils'
import { users } from './constants'
let rowForDiamond = process.argv[2];
let rowForEquilateral = process.argv[3];
validDiamondRows(rowForDiamond);
console.log('\n');
validEquilateralRows(rowForEquilateral);
console.log('\n');
validateUser(users)
console.log('\n');
console.log(hasPermission('getUsers', 'trainer', 'write'));