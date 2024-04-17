document.getElementById('workout-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var workout = {};

    workout.name = document.getElementById('workoutName').value;
    console.log("Workout Name:", workout.name)

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
                console.log("Rest Input Value:", restInput.value);
            }

            var weekDays = [];
            var selectedDates = document.querySelectorAll('.exerciseSchedule input[type="checkbox"]');
            console.log("Number of checkboxes found:", selectedDates.length); 

            selectedDates.forEach(function (checkbox) {
                if (checkbox.checked) {
                    console.log("Checkbox value:", checkbox.value);
                    weekDays.push(checkbox.value);
                }
            });

            exercise.weekDays = weekDays;

            if (sets.length > 0) {
                workout.exercises.push(exercise);
            }
        }
    });
    console.log("Complete Workout Object:", workout);
});



document.getElementById('add-exercise').addEventListener('click', function () {
    const exercisesContainer = document.getElementById('exercises-container');
    const newExercise = document.createElement('div');
    newExercise.classList.add('exercise');
    newExercise.innerHTML = `
        <div class="exerciseName">
                <input type="text" class="exercise" name="exercise" placeholder="Exercise Name" required>
            </div>

            <button type="button" class="add-set">Add Set</button>
            <div class="set-container"></div>
            <div class="rest">
                <label for="rest">Rest Between Sets</label>
                <input type="number" class="rest" name="rest">
            </div>
            <div class="break"></div>
    `;
    exercisesContainer.appendChild(newExercise);

    let setNum = 1;

    newExercise.querySelector('.add-set').addEventListener('click', function () {
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
    </div>
`;
        setContainer.appendChild(newSet);
        setNum++;
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






console.log("Element with class 'exerciseSchedule':", document.querySelector('.exerciseSchedule'));


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
    console.log("toggleCheckbox function called");
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
