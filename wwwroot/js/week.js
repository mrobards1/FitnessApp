//week.js

window.addEventListener('DOMContentLoaded', function () {
    var workoutsData = localStorage.getItem('workoutsData');
    var workouts = JSON.parse(workoutsData);

    console.log("All Workouts in week.js:", workouts);

    workouts.forEach(function (workout) {
        populateWeek(workout);
    });

    function populateWeek(workout) {
        const dayNames = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

        console.log("Workout name:", workout.name);

        // Loop through each day of the week
        workout.weekDays.forEach(day => {
            const dayName = dayNames[parseInt(day) - 1]; // Convert numerical day to day name
            console.log("dayname:", dayName);
            const dayDiv = document.querySelector(`.weekday.${dayName}`);
            if (dayDiv) {
                const workoutDiv = document.createElement('div');
                workoutDiv.className = 'workoutDiv';

                const workoutName = document.createElement('h1');
                workoutName.textContent = workout.name;
                workoutName.className = 'workoutTitle';
                workoutDiv.appendChild(workoutName);


                const exerciseCount = document.createElement('p');
                exerciseCount.textContent = `Exercises: ${workout.exercises.length}`;
                exerciseCount.className = 'exerciseCount';
                workoutDiv.appendChild(exerciseCount);

                const moreInfo = document.createElement('div');
                moreInfo.className = 'moreInfo';
                moreInfo.style.display = 'none';

                workout.exercises.forEach(exercise => {

                    const exerciseDiv = document.createElement('div');
                    exerciseDiv.className = "exerciseDiv";

                    const exerciseName = document.createElement('p');
                    exerciseName.className = "exerciseName"
                    exerciseName.textContent = exercise.name;
                    exerciseDiv.appendChild(exerciseName);


                    var setCount = 1;
                    exercise.sets.forEach(set => {
                        const setContainer = document.createElement('div');
                        setContainer.className = "setContainer";

                        const setNum = document.createElement('div');
                        setNum.className = "setName";

                        const setString = document.createElement('p');
                        setString.textContent = `Set: ${setCount} `;
                        setNum.appendChild(setString);

                        setContainer.appendChild(setNum);

                        const setVals = document.createElement('div');
                        setVals.className = "setVals";

                        const setValString = document.createElement('p');

                        let valString = "";

                        //checks if weight, reps, and time values are defined
                        if (set.weight !== undefined) {
                            valString += `W: ${set.weight} `;
                        }

                        if (set.reps !== undefined) {
                            valString += `R: ${set.reps} `;
                        }

                        if (set.time !== undefined) {
                            valString += `T: ${set.time} `;
                        }

                        // Remove trailing comma and space
                        valString = valString.replace(/,\s*$/, '');

                        setValString.textContent = valString;
                        setVals.appendChild(setValString);
                        setContainer.appendChild(setVals);
                        exerciseDiv.appendChild(setContainer);

                        setCount++;
                    });

                    if (exercise.rest !== undefined) {
                        const rest = document.createElement('p');
                        rest.textContent = "Rest Between Sets: " + exercise.rest;
                        exerciseDiv.appendChild(rest);
                    }

                    moreInfo.appendChild(exerciseDiv);
                });



                dayDiv.appendChild(workoutDiv);
                workoutDiv.appendChild(moreInfo);

                const expandButton = document.createElement('button');
                expandButton.className = 'expandButton';
                expandButton.textContent = 'View Workout';
                workoutDiv.appendChild(expandButton);

                expandButton.addEventListener('click', function () {
                    if (moreInfo.style.display === "none") {
                        moreInfo.style.display = "block";
                        exerciseCount.style.display = "none";
                        expandButton.textContent = "Minimize View";
                        const moreInfoHeight = moreInfo.scrollHeight;
                        const newHeight = moreInfoHeight + 100;

                        // Set the minHeight of workoutDiv
                        workoutDiv.style.minHeight = `${newHeight}px`;

                    } else {
                        moreInfo.style.display = "none";
                        exerciseCount.style.display = "block";
                        expandButton.textContent = "View Workout";
                        workoutDiv.style.minHeight = "";

                    }



                });
            }
        });
    }
});
