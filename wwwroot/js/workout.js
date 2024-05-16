//workout.js
var workouts = [];

var workoutId = 0;

document.getElementById('createWorkout').addEventListener('click', function () {
    var showForm = document.getElementById('workoutForm');
    if (showForm.style.display == 'none') {
        showForm.style.display = 'block';
        this.textContent = "Hide Form";
        this.style.position = 'static';
        this.style.top = '';
        this.style.transform = 'none';
    } else {
        showForm.style.display = 'none';
        this.style.position = 'absolute';
        this.style.top = '50px';
        this.style.left = '50%';
        this.style.transform = 'translateX(-50%)';
        this.textContent = "Create Workout";
    }
});

document.getElementById('workoutForm').addEventListener('submit', function (event) {
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

    workoutId++;

    workout.id = workoutId;


    workouts.push(workout);

    console.log("workouts: ", workouts);

    localStorage.setItem('workoutsData', JSON.stringify(workouts));

    handleWorkoutsData();

    this.style.display = 'none';

    var createWorkouttButton = document.getElementById('createWorkout');

    createWorkouttButton.style.position = 'absolute';
    createWorkouttButton.style.top = '50px';
    createWorkouttButton.style.left = '50%';
    createWorkouttButton.style.transform = 'translateX(-50%)';
    createWorkouttButton.textContent = "Create Workout";

    // console.log("Before redirection");
    // window.location.href = "/Users/mitchrobards/FitnessApp/Pages/week.cshtml";
    // console.log("After redirection");
});








document.getElementById('add-exercise').addEventListener('click', function () {
    const exercisesContainer = document.getElementById('exercises-container');
    const newExercise = document.createElement('div');
    newExercise.classList.add('exercise');
    newExercise.innerHTML = `
    <div class="exerciseGroup">
        <div class="exerciseName">
                <input type="text" class="exercise" name="exercise" placeholder="Exercise Name" required>
            </div>

            <button type="button" class="addSet"><i class="fa-solid fa-plus"></i> Add Set</button>
            
            <div class="set-container"></div>
            <div class="rest">
                <label for="rest">Rest Between Sets</label>
                <input type="number" class="rest" name="rest">
            </div>
            <button type="button" class="deleteExercise">Delete Exercise</button>
    <div>
            
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
        <div class="setItem">
        <input type="number" class="weight" name="weight">
        <p>lbs</p>
    </div>
    <div class="setItem">
        <input type="number" class="reps" name="reps" min="1">
        <p>Reps</p>
    </div>
    <div class="setItem">
        <input type="number" class="time" name="time">
        <p>Time</p>
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
    var blurredBackground = document.querySelector('.blurredBackground');
    if (scheduleSelect) {
        if (scheduleSelect.style.display === "none") {
            scheduleSelect.style.display = "block";
            blurredBackground.style.display = "block";

        } else {
            scheduleSelect.style.display = "none";
        }
    }
});

document.getElementById('closeSchedule').addEventListener('click', function () {
    var blurredBackground = document.querySelector('.blurredBackground');
    blurredBackground.style.display = "none";
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
    var checkboxes = document.querySelectorAll('.exerciseSchedule input[type="checkbox"]');
    var selectedOption = '';

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var parentText = checkbox.parentElement.textContent.trim();
            var dayAbbr = parentText.substring(0, 3);
            selectedOption += dayAbbr + " ";
        }
    });

    selectedOptionsDiv.textContent = selectedOption;
}




function handleWorkoutsData() {
    var workoutsData = localStorage.getItem('workoutsData');
    workouts = JSON.parse(workoutsData);
    workouts.forEach(function (workout) {
        workoutView(workout)
    });
}

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

    const deleteWorkoutButton = document.createElement('button');
    deleteWorkoutButton.className = 'deleteWorkout';
    deleteWorkoutButton.textContent = 'Delete Workout';
    console.log("Workout ID before setting data attribute:", workout.id);
    deleteWorkoutButton.setAttribute('data-workout-id', workout.id);
    workoutViewDiv.appendChild(deleteWorkoutButton);
    // when clicked, removes workout from workouts object and removed item from view
    deleteWorkoutButton.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-workout-id'));
        console.log("Clicked delete button for workout id:", id);

        workouts = workouts.filter(workout => workout.id !== id);
        console.log("Workouts array after deletion:", workouts);

        workoutViewDiv.remove();

        localStorage.setItem('workoutsData', JSON.stringify(workouts));


    });




    document.querySelector('.workoutView').appendChild(workoutViewDiv);
}

window.addEventListener('DOMContentLoaded', handleWorkoutsData);


