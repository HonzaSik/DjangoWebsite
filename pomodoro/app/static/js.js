//on click start button show the text about pomodoro
//do it mmore times
document.querySelector('#startButton').onclick = () => {
    let text = document.querySelector('#more_text');
    //show the text
    text.style.display = 'block';
}
//on click close button hide the text about pomodoro
document.querySelector('#close_button').onclick = () => {
    let text = document.querySelector('#more_text');
    text.style.display = 'none';
}
