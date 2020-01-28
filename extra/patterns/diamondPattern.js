// Function  for implementing diamond triangle
const diamond = (row) => {
  let row_Index = 0;
  let space = "";
  let star = "";
  let space_Count = 0;
  // Logic for upper triangle 
  for (row_Index = 0; row_Index < row; row_Index++) {
    for (let k = row - 1; k > row_Index; k--) {
      space = space + " ";
    }

    for (let j = 0; j < row_Index * 2 + 1; j++) {
      star = star + "*";
    }
    console.log(space + star);
    star = "";
    space = "";

  }
  // Logic for lower triangle
  for (let i = row_Index; i < row * 2; i++) {

    for (let j = 0; j < space_Count; j++) {
      space = space + " ";
    }
    for (let k = 0; k < (row - space_Count) * 2 - 1; k++) {
      star = star + "*";

    }
    space_Count++;
    console.log(space + star);
    space = "";
    star = "";
  }
}
//Creating regex for input constraints
const validDiamondRows = (rows) => {
  const regex = /^([2-9]|1[0])$/;
  //Using try catch for throwing errors
  try {
    // Regex for checking valid inputs
    if (regex.test(rows)) {
      diamond(rows);
    }

    else {
      throw Error("Invalid Input");
    }
  }
  catch (Error) {
    console.log(Error.message);
  }
}
//Export function validDiamondRows
export default validDiamondRows;