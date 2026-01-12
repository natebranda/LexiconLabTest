/**
 * @file This file is responsible for handling the operations of a
 *       simple verbal fluency test.
 * @description Manages receiving user inputted words, displaying category
 *       prompts and prime words, trial timers, recording and outputting data,
 *       and formatting trial stimuli.
 * @author Nathaniel Branda
 */

// GLOBAL variables:

// Saves user's input strings, as on_finish runs after
// the textarea's contents have been cleared.
current_input = "";

// Saves the start time of the current trial so that
// the start times of prime words can be assigned 
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
 * Modifies and places the current input recorded from
 * the textarea box as data into the given data object
 * for a jsPsych trial.
 * 
 * @param {object} data a jsPsych data object for a given trial
 */
function record_input_as_data(data) {
    //split and add them to a list unless they are empty strings
    data.words_list = current_input.split('\n').filter(Boolean);
    data.number_of_words = data.words_list.length;
}

/**
 * Clears current_input global variable and then
 * prepares textarea input box for more text by
 * giving it an event listener. 
 * 
 * @param {string} textarea_id the id of the input textarea element
 */
function prepare_for_new_input(textarea_id) {
    // reset input for new trial
    current_input = "";
    // record text as it is typed
    document.getElementById(textarea_id).addEventListener('input', (event) => {
        current_input = event.target.value;
    });
}

/**
 * This function creates a timer interval which updates the currently 
 * displayed prime word whenever the timer reaches the start time of
 * the next prime word. It also clears the interval when the trial finishes.
 * 
 * @param {Array} prime_words a list of prime word objects to iterate through
 * @param {string} prime_word_text the html text element used to show prime words
 * @param {number} trial_duration the duration of the current trial
 */
function display_prime_words_in_sequence(prime_words, prime_word_text, trial_duration) {
    // set up interval to check trial timer for prime words
    const timer_interval = setInterval(function() {
        // measures time in milliseconds since the trial started
        let current_time = performance.now() - current_trial_start_time;
        const next_prime_word = prime_words.at(-1);
        // modify start time to fit the actual millisecond timer
        next_appearance_time = next_prime_word.start_time * 1000;
        next_word = next_prime_word.word;
        
        // when we reach the start time of the next prime word:
        if (current_time >= next_appearance_time) {
            // display new word
            prime_word_text.innerHTML = next_word;
            //remove word after it has been displayed
            prime_words.pop();
        }
    }, 100);
    // ^^^ check runs every 0.1 seconds

    // Ensure that interval is cleared when trial finishes
    jsPsych.pluginAPI.setTimeout(function() {
        clearInterval(timer_interval);
    }, trial_duration);
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
            Prime Words will appear here
        </h3>

        <textarea id="input-box" rows="1" cols="100" autofocus></textarea>
        
        <p style="margin-bottom: 10px; text-align: center; font-size: 30px">
            The text box above is where you will type your responses.
            Type a word and press ENTER to submit it. 
        </p>

        <p style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Press ENTER to start. You will have 60 seconds to enter words for each category.
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
    choices: "NO_KEYS", 
    trial_duration: 60000, // 60 second trial

    on_load: function() {
        current_trial_start_time = performance.now();
        prepare_for_new_input('input_box');

        // mark duration of trial for later use
        const trial_duration = 60000;
        // Get prime word text element
        display_element = jsPsych.getDisplayElement();
        var prime_word_text = display_element.querySelector('#prime_word');

        // set up Prime Words Stack with start times (latest at top, earliest at bottom)
        const prime_words = [
            {word: "Trivial", start_time: 50},
            {word: "Vermin", start_time: 37},
            {word: "Atlas", start_time: 12},
            {word: "Arctic", start_time: 3}
        ];
        // !** Each listed object is the desired prime word
        // followed by the time in seconds (after the start
        // of the trial) at which the word should appear. **!
        // 
        // To make the Prime Word "blank" inbetween two others,
        // simply add "-" as a word between two prime words with
        // a start time of when you want the first word to dissappear.

        display_prime_words_in_sequence(prime_words, prime_word_text, trial_duration);
    },

    // record data from this trial
    on_finish: function(data) {
        record_input_as_data(data);
    }
};

