let boxes = document.querySelectorAll(".box");
let a = "X";
let scoreX = document.querySelector("#scoreX");
let scoreO = document.querySelector("#scoreO");  
let res = document.querySelector("#reset");
let count = 0;
let x = 0;
let o = 0;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWinner = () => {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return boxes[a].innerText !== "" && 
           boxes[a].innerText === boxes[b].innerText && 
           boxes[b].innerText === boxes[c].innerText;
  });
};

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
            
            const winner = checkWinner();
            
            if (winner) {

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
 
