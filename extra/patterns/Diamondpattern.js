

function Diamond(row) {
  let r;
  let space = "";
  let star = "";
  let o = 0;
  for (let i = 0; i < row; i++) {
    for (let k = row - 1; k > i; k--) {
      space = space + " ";
    }

    for (let j = 0; j < i * 2 + 1; j++) {
      star = star + "*";
    }
    console.log(space + star);
    star = "";
    space = "";
    r = i;
  }



  for (let i = r + 1; i < row * 2 - 1; i++) {

    for (let u = 0; u <= o; u++) {
      process.stdout.write(" ");
    }

    for (let k = 0; k < (row - 1 - o) * 2 - 1; k++) {
      process.stdout.write("*");

    }

    o++;
    process.stdout.write("\n");
  }
}

let num = process.argv[2];
if (num >= 2 && num <= 10) {
  Diamond(num);
}
else {
  process.stdout.write("range b/w 2 to 10");
}