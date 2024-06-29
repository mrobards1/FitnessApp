//workout.js
var workouts = [];

if (!localStorage.getItem('latestWorkoutId')) {
    localStorage.setItem('latestWorkoutId', '0');
}

document.getElementById('createWorkout').addEventListener('click', function () {
    var showForm = document.getElementById('workoutForm');
    if (showForm.classList.contains('show')) {
        showForm.classList.remove('show');
        showForm.style.display = 'none';
        this.textContent = "Create Workout";
    } else {
        showForm.style.display = 'block';
        setTimeout(() => {
            showForm.classList.add('show');
        }, 10); // Small delay to allow the display property to take effect
        this.textContent = "Hide Form";
        this.style.position = 'static';
        this.style.top = '';
        this.style.transform = 'none';
    }
});


document.getElementById('workoutForm').addEventListener('submit', function (event) {
    event.preventDefault();


    // Retrieve existing workouts data from local storage
    var existingWorkoutsData = localStorage.getItem('workoutsData');
    console.log("Existing Workouts Data:", existingWorkoutsData);
    workouts = existingWorkoutsData ? JSON.parse(existingWorkoutsData) : [];

    var latestWorkoutId = parseInt(localStorage.getItem('latestWorkoutId'), 10);
    latestWorkoutId++;
    localStorage.setItem('latestWorkoutId', latestWorkoutId.toString());

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



    workout.id = latestWorkoutId;


    workouts.push(workout);

    console.log("workouts: ", workouts);

    localStorage.setItem('workoutsData', JSON.stringify(workouts));

    this.style.display = 'none';



    // console.log("Before redirection");
    // window.location.href = "/Users/mitchrobards/FitnessApp/Pages/week.cshtml";
    // console.log("After redirection");

    addWorkout();

    document.getElementById('createWorkout').textContent = 'Create Workout';

});








