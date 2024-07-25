var EditWorkoutModule = EditWorkoutModule || {};

EditWorkoutModule.editWorkout = function (workoutId) {
    var workoutsData = localStorage.getItem('workoutsData');
    var workouts = JSON.parse(workoutsData);

    // Find the workout to edit
    var workout = workouts.find(w => w.id === workoutId);


    if (workout) {

        // Clear any existing content in the editWorkout div
        document.querySelector('.editWorkout').innerHTML = '';

        const editDiv = document.createElement('div');

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

        editDiv.appendChild(exercisesContainerEdit);

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

            const deleteExerciseButton = exerciseGroup.querySelector('.deleteExercise');
            console.log(deleteExerciseButton);
            if (deleteExerciseButton) {
                deleteExerciseButton.addEventListener('click', function () {
                    console.log('deleteExerciseButton clicked');
                    exerciseGroup.remove();
                });

            }


            editDiv.appendChild(exerciseGroup);

        });





        // Clears all checkboxes before setting new ones
        // const allCheckboxes = document.querySelectorAll('.exerciseScheduleEdit input[type="checkbox"]');
        // allCheckboxes.forEach(checkbox => {
        //     checkbox.checked = false;
        //     checkbox.previousElementSibling.classList.remove('fa-solid');
        //     checkbox.previousElementSibling.classList.add('fa-regular');
        // });




        const editWorkoutDiv = document.querySelector('.editWorkout');
        editWorkoutDiv.appendChild(editDiv);

        const addButton = document.createElement('div');
        addButton.className = 'addButton';
        const addExercise = document.createElement('button');
        addExercise.type = 'button';
        addExercise.id = 'addExerciseEdit';
        addExercise.className = 'addExerciseStyle';
        addExercise.innerHTML = 'Add Exercise';
        addButton.appendChild(addExercise);
        editDiv.appendChild(addButton);

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

            const deleteExerciseButton = newExercise.querySelector('.deleteExercise');
            if (deleteExerciseButton) {
                deleteExerciseButton.addEventListener('click', function () {
                    newExercise.remove();
                });
            }


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
        editDiv.appendChild(scheduleEdit);


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
        saveButton.type = 'button';
        saveButton.id = 'saveButtonEdit';
        saveButton.className = 'saveStyle';
        saveButton.innerHTML = 'Edit Workout';
        editDiv.appendChild(saveButton);


        saveButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevents the default form submission behavior

            let hasErrors = false;

            var workoutNameInput = document.querySelector('.editWorkout .workoutName input');

            // Check if workoutNameInput is empty
            if (!workoutNameInput.value.trim()) {
                alert('Please enter a name for the workout.');
                hasErrors = true;
            }

            var workoutsEdit = {};
            workoutsEdit.id = workoutId;
            workoutsEdit.name = workoutNameInput.value;

            workoutsEdit.exercises = [];
            document.querySelectorAll('.exerciseGroup').forEach(exerciseGroup => {

                var exercise = {};


                exercise.name = exerciseGroup.querySelector('.exercise').value;

                // Check if an exerciseName is empty
                if(!exercise.name.trim()) {
                    alert('Please enter a name for all exercises');
                    hasErrors = true;
                }

                exercise.sets = [];
                exerciseGroup.querySelectorAll('.setContainer').forEach(setContainer => {
                    var set = {};
                    const weightInput = setContainer.querySelector('.weight').value;
                    if (weightInput) {
                        set.weight = weightInput;
                    }
                    const repsInput = setContainer.querySelector('.reps').value;
                    if (repsInput) {
                        set.reps = repsInput;
                    }

                    const timeInput = setContainer.querySelector('.time').value;
                    if (timeInput) {
                        set.time = timeInput
                    }
                    exercise.sets.push(set);

                });
                const restInput = exerciseGroup.querySelector('.rest input').value;
                if (restInput) {
                    exercise.rest = restInput;
                }



                workoutsEdit.exercises.push(exercise);


            });
            // prevents submission if workout or exericise name is empty
            if(hasErrors) {
                return;
            }

            var weekDays = [];

            var selectedDates = document.querySelectorAll('.exerciseScheduleEdit input[type="checkbox"]');

            selectedDates.forEach(function (checkbox) {
                if (checkbox.checked) {
                    console.log('selectedWeekDay: ', checkbox.value);
                    weekDays.push(checkbox.value);
                }
            });


            workoutsEdit.weekDays = weekDays;

            const existingWorkoutIndex = workouts.findIndex(workout => workout.id === workoutsEdit.id);

            console.log('existing workout index', existingWorkoutIndex);

            if (existingWorkoutIndex !== -1) {
                workouts[existingWorkoutIndex] = workoutsEdit;
            }

            localStorage.setItem('workoutsData', JSON.stringify(workouts));

            console.log('Updated workouts info:', workouts);

            const editDiv = document.querySelector('.editDiv');
            editDiv.style.display = 'none';



            var blurredBackground = document.querySelector('.blurredBackground');
            blurredBackground.style.display = "none";
            console.log('blurredBackground: ', blurredBackground);
            var scheduleSelect = document.querySelector('.exerciseSchedule');
            scheduleSelect.classList.remove('show');
            setTimeout(() => {
                scheduleSelect.style.display = 'none';
            }, 300); // Matches the duration of the CSS transition

            handleWorkoutsData();

        });

        workout.weekDays.forEach(day => {
            const checkbox = document.querySelector(`.exerciseScheduleEdit input[type="checkbox"][value="${day}"]`);
            if (checkbox) {
                checkbox.checked = true;
                checkbox.previousElementSibling.classList.remove('fa-regular');
                checkbox.previousElementSibling.classList.add('fa-solid');
            }
            updateSelectedOptions();

        });


    }







    document.querySelector('.closeSchedule2').addEventListener('click', function () {
        schedule = document.querySelector('.exerciseScheduleEdit');

        schedule.style.display = 'none';
    });






}

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
    console.log('updateselectedoptions called');
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



