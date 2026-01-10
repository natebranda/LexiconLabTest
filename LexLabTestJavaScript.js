// This will display an alert box in the browser
alert("Welcome to the page!");

// GLOBAL variable that saves user's input strings, as on_finish runs after
// the textarea's contents have been cleared.
current_input = "";

// initialize library and jsPsych object
const jsPsych = initJsPsych({
    on_finish: function() {
        // output all recorded data when all trials complete
        jsPsych.data.displayData()
    }
});

// this trial shows the general display and teaches the user how to submit words
var tutorial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1 style="margin-bottom: 90px; text-align: center; font-size: 60px">
            Verbal Fluency Test
        </h1>

        <h2 style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Category Words will appear here
        </h2>

        <h3 style="margin-bottom: 10px; text-align: center; color:blue; font-size: 30px">
            Prime Words will appear here
        </h3>

        <textarea id="input-box" rows="1" cols="100" autofocus></textarea>
        
        <p style="margin-bottom: 10px; text-align: center; font-size: 30px">
            The text box above is where you will type your responses.
            Type a word and press ENTER to submit it. 
        </p>

        <p style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Press ENTER to start
        </p>
    `,
    choices: ['Enter']
};

var animals = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1 style="margin-bottom: 90px; text-align: center; font-size: 60px">
            Verbal Fluency Test
        </h1>

        <h2 style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Category: Animals
        </h2>

        <h3 id="prime_word" style="margin-bottom: 10px; text-align: center; color:blue; font-size: 30px">
            -
        </h3>

        <textarea id="input_box" rows="1" cols="100" autofocus></textarea>
    `,
    //key presses do not end the trial, only the timer
    choices: '0', //should be "NO_KEYS" ///////////////////////////////////////////////////////////////////////////////////////////////////

    on_load: function() {
        // reset input for new trial
        current_input = "";
        // record text as it is typed
        document.getElementById('input_box').addEventListener('input', (event) => {
            current_input = event.target.value;
        });
    },

    // record data from this trial
    on_finish: function(data) {
        //split and add them to a list unless they are empty strings
        data.words_list = current_input.split('\n').filter(Boolean);
        data.number_of_words = data.words_list.length;
    }
};

const timeline = [tutorial, animals];
jsPsych.run(timeline);