//workout.js
var workouts = [];

document.getElementById('workout-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve existing workouts data from local storage
    var existingWorkoutsData = localStorage.getItem('workoutsData');
    console.log("Existing Workouts Data:", existingWorkoutsData);
    workouts = existingWorkoutsData ? JSON.parse(existingWorkoutsData) : [];

    var workout = {};

    workout.name = document.getElementById('workoutName').value;

    var exerciseContainers = document.querySelectorAll('.exercise');
    workout.exercises = [];

    exerciseContainers.forEach(function (exerciseContainer) {
        var exercise = {};
        var exerciseNameInput = exerciseContainer.querySelector('.exerciseName input');
        if (exerciseNameInput && exerciseNameInput.value.trim() !== '') {
            exercise.name = exerciseNameInput.value;
            var sets = [];
            var setcontainers = exerciseContainer.querySelectorAll('.set');

            setcontainers.forEach(function (setcontainer, index) {
                var set = {};
                var weightInput = setcontainer.querySelector('.weight');
                if (weightInput && weightInput.value.trim() !== '') {
                    set.weight = weightInput.value;
                }
                var repsInput = setcontainer.querySelector('.reps');
                if (repsInput && repsInput.value.trim() !== '') {
                    set.reps = repsInput.value;
                }
                var timeInput = setcontainer.querySelector('.time');
                if (timeInput && timeInput.value.trim() !== '') {
                    set.time = timeInput.value;
                }

                if (Object.keys(set).length > 0) {
                    sets.push(set);
                }

            });
            exercise.sets = sets;


            var restInput = exerciseContainer.querySelector('.rest input');
            if (restInput && restInput.value.trim() !== '') {
                exercise.rest = restInput.value;
            }


            if (sets.length > 0) {
                workout.exercises.push(exercise);
            }
        }
    });

    var weekDays = [];
    var selectedDates = document.querySelectorAll('.exerciseSchedule input[type="checkbox"]');

    selectedDates.forEach(function (checkbox) {
        if (checkbox.checked) {
            weekDays.push(checkbox.value);
        }
    });

    workout.weekDays = weekDays;

    workouts.push(workout);

    console.log("workouts: ", workouts);

    localStorage.setItem('workoutsData', JSON.stringify(workouts));

    // console.log("Before redirection");
    // window.location.href = "/Users/mitchrobards/FitnessApp/Pages/week.cshtml";
    // console.log("After redirection");
});








document.getElementById('add-exercise').addEventListener('click', function () {
    const exercisesContainer = document.getElementById('exercises-container');
    const newExercise = document.createElement('div');
    newExercise.classList.add('exercise');
    newExercise.innerHTML = `
        <div class="exerciseName">
                <input type="text" class="exercise" name="exercise" placeholder="Exercise Name" required>
                <button type="button" class="deleteExercise"><i class="fa-solid fa-delete-left"></i></button>
            </div>

            <button type="button" class="addSet">Add Set</button>
            
            <div class="set-container"></div>
            <div class="rest">
                <label for="rest">Rest Between Sets</label>
                <input type="number" class="rest" name="rest">
            </div>
            
    `;
    exercisesContainer.appendChild(newExercise);

    const deleteExerciseButton = newExercise.querySelector('.deleteExercise');
    if (deleteExerciseButton) {
        deleteExerciseButton.addEventListener('click', function () {
            newExercise.remove();
        });
    }


    let setNum = 1;

    newExercise.querySelector('.addSet').addEventListener('click', function () {
        const setContainer = newExercise.querySelector('.set-container');
        const newSet = document.createElement('div');
        newSet.classList.add('set');
        newSet.innerHTML = `
    <div class="setGroup">
        <div class="set">
            <label for="set">Set ${setNum}:</label>
        </div>
        <div>
            <input type="number" class="weight" name="weight" placeholder="lbs">
        </div>
        <div>
            <input type="number" class="reps" name="reps" min="1" placeholder="Reps:">
        </div>
        <div>
            <input type="number" class="time" name="time" placeholder="Time">
        </div>
        <button type="button" class="deleteSet"><i class="fa-solid fa-circle-minus"></i></button>
    </div>
`;
        setContainer.appendChild(newSet);
        setNum++;



        const deleteSetButton = newSet.querySelector('.deleteSet');
        if (deleteSetButton) {
            deleteSetButton.addEventListener('click', function () {
                newSet.remove();

                setNum--;
                // renumbers the sets when a previous set is deleted
                const setGroups = setContainer.querySelectorAll('.setGroup');
                setGroups.forEach((setGroup, index) => {
                    const label = setGroup.querySelector('label');
                    if (label) {
                        label.textContent = `Set ${index + 1}:`;
                    }
                });
            });
        }
    });
});


document.getElementById('showSchedule').addEventListener('click', function () {
    var scheduleSelect = document.querySelector('.exerciseSchedule');
    if (scheduleSelect.style.display == "none") {
        scheduleSelect.style.display = "block";
    } else {
        scheduleSelect.style.display = "none";
    }
});





document.getElementById('closeSchedule').addEventListener('click', function () {
    var scheduleSelect = document.querySelector('.exerciseSchedule');
    scheduleSelect.style.display = "none";
})

document.querySelector('.exerciseSchedule').addEventListener('click', function (event) {
    var option = event.target;
    if (option.tagName === 'OPTION') {
        option.selected = !option.selected;
    }
});

function toggleCheckbox(checkbox) {
    var checkboxIcon = checkbox.previousElementSibling;
    if (checkbox.checked) {
        checkboxIcon.classList.remove('fa-regular', 'fa-square');
        checkboxIcon.classList.add('fa-solid', 'fa-square');
    } else {
        checkboxIcon.classList.remove('fa-solid', 'fa-square');
        checkboxIcon.classList.add('fa-regular', 'fa-square');
    }

    updateSelectedOptions();

}

function updateSelectedOptions() {
    var selectedOptionsDiv = document.getElementById('selectedOptions');
    selectedOptionsDiv.innerHTML = '';

    var checkboxes = document.querySelectorAll('#exerciseSchedule input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var labelText = checkbox.parentNode.textContent.trim();
            var optionText = document.createTextNode(labelText);
            selectedOptionsDiv.appendChild(optionText);

            selectedOptionsDiv.appendChild(document.createTextNode('    '));
        }
    });
}

window.addEventListener('DOMContentLoaded', function () {
    var workoutsData = localStorage.getItem('workoutsData');
    var workouts = JSON.parse(workoutsData);

    workouts.forEach(function (workout) {
        workoutView(workout)
    });

});

function workoutView(workout) {
    const workoutViewDiv = document.createElement('div');
    workoutViewDiv.className = "workoutViewDiv";

    const workoutTitle = document.createElement('h1');
    workoutTitle.textContent = workout.name;
    workoutViewDiv.appendChild(workoutTitle);

    const exerciseCount = document.createElement('p');
    exerciseCount.textContent = `Exercises: ${workout.exercises.length}`;
    exerciseCount.className = 'exerciseCount';
    workoutViewDiv.appendChild(exerciseCount);


    var weekdayString = "";
    const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    workout.weekDays.forEach(day => {
        var dayConvert = dayNames[day];
        weekdayString += dayConvert + " "; 
    });

    const scheduledDays = document.createElement('p'); 
    scheduledDays.textContent = weekdayString;
    workoutViewDiv.appendChild(scheduledDays);





    document.querySelector('.workoutView').appendChild(workoutViewDiv);
}

