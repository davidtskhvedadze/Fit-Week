let addWorkoutButton = document.getElementById('addWorkout');
let workoutContainer = document.getElementById('workoutContainer');
let inputField = document.getElementById('inputField');


addWorkoutButton.addEventListener('click', () => {
    const newWorkout = document.createElement('p');
    newWorkout.innerText = inputField.value;
    newWorkout.classList.add('paragraph-styling');
    workoutContainer.appendChild(newWorkout);
    inputField.value = "";
    newWorkout.addEventListener('click', () => {
        newWorkout.style.textDecoration = "line-through";
    })
    newWorkout.addEventListener('dblclick', () => {
        workoutContainer.removeChild(newWorkout);
    })
});



