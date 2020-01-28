import { validDiamondRows } from "./patterns"
import { validEquilateralRows } from "./patterns";
import { validUser } from './utils'
import { hasPermission } from './utils'
import { user } from './constants'
process.argv[2];
let rowForDiamond = process.argv[2];
let rowForEquilateral = process.argv[3];
validDiamondRows(rowForDiamond);
console.log("\n");
validEquilateralRows(rowForEquilateral);
console.log("\n");
validUser(user)
console.log("\n");
console.log(hasPermission('getUsers', 'trainee', 'write'));