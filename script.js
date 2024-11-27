let boxes = document.querySelectorAll(".box");
let a = "X";
let scoreX = document.querySelector("#scoreX");
let scoreO = document.querySelector("#scoreO");  
let res = document.querySelector("#reset");
let count = 0;
let x = 0;
let o = 0;

res.addEventListener("click", () => {
    scoreX.innerText = 0;
    scoreO.innerText = 0;
    count = 0;
    for (let box of boxes) {
        box.innerText = ''; 
        box.classList.remove('disabled'); // Enable the boxes again when resetting
    }
});

for (let box of boxes) {
    box.addEventListener("click", (e) => {
        // Check if the game is already over (boxes are disabled)
        if (e.target.innerText !== "X" && e.target.innerText !== "O" && !document.querySelector('.disabled')) {
            e.target.innerText = a;
            count++;

            // Switch player
            a = (a === "X") ? "O" : "X";

            if ((boxes[0].innerText !== "" && boxes[0].innerText === boxes[1].innerText && boxes[1].innerText === boxes[2].innerText) ||
                (boxes[3].innerText !== "" && boxes[3].innerText === boxes[4].innerText && boxes[4].innerText === boxes[5].innerText) ||
                (boxes[6].innerText !== "" && boxes[6].innerText === boxes[7].innerText && boxes[7].innerText === boxes[8].innerText) || 
                (boxes[0].innerText !== "" && boxes[0].innerText === boxes[3].innerText && boxes[3].innerText === boxes[6].innerText) ||
                (boxes[1].innerText !== "" && boxes[1].innerText === boxes[4].innerText && boxes[4].innerText === boxes[7].innerText) ||
                (boxes[2].innerText !== "" && boxes[2].innerText === boxes[5].innerText && boxes[5].innerText === boxes[8].innerText) || 
                (boxes[0].innerText !== "" && boxes[0].innerText === boxes[4].innerText && boxes[4].innerText === boxes[8].innerText) ||
                (boxes[2].innerText !== "" && boxes[2].innerText === boxes[4].innerText && boxes[4].innerText === boxes[6].innerText)) {

                // Winner found, disable further clicks
                document.querySelectorAll('.box').forEach(box => box.classList.add('disabled'));

                // Update the score
                if (e.target.innerText === "X") {
                    x++;
                    scoreX.innerText = x;
                } else if (e.target.innerText === "O") {
                    o++;
                    scoreO.innerText = o;
                }

                // Reset game after delay
                setTimeout(() => {
                    for (let box of boxes) {
                        box.innerText = '';
                    }
                    count = 0;
                    document.querySelectorAll('.box').forEach(box => box.classList.remove('disabled')); // Re-enable boxes after reset
                }, 2000);
            } else if (count === 9) {
                // It's a draw if all boxes are filled and no winner
                setTimeout(() => {
                    for (let box of boxes) {
                        box.innerText = '';
                    }
                    count = 0;
                    document.querySelectorAll('.box').forEach(box => box.classList.remove('disabled')); // Re-enable boxes after reset
                }, 2000);
            }
        }
    });
}
 