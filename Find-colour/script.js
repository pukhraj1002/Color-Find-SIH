// Define color names and colors
var colorInfo = [
    { name: "Red", color: "rgb(255, 0, 0)" },
    { name: "Green", color: "rgb(0, 255, 0)" },
    { name: "Blue", color: "rgb(0, 0, 255)" },
    { name: "Yellow", color: "rgb(255, 255, 0)" }
];

// Select elements
var colorBoxes = document.querySelectorAll(".color-box");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById("message");
var resetButton = document.getElementById("resetButton");
var scoreDisplay = document.getElementById("score");

// Initialize variables
var pickedColorInfo;
var score = 0;

// Set up the game
resetGame();

// Event listener for reset button
resetButton.addEventListener("click", function () {
    resetGame();
});

// Event listener for color boxes
colorBoxes.forEach(function (box, index) {
    box.addEventListener("click", function () {
        var clickedColorInfo = colorInfo[index];

        if (clickedColorInfo.name === pickedColorInfo.name) {
            message.textContent = "Correct!";
            changeColors(clickedColorInfo.color);
            score++;
            scoreDisplay.textContent = score;
            resetButton.textContent = "Play Again";
            setTimeout(function () {
                resetGame();
            }, 1); // Delay before resetting the game (1 second)
        } else {
            message.textContent = "Try Again";
            score = 0; // Reset the score to zero on a wrong guess
            scoreDisplay.textContent = score;
        }
    });
});

// Function to reset the game
function resetGame() {
    pickedColorInfo = pickColorInfo();
    colorDisplay.textContent = pickedColorInfo.name;
    message.textContent = "";
    resetButton.textContent = "New Colors";

    for (var i = 0; i < colorBoxes.length; i++) {
        colorBoxes[i].style.display = "block";
        colorBoxes[i].style.backgroundColor = colorInfo[i].color;
    }
}

// Function to pick a random color info from colorInfo array
function pickColorInfo() {
    var randomIndex = Math.floor(Math.random() * colorInfo.length);
    var colorObject = colorInfo[randomIndex];
    
    // Function to speak the color name
    function speakColor() {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(`${colorObject.name}`);
        synth.speak(utterance);
    }
    // Speak the color immediately after obtaining it
    speakColor();
    return colorObject;
}

// Function to change the color of all boxes to the correct color
function changeColors(color) {
    for (var i = 0; i < colorBoxes.length; i++) {
        colorBoxes[i].style.backgroundColor = color;
    }
}
