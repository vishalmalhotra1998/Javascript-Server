import { validDiamondRows } from './patterns';
import { validEquilateralRows } from './patterns';
import { validateUser } from './utils';
import { hasPermission } from './utils';
import { user } from './constants';
 // process.argv[2];
 // let rowForDiamond = process.argv[2];
 // let rowForEquilateral = process.argv[3];
validDiamondRows(5);
console.log('\n');
validEquilateralRows(7);
console.log('\n');
validateUser(user);
console.log('\n');
console.log(hasPermission('getUsers', 'trainer', 'write'));