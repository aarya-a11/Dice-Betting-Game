const rollBtn = document.getElementById("rollBtn");
const diceImg = document.getElementById("diceImg");
let balance = 100;

const rollDice = (betAmount) => {
    document.getElementById("result").textContent = "Rolling the dice...";
    diceImg.src = "images/diceroll.gif";
    setTimeout(() => {
        const dice = Math.floor(Math.random() * 6) + 1;
        diceImg.src = `images/dice${dice}.png`;
        console.log(`You rolled a ${dice}`);
        const guess = Number(document.getElementById("guess").value);
        if (guess === dice) {
            console.log("Congratulations! You guessed correctly!");
            balance += betAmount * 5;
            document.getElementById("result").textContent = `Congratulations, You guessed correctly, You win $${betAmount * 5}!`;
            confetti({
                particleCount: 300,
                angle: 60,
                spread: 85,
                origin: { x: 0 }
            });

            confetti({
                particleCount: 300,
                angle: 120,
                spread: 85,
                origin: { x: 1 }
            });
        } else {
            console.log(`Sorry, you guessed ${guess}. The correct number was ${dice}.`);
            balance -= betAmount;
            document.getElementById("result").innerHTML = `Sorry, you guessed incorrectly. <br> The dice rolled a ${dice}. You lose $${betAmount}.`;
        }
        document.getElementById("bal").textContent = `New Balance: $${balance}`;

        if (balance <= 0) {
            document.getElementById("res").textContent = "This journey is not yet over. Please recharge to start again.";
            rollBtn.disabled = true;
        }
    },3000);

}
const resetRound = () => {
    document.getElementById("betLabel").textContent =
        "Enter Bet Amount:";

    document.getElementById("betAmount").style.display =
        "inline-block";

    document.getElementById("betAmount").value = "";
};

rollBtn.addEventListener("click", () => {
    const betAmount = Number(document.getElementById("betAmount").value);

    if (betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    const confirmed = confirm(`Are you sure you want to bet $${betAmount}?`);

    if (!confirmed) {
        return;
    }
    if(betAmount > balance){
        alert("You cannot bet more than your current balance.");
        return;
    }else{
        document.getElementById("betLabel").textContent =`Bet Confirmed: $${betAmount}`;
        document.getElementById("betAmount").style.display = "none";
    }


    rollDice(betAmount);
    setTimeout(() => {
        resetRound();
    }, 3000);

});
