function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function addCoinToDatabase() {
    const csrftoken = getCookie('csrftoken');  // Get the CSRF token

    fetch('/add_coin/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,  // Include the CSRF token in the request header
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}


function addTomatoToDatabase() {
    const csrftoken = getCookie('csrftoken');  // Get the CSRF token

    fetch('/add_tomato/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,  // Include the CSRF token in the request header
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function addIntervalToDatabase() {
    const csrftoken = getCookie('csrftoken');  // Get the CSRF token

    fetch('/add_interval/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,  // Include the CSRF token in the request header
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}


document.addEventListener('DOMContentLoaded', function() {
    let timer;
    let text = "Pomodoro Timer";
    let isPaused = true;
    let pause = false;
    let remainingTime = 25 * 60; // 25 minutes
    let pause_length = 5 * 60; // 5 minutes
    let pomodoro_length = 25 * 60; // 25 minutes

    function updateTimerDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        document.getElementById('text').textContent = text;
        document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        barWidth();
    }

    function startTimer() {
        if (pause) {
            text = "Take a break!";

            timer = setInterval(() => {
            if(remainingTime > 0){
                remainingTime--;
                updateTimerDisplay();
                if(remainingTime === 16){
                    let cutdown = document.getElementById('cutdownSound');
                    cutdown.volume = 0.5;
                    cutdown.play();
                }
            }
            else{
                pause = false;
                isPaused = true;
                remainingTime = 25 * 60;
                updateTimerDisplay();
                startTimer();
            }
        }, 1000);
        }
        else {
        if (isPaused) {
            isPaused = false;
            text = "Work Time!";
            timer = setInterval(() => {
                if (remainingTime > 0) {
                    remainingTime--;
                    if (remainingTime % 60 === 0){
                        // Every minute, add a coin to the database
                        //play coin.mp3 sound
                        let coin = document.getElementById('coinSound');
                        coin.volume = 0.1;
                        coin.play();
                        addCoinToDatabase();

                    }
                    updateTimerDisplay();
                } else {
                    // This loop runs 5 times
                    for(let i = 0; i < 5; i++){
                        addTomatoToDatabase();
                    }
                    // Playing a completion sound
                    let complete = document.getElementById('completeSound');
                    complete.volume = 0.6;
                    complete.play();

                    // Adding an interval to the database
                    addIntervalToDatabase();

                    // Clearing the interval to stop the timer
                    clearInterval(timer);

                    startPause();
                }
            }, 1000);
        }
        }
    }

    function pauseTimer() {
        clearInterval(timer);
        isPaused = true;
    }

    //calculates bar width based in the time in %
    function barWidth(){
        let bar = document.getElementById('loadBar_fg');
        let barWidth = 0;
        if (pause){
            barWidth = 98-((remainingTime / pause_length) * 98);
        }
        else{
            barWidth = 98 - ((remainingTime / pomodoro_length) * 98);
        }
        bar.style.width = barWidth + '%';
    }

    function endTimer() {
        clearInterval(timer);
        remainingTime = 25 * 60; // Reset to 25 minutes
        updateTimerDisplay();
        isPaused = true;
    }

    function startPause() {
        clearInterval(timer);
        remainingTime = 5 * 60; // Reset to 5 minutes
        updateTimerDisplay();
        isPaused = true;
        pause = true;
        startTimer();
    }

    document.getElementById('startButton').addEventListener('click', startTimer);
    document.getElementById('pauseButton').addEventListener('click', pauseTimer);
    document.getElementById('endButton').addEventListener('click', endTimer);

    // Initialize the timer display
    updateTimerDisplay();

});