var jobs = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h2 style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Category: Jobs
        </h2>
        <h3 id="prime_word" style="margin-bottom: 10px; text-align: center; color:blue; font-size: 30px">
            -
        </h3>
        <textarea id="input_box" rows="1" cols="100" autofocus></textarea>
    `,
    //key presses do not end the trial, only the timer
    choices: "NO_KEYS", 
    trial_duration: 60000, // 60 second trial

    on_load: function() {
        current_trial_start_time = performance.now();
        prepare_for_new_input('input_box');

        // mark duration of trial for later use
        const trial_duration = 60000;
        // Get prime word text element
        display_element = jsPsych.getDisplayElement();
        var prime_word_text = display_element.querySelector('#prime_word');

        // set up Prime Words Stack with start times (latest at top, earliest at bottom)
        const prime_words = [
            {word: "Trivial", start_time: 53},
            {word: "Dangerous", start_time: 47},
            {word: "Triple", start_time: 16},
            {word: "Medical", start_time: 9}
        ];
        display_prime_words_in_sequence(prime_words, prime_word_text, trial_duration);
    },

    // record data from this trial
    on_finish: function(data) {
        record_input_as_data(data);
    }
};

var colors = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h2 style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Category: Colors
        </h2>
        <h3 id="prime_word" style="margin-bottom: 10px; text-align: center; color:blue; font-size: 30px">
            -
        </h3>
        <textarea id="input_box" rows="1" cols="100" autofocus></textarea>
    `,
    //key presses do not end the trial, only the timer
    choices: "NO_KEYS", 
    trial_duration: 60000, // 60 second trial

    on_load: function() {
        current_trial_start_time = performance.now();
        prepare_for_new_input('input_box');

        // mark duration of trial for later use
        const trial_duration = 60000;
        // Get prime word text element
        display_element = jsPsych.getDisplayElement();
        var prime_word_text = display_element.querySelector('#prime_word');

        // set up Prime Words Stack with start times (latest at top, earliest at bottom)
        const prime_words = [
            {word: "Dark", start_time: 53},
            {word: "-", start_time: 43},
            {word: "Music", start_time: 27},
            {word: "-", start_time: 13},
            {word: "Valuable", start_time: 3}
        ];
        display_prime_words_in_sequence(prime_words, prime_word_text, trial_duration);
    },

    // record data from this trial
    on_finish: function(data) {
        record_input_as_data(data);
    }
};

var sports = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h2 style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Category: Sports
        </h2>
        <h3 id="prime_word" style="margin-bottom: 10px; text-align: center; color:blue; font-size: 30px">
            -
        </h3>
        <textarea id="input_box" rows="1" cols="100" autofocus></textarea>
    `,
    //key presses do not end the trial, only the timer
    choices: "NO_KEYS", 
    trial_duration: 60000, // 60 second trial

    on_load: function() {
        current_trial_start_time = performance.now();
        prepare_for_new_input('input_box');

        // mark duration of trial for later use
        const trial_duration = 60000;
        // Get prime word text element
        display_element = jsPsych.getDisplayElement();
        var prime_word_text = display_element.querySelector('#prime_word');

        // set up Prime Words Stack with start times (latest at top, earliest at bottom)
        const prime_words = [
            {word: "-", start_time: 58},
            {word: "Carcass", start_time: 50},
            {word: "-", start_time: 40},
            {word: "Ball", start_time: 25},
            {word: "Smile", start_time: 10},
            {word: "Stick", start_time: 5}
        ];
        display_prime_words_in_sequence(prime_words, prime_word_text, trial_duration);
    },

    // record data from this trial
    on_finish: function(data) {
        record_input_as_data(data);
    }
};

//All trials in the experiment are run in sequence from the timeline list
const timeline = [tutorial, animals, jobs, colors, sports];
jsPsych.run(timeline);
