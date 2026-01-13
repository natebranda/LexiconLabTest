/**
 * @file This file is responsible for handling the operations of a
 *       simple verbal fluency test.
 * @description Manages receiving user inputted words, displaying category
 *       prompts and prime words, trial timers, recording and outputting data,
 *       and formatting trial stimuli.
 * @author Nathaniel Branda
 */

// GLOBAL variables:

// Saves the start time of the current trial so that
// the subit times of words can be assigned 
// relative to when their specific trial starts. 
current_trial_start_time = performance.now();

// initialize jsPsych library and object
const jsPsych = initJsPsych({
    on_finish: function() {
        // output all recorded data when all trials complete
        jsPsych.data.displayData()
    }
});

/**
 * Prepares textarea input box for more text and 
 * for submitting words with enter by giving it 
 * an event listener. Moreover, it initializes 
 * the desired data objects for the current trial.
 * 
 * @param {string} textarea_id The object id of the textarea element
 * @param {Object[]} words_list A list of objects composed of user submitted
 * words and the time they were submitted relative to the start of the trial.
 */
function prepare_new_trial(textarea_id, words_list) {
    // get contents of input box
    input_box = document.getElementById(textarea_id);
    // record text as it is typed
    input_box.addEventListener('keydown', (event) => {
        // Check if the key pressed is the 'Enter' key
        if (event.key === 'Enter') {
            // Prevent the default function of Enter key press
            event.preventDefault();
            //get string contents of input
            contents = input_box.value;

            //if the input is not empty
            if (contents != "") {
                //else, get time since start of trial
                current_time = performance.now() - current_trial_start_time;
                //add submitted word to data
                words_list.push({word: contents, time: current_time});
                //clear input box text
                input_box.value = "";
            }
        } 
    });
}

/// /// /// /// /// /// /// /// /// /// TRIALS /// /// /// /// /// /// /// /// /// ///

// this trial shows the general display and teaches the user how to submit words
var tutorial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h2 style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Category Words will appear here
        </h2>

        <h3 style="margin-bottom: 10px; text-align: center; color:blue; font-size: 30px">
            Prime Words will appear here. You will not be able to type when they are on screen.
        </h3>

        <textarea id="input-box" rows="1" cols="100" autofocus></textarea>
        
        <p style="margin-bottom: 10px; text-align: center; font-size: 30px">
            The text box above is where you will type your responses.
            Type a word and press ENTER to submit it. 
        </p>

        <p style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Press ENTER to start. You will have 60 seconds to submit words for each category.
        </p>
    `,
    choices: ['Enter']
};

var animals = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h2 style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Category: Animals
        </h2>
        <h3 id="prime_word" style="margin-bottom: 10px; text-align: center; color:blue; font-size: 30px">
            -
        </h3>
        <textarea id="input_box" rows="1" cols="100" autofocus></textarea>
    `,
    //key presses do not end the trial, only the timer
    choices: ['0'], //"NO_KEYS", ////////////////////////////////////////////////////////////////////////////////////////////////
    trial_duration: 60000, // 60 second trial

    on_load: function() {
        // set start time
        current_trial_start_time = performance.now();
        //declare temporary holder for submitted words
        words_list = [];
        prepare_new_trial('input_box', words_list);

        // mark duration of trial for later use
        //const trial_duration = 60000;         
        // Get prime word element
        //display_element = jsPsych.getDisplayElement();
        //var prime_word_text = display_element.querySelector('#prime_word');

        // set up Prime Words Stack
        //const prime_words = [];
    },

    on_finish: function(data) {
        data.words_list = words_list;
        data.number_of_words = words_list.length;
    }
};

//All trials in the experiment are run in sequence from the timeline list
const timeline = [tutorial, animals];
jsPsych.run(timeline);