document.getElementById('addExercise').addEventListener('click', function () {
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
            <button type="button" class="deleteExercise"><i class="fa-solid fa-minus"></i> Delete Exercise</button>
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
        <button type="button" class="deleteSet"><i class="fa-solid fa-square-minus"></i></button>
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

document.querySelectorAll('.closeSchedule').forEach(function (button) {
    button.addEventListener('click', function () {
        var blurredBackground = document.querySelector('.blurredBackground');
        blurredBackground.style.display = "none";

        var scheduleSelect = document.querySelector('.exerciseSchedule');
        scheduleSelect.style.display = "none";
    });
});


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
    document.querySelector('.workoutView').innerHTML = '';

    workouts.forEach(function (workout) {
        workoutView(workout);
    });
}

function addWorkout() {
    var workoutData = localStorage.getItem('workoutsData');
    console.log('addworkout was called');
    if (workouts.length > 0) {
        const lastWorkout = workouts[workouts.length - 1]; // Target the last element
        workoutView(lastWorkout);
    }
}

document.getElementById('viewWorkoutsButton').addEventListener('click', function () {
    document.querySelector('.workoutViewPage').classList.toggle('opened');
});

document.getElementById('collapseButton').addEventListener('click', function () {
    document.querySelector('.workoutViewPage').classList.toggle('opened');
});

function workoutView(workout) {
    const workoutViewDiv = document.createElement('div');
    workoutViewDiv.className = "workoutViewDiv";
    workoutViewDiv.dataset.id = workout.id;


    const workoutTitle = document.createElement('h1');
    workoutTitle.textContent = workout.name;
    workoutViewDiv.appendChild(workoutTitle);

    var weekdayString = "";
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    workout.weekDays.forEach(day => {
        var dayConvert = dayNames[day];
        weekdayString += dayConvert + " ";
    });

    const scheduledDays = document.createElement('p');
    scheduledDays.className = 'scheduledDays';
    scheduledDays.textContent = weekdayString;
    workoutViewDiv.appendChild(scheduledDays);

    const exerciseCount = document.createElement('p');
    exerciseCount.innerHTML = `<span class="boldExercise">${workout.exercises.length}</span> Exercises`;
    exerciseCount.className = 'exerciseCount';
    workoutViewDiv.appendChild(exerciseCount);

    const editWorkoutButton = document.createElement('button');
    editWorkoutButton.className = 'editWorkoutButton';
    editWorkoutButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    workoutViewDiv.appendChild(editWorkoutButton);

    console.log("Edit Workout Button:", editWorkoutButton);

    editWorkoutButton.onclick = function () {
        console.log('editButtonClicked');
        editDiv = document.querySelector('.editDiv');
        editWorkout(workout.id);

        if (editDiv.style.display === 'none') {
            editDiv.style.display = 'flex';
        } else {
            editDiv.style.display = 'none';
        }


    };


    const deleteWorkoutButton = document.createElement('button');
    deleteWorkoutButton.className = 'deleteWorkout';
    deleteWorkoutButton.innerHTML = '<i class="fa-solid fa-square-minus"></i>';
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

document.querySelector('.closeEditDiv').addEventListener('click', function () {
    console.log('closeEditDiv was clicked');
    editDiv = document.querySelector('.editDiv');

    editDiv.style.display = 'none';
});

function editWorkout(workoutId) {
    var workoutsData = localStorage.getItem('workoutsData');
    var workouts = JSON.parse(workoutsData);

    // Find the workout to edit
    var workout = workouts.find(w => w.id === workoutId);


    if (workout) {

        // Clear any existing content in the editWorkout div
        document.querySelector('.editWorkout').innerHTML = '';

        const editForm = document.createElement('form');

        const exercisesContainerEdit = document.createElement('div');
        exercisesContainerEdit.id = 'exercisesContainerEdit';

        const workoutName = document.createElement('div');
        workoutName.className = 'workoutName';
        const workoutNameInput = document.createElement('input');
        workoutNameInput.className = workoutName;
        workoutNameInput.type = 'text';
        workoutNameInput.value = workout.name;
        workoutName.appendChild(workoutNameInput);
        exercisesContainerEdit.appendChild(workoutName);

        editForm.appendChild(exercisesContainerEdit);

        workout.exercises.forEach(exercise => {
            const exerciseGroup = document.createElement('div');
            exerciseGroup.className = "exerciseGroup";


            const exerciseName = document.createElement('div');
            exerciseName.className = 'exerciseName';

            const exerciseInput = document.createElement('input');
            exerciseInput.className = "exercise"
            exerciseInput.value = exercise.name;
            exerciseName.appendChild(exerciseInput);

            exerciseGroup.appendChild(exerciseName);

            let setNum = 1;
            exercise.sets.forEach(set => {
                const setContainer = document.createElement('div');
                setContainer.className = "setContainer";
                let weight = set.weight !== undefined ? set.weight : '';
                let reps = set.reps !== undefined ? set.reps : '';
                let time = set.time !== undefined ? set.time : '';

                setContainer.innerHTML = `
            <div class="setGroup">
                <div class="set">
                    <label for="set">Set ${setNum}:</label>
                </div>
                <div class="setItem">
                <input type="number" class="weight" name="weight" value="${weight}">
                <p>lbs</p>
            </div>
            <div class="setItem">
                <input type="number" class="reps" name="reps" min="1" value = ${reps}>
                <p>Reps</p>
            </div>
            <div class="setItem">
                <input type="number" class="time" name="time" value = ${time}>
                <p>Time</p>
            </div>
                <button type="button" class="deleteSet"><i class="fa-solid fa-square-minus"></i></button>
            </div>
        `;
                exerciseGroup.appendChild(setContainer);


            })

            restDiv = document.createElement('div');
            restDiv.className = 'rest';
            restLabel = document.createElement('label');
            restLabel.textContent = 'Rest Between Sets';
            restDiv.appendChild(restLabel);
            restInput = document.createElement('input');
            restInput.className = 'rest';
            restDiv.appendChild(restInput);
            exerciseGroup.appendChild(restDiv);

            deleteExercise = document.createElement('button');
            deleteExercise.className = 'deleteExercise';
            deleteExercise.type = 'button';
            deleteExercise.innerHTML = '<i class="fa-solid fa-minus"></i> Delete Exercise';
            exerciseGroup.appendChild(deleteExercise);

            editForm.appendChild(exerciseGroup);

        });

        // Clears all checkboxes before setting new ones
        const allCheckboxes = document.querySelectorAll('.exerciseScheduleEdit input[type="checkbox"]');
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.previousElementSibling.classList.remove('fa-solid');
            checkbox.previousElementSibling.classList.add('fa-regular');
        });




        const editWorkoutDiv = document.querySelector('.editWorkout');
        editWorkoutDiv.appendChild(editForm);

        const addButton = document.createElement('div');
        addButton.className = 'addButton';
        const addExercise = document.createElement('button');
        addExercise.type = 'button';
        addExercise.id = 'addExerciseEdit';
        addExercise.className = 'addExerciseStyle';
        addExercise.innerHTML = 'Add Exercise';
        addButton.appendChild(addExercise);
        editForm.appendChild(addButton);

        document.getElementById('addExerciseEdit').addEventListener('click', function () {
            const exercisesContainerEdit = document.getElementById('exercisesContainerEdit');
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
                    <button type="button" class="deleteExercise"><i class="fa-solid fa-minus"></i> Delete Exercise</button>
                </div>
            `;
            exercisesContainerEdit.append(newExercise);




        });

        const scheduleEdit = document.createElement('div');
        scheduleEdit.className = 'schedule';

        const scheduleButton = document.createElement('button');
        scheduleButton.id = 'showScheduleEdit';
        scheduleButton.type = 'button';
        scheduleButton.innerHTML = '<i class="fa-solid fa-calendar scheduleIcon"></i> Schedule Options';
        scheduleEdit.appendChild(scheduleButton);

        const selectedOptionsEdit = document.createElement('div');
        selectedOptionsEdit.id = 'selectedOptionsEdit';
        scheduleEdit.appendChild(selectedOptionsEdit);
        editForm.appendChild(scheduleEdit);


        scheduleButton.addEventListener('click', function () {
            var scheduleSelect2 = document.querySelector('.exerciseScheduleEdit');
            console.log(scheduleSelect2);
            if (scheduleSelect2) {
                if (scheduleSelect2.style.display === "none") {
                    scheduleSelect2.style.display = "block";


                } else {
                    scheduleSelect2.style.display = "none";
                }
            }
        });

        saveButton = document.createElement('button');
        saveButton.type = 'submit';
        saveButton.id = 'saveButtonEdit';
        saveButton.className = 'saveStyle';
        saveButton.innerHTML = 'Save Workout';
        editForm.appendChild(saveButton);

    }





    workout.weekDays.forEach(day => {
        const checkbox = document.querySelector(`.exerciseScheduleEdit input[type="checkbox"][value="${day}"]`);
        if (checkbox) {
            checkbox.checked = true;
            checkbox.previousElementSibling.classList.remove('fa-regular');
            checkbox.previousElementSibling.classList.add('fa-solid');
        }
        updateSelectedOptions();

    });

    function updateSelectedOptions() {
        var selectedOptionsDiv = document.getElementById('selectedOptionsEdit');
        var checkboxes = document.querySelectorAll('.exerciseScheduleEdit input[type="checkbox"]');
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


    document.querySelector('.closeSchedule2').addEventListener('click', function () {
        schedule = document.querySelector('.exerciseScheduleEdit');

        schedule.style.display = 'none';
    });


}


window.addEventListener('DOMContentLoaded', handleWorkoutsData);



