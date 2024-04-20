//week.js

window.addEventListener('DOMContentLoaded', function () {
    var workoutData = localStorage.getItem('workoutData');
    var workout = JSON.parse(workoutData);

    console.log("Workout object in week.js:", workout);

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

                // Create and append workout name to workoutDiv
                const workoutName = document.createElement('h1');
                workoutName.textContent = workout.name;
                workoutDiv.appendChild(workoutName);

                const expandButton = document.createElement('button');
                expandButton.className = 'expandButton';
                expandButton.textContent = '+'
                workoutDiv.appendChild(expandButton);

                const moreInfo = document.createElement('div');
                moreInfo.className = 'moreInfo';
                moreInfo.style.display = 'none';

                workout.exercises.forEach(exercise => {
                    const exerciseName = document.createElement('p');
                    exerciseName.textContent = exercise.name;
                    moreInfo.appendChild(exerciseName);
                    var setCount = 1;
                    exercise.sets.forEach(set => {
                        const setDetails = document.createElement('p');
                        let setString = `Set: ${setCount} `;

                        //checks if weight, reps, and time values are defined
                        if (set.weight !== undefined) {
                            setString += `Weight: ${set.weight}, `;
                        }

                        
                        if (set.reps !== undefined) {
                            setString += `Reps: ${set.reps}, `;
                        }

                        
                        if (set.time !== undefined) {
                            setString += `Time: ${set.time}, `;
                        }

                        // Remove trailing comma and space
                        setString = setString.replace(/,\s*$/, '');

                        setDetails.textContent = setString;
                        moreInfo.appendChild(setDetails);
                        setCount++;
                    });

                    if (exercise.rest !== undefined) {
                        const rest = document.createElement('p');
                        rest.textContent = "Rest Between Sets: " + exercise.rest;
                        moreInfo.appendChild(rest);
                    }

                });
                dayDiv.appendChild(workoutDiv);
                dayDiv.appendChild(moreInfo);
            }
        });

    }

    populateWeek(workout);

    
});

document.querySelectorAll('.expandButton').addEventListener('click', function() {
    var scheduleSelect = document.querySelector('.moreInfo');
    if (scheduleSelect.style.display == "none") {
        scheduleSelect.style.display = "block";
    } else {
        scheduleSelect.style.display = "none";
    }
});






