
function Equilateral(row) {

    for (let i = 0; i < row; i++) {

        for (let k = 0; k < row - i; k++) {
            process.stdout.write(" ");

        }
        for (let j = 0; j <= i; j++) {

            process.stdout.write("* ");
        }


        process.stdout.write("\n");

    }
}

let num = process.argv[2];
if (num >= 2 && num <= 10) {
    Equilateral(num);
}
else {
    process.stdout.write("range b/w 2 to 10");
}