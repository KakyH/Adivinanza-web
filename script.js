var startTime;
var intervalId;
var attempts = 0;
var gameStarted = false;

function showScreen(screenId) {
    var screens = document.getElementsByClassName("container");
    for (var i = 0; i < screens.length; i++) {
        screens[i].classList.add("hidden");
    }

    document.getElementById(screenId).classList.remove("hidden");
}

function startTimer() {
    startTime = new Date().getTime();
    intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (gameStarted) {
        var currentTime = new Date().getTime();
        var elapsedTime = Math.floor((currentTime - startTime) / 1000);
        document.getElementById("timeElapsed").textContent = elapsedTime;
    }
}

function startGame() {
    gameStarted = true;
    showScreen("gameScreen");
    attempts = 0;
    startTimer();
    document.getElementById("guessInput").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("attemptCount").textContent = attempts;
    document.getElementById("timeElapsed").textContent = 0;
    document.getElementById("guessInput").focus();

    // Agregar evento de escucha para la tecla "Enter"
    document.getElementById("guessInput").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    });
}

function checkGuess() {
    if (!gameStarted) {
        alert("Haz clic en el botón 'Sí, ¡Vamos!' para comenzar el juego.");
        return;
    }

    var guess = parseInt(document.getElementById("guessInput").value);
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts++;

    if (guess === randomNumber) {
        document.getElementById("result").innerHTML = "¡Adivinaste!";
        clearInterval(intervalId);
        gameStarted = false;
    } else if (guess < randomNumber) {
        document.getElementById("result").innerHTML = "Demasiado bajo, intenta nuevamente.";
    } else {
        document.getElementById("result").innerHTML = "Demasiado alto, intenta nuevamente.";
    }

    document.getElementById("attemptCount").textContent = attempts;
}

showScreen("startScreen");
