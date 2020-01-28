// Function  for implementing diamond triangle
const diamond = (row: number): void => {
  let rowIndex = 0;
  let space = '';
  let star = '';
  let spaceCount = 0;


  // Logic for upper triangle

  for (rowIndex = 0; rowIndex < row; rowIndex++) {

    for (let k = row - 1; k > rowIndex; k--) {
      space = space + ' ';
    }

    for (let j = 0; j < rowIndex * 2 + 1; j++) {
      star = star + '*';
    }
    console.log(space + star);
    star = '';
    space = '';

  }
  // Logic for lower triangle
  for (let i = rowIndex; i < row * 2; i++) {

    for (let j = 0; j < spaceCount; j++) {
      space = space + ' ';
    }

    for (let k = 0; k < (row - spaceCount) * 2 - 1; k++) {
      star = star + '*';

    }

    spaceCount++;
    console.log(space + star);
    space = '';
    star = '';
  }
};
 // Creating regex for input constraints
const validDiamondRows = (rows: number): void => {
  const regex = /^([2-9]|1[0])$/;
  // Using try catch for throwing errors
  try {
    // Regex for checking valid inputs
    const rowString = rows.toString();
    if (regex.test(rowString)) {
      diamond(rows);
    }

    else {
      throw Error('Invalid Input');
    }
  }
  catch (Error) {
    console.log(Error.message);
  }
};
// Export function validDiamondRows
export default validDiamondRows;