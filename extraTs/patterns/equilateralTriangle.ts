// Function  for implementing equilateral triangle
const equilateral = (row: number) => {
  for (let i = 0; i < row; i++) {
    let space = '';
    let star = '';
    for (let k = 0; k < row - i; k++) {
      space = space + ' ';
    }
    for (let j = 0; j <= i; j++) {
      star = star + '* ';
    }
    console.log(space + star);
  }
};

// Creating regex for input constraints
const regex = /^([2-9]|1[0])$/;
// Using try catch for throwing errors
const validEquilateralRows = (rows: number): void => {
  try {
    // Regex for checking valid inputs
    const rowString = rows.toString();
    if (regex.test(rowString)) {

      equilateral(rows);
    }
    else {
      throw Error('Invalid Input');
    }
  }
  catch (Error) {
    console.log(Error.message);
  }
};
// Export the function validEquilateralRows
export default validEquilateralRows;
