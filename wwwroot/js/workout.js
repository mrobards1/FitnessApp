document.getElementById('workout-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var workout = {};

    workout.name = document.getElementById('workoutName').value;
    console.log("Workout Name:", workout.name)


    var exerciseContainers = document.querySelectorAll('.exercise');
    workout.exercises = [];

    
    exerciseContainers.forEach(function(exerciseContainer) {
        var exercise = {};
        var exerciseNameInput = exerciseContainer.querySelector('.exerciseName input');
        if (exerciseNameInput) {
            exercise.name = exerciseNameInput.value;
            console.log("Exercise Name: ", exercise.name);
        }

        var sets = [];
        var setcontainers = exerciseContainer.querySelectorAll('.set');

        setcontainers.forEach(function(setcontainer, index) {
            var set = {};
            set.weight = setcontainer.querySelector('.weight').value;
            set.reps = setcontainer.querySelector('.reps').value;
            set.time = setcontainer.querySelector('.time').value;

            sets.push(set);
        }); 
        console.log("Sets for Exercise", exercise.name + ":", sets);
    });

    workout.exercises.push(exercise);
    console.log("Exercises:", workout.exercises);
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
            <div class="exerciseSchedule" style="display:none">
                <p class="scheduleTitle">Schedule For</p>
                <div class="weekday">
                    <label>
                        <i class="fa-regular fa-square"></i>
                        <input type="checkbox" value="0" onchange="toggleCheckbox(this)" style="display:none">
                        Sunday
                    </label>
                </div>
                <div class="lineBreak"></div>
                <div class="weekday">
                    <label>
                        <i class="fa-regular fa-square"></i>
                        <input type="checkbox" value="1" onchange="toggleCheckbox(this)" style="display:none">
                        Monday
                    </label>
                </div>
                <div class="lineBreak"></div>
                <div class="weekday">
                    <label>
                        <i class="fa-regular fa-square"></i>
                        <input type="checkbox" value="2" onchange="toggleCheckbox(this)" style="display:none">
                        Tuesday
                    </label>
                </div>
                <div class="lineBreak"></div>
                <div class="weekday">
                    <label>
                        <i class="fa-regular fa-square"></i>
                        <input type="checkbox" value="3" onchange="toggleCheckbox(this)" style="display:none">
                        Wednesday
                    </label>
                </div>
                <div class="lineBreak"></div>
                <div class="weekday">
                    <label>
                        <i class="fa-regular fa-square"></i>
                        <input type="checkbox" value="4" onchange="toggleCheckbox(this)" style="display:none">
                        Thursday
                    </label>
                </div>
                <div class="lineBreak"></div>
                <div class="weekday">
                    <label>
                        <i class="fa-regular fa-square"></i>
                        <input type="checkbox" value="5" onchange="toggleCheckbox(this)" style="display:none">
                        Friday
                    </label>
                </div>
                <div class="lineBreak"></div>
                <div class="weekday">
                    <label>
                        <i class="fa-regular fa-square"></i>
                        <input type="checkbox" value="6" onchange="toggleCheckbox(this)" style="display:none">
                        Saturday
                    </label>
                </div>


                <button id="closeSchedule">Hide Schedule Options</button>

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
    var scheduleSelect = document.getElementById('exerciseSchedule');
    if (scheduleSelect.style.display == "none") {
        scheduleSelect.style.display = "block";
    } else {
        scheduleSelect.style.display = "none";
    }
});

document.getElementById('closeSchedule').addEventListener('click', function () {
    var scheduleSelect = document.getElementById('exerciseSchedule');
    scheduleSelect.style.display = "none";
})

document.getElementById('exerciseSchedule').addEventListener('click', function (event) {
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
