/**
 * @file This file is responsible for handling the operations of a
 *       simple verbal fluency test.
 * @description Manages receiving user inputted words, displaying category
 *       prompts and prime words, trial timers, recording and outputting data,
 *       and formatting trial stimuli.
 * @author Nathaniel Branda
 */

// initialize jsPsych library and object
const jsPsych = initJsPsych({
    on_finish: function() {
        // output all recorded data when all trials complete
        jsPsych.data.displayData()
    }
});

/**
 * This function adds the contents of the input box
 * and the time they were submitted to the words list.
 * It then clears the input box to make way for further
 * input.
 * This function also checks to see if it is time to make
 * a prime word appear and calls the function to make it appear
 * if so. Moreover, it handles removing prime words that the 
 * user has already submitted. 
 * 
 * @param {HTMLElement} input_box The textarea box the user
 * types and submits answers in.
 * @param {Object[]} words_list The list of all words submitted
 * in this trial.
 * @param {string} prime_word_id The object id of the prime word text element.
 * @param {string[]} prime_words The list of all prime words in this trial
 * @param {number} start_time The running time at which this trial started.
 * @param {number} responses_until_prime_word The number of responses left 
 * before a prime word appears.
 */
function submit_word(input_box, words_list, prime_word_id, prime_words, 
    start_time, responses_until_prime_word) {
    //get string contents of inputs
    contents = input_box.value;

    //if the input is not empty
    if (contents != "") {
        //mark that a response has occurred.
        responses_until_prime_word--;
        //get time since start of trial
        current_time = performance.now() - start_time;
        //add submitted word to data
        words_list.push({word: contents, time: current_time});
        //clear input box text
        input_box.value = "";

        // Put contents in format of strings in prime words list
        mod_contents = contents.trim().toUpperCase();
        // check for submitted word in list of prime words
        const index = prime_words.indexOf(mod_contents);
        if (index > -1) {
            // delete it if found
            prime_words.splice(index, 1);
        }

        // If it is time for a prime word to appear AND if unguessed prime words remain
        if ((responses_until_prime_word == 0) && (prime_words.length > 0)) {

            // get prime word HTML text elements
            display_element = jsPsych.getDisplayElement();
            var prime_word_text = display_element.querySelector(prime_word_id);

            //get random remaining prime word
            random_prime_word = prime_words[Math.floor(Math.random() * prime_words.length)];
            // display word
            prime_word_text.innerHTML = random_prime_word;
            // disable ability to type in input box
            input_box.disabled = true;

            // wait 500 milliseconds
            setTimeout(() => {
                //then, remove prime word by setting it to empty string
                prime_word_text.innerHTML = "";
                //reactivate input box
                input_box.disabled = false;
            }, 500)

            // 1. if a prime word was displayed, reset responses_until_prime_word
            // and then pass it to the event handler in the parent function.
            return Math.floor((Math.random() * 4) + 3);
        } else {
            // 2. if a prime word wasn't displayed, decrement before
            // passing it back to to the event handler.
            return responses_until_prime_word--;
        }
    } else {
        // 3. if a blank string was submitted, return it unchanged
        return responses_until_prime_word;
    }
}

/**
 * Prepares textarea input box for submitting words
 * with the Enter key by adding an event listener to it.
 * 
 * @param {string} input_box_id The object id of the textarea element.
 * @param {Object[]} words_list A list of objects composed of user submitted
 * words and the time they were submitted relative to the start of the trial.
 * @param {string} prime_word_id The object id of the prime word text element.
 * @param {string[]} prime_words A list of prime words for the current trial.
 * @param {number} start_time The running time at which this trial started.
 * @param {number} responses_until_prime_word The number of responses left 
 * before a prime word appears.
 */
function prepare_new_trial(input_box_id, words_list, prime_word_id, prime_words,
    start_time, responses_until_prime_word) {
    // get contents of input box
    input_box = document.getElementById(input_box_id);
    // record text as it is typed
    input_box.addEventListener('keydown', (event) => {
        // check if the key pressed is the 'Enter' key
        if (event.key === 'Enter') {
            // prevent the default function of Enter key press
            event.preventDefault();
            // submit contents to words list and get modified value of 
            // responses_until_prime word with submit_word
            responses_until_prime_word = submit_word(input_box, words_list, 
                prime_word_id, prime_words, start_time, responses_until_prime_word);
        } 
    });
}

/// /// /// /// /// /// /// /// /// /// TRIALS /// /// /// /// /// /// /// /// /// ///

// this trial shows the general display and teaches the user how to submit words
var tutorial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h2 style="margin-bottom: 10px; text-align: center; font-size: 40px">
            Category Words will appear here.
        </h2>

        <h3 style="margin-bottom: 10px; text-align: center; color:blue; font-size: 30px">
            Prime Words will appear here. <br> 
            You will not be able to type when they are on screen. <br>
            Remember: you will need to click the text box again to continue typing after a prime
            word appears. 
        </h3>

        <textarea id="input-box" rows="1" cols="100" autofocus></textarea>
        
        <p style="margin-bottom: 10px; text-align: center; font-size: 30px">
            The text box immediately above is where you will type single word responses to 
            the aformentioned Category Words. <br>
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
            Category: ANIMALS
        </h2>
        <h3 id="prime_word" style="margin-bottom: 10px; text-align: center; color:blue; font-size: 30px">
            
        </h3>
        <textarea id="input_box" rows="1" cols="100" autofocus></textarea>
    `,
    //key presses do not end the trial, only the timer
    choices: ["NO_KEYS"], 
    trial_duration: 60000, // 60 second trial

    on_load: function() {
        // record start time of trial
        let trial_start_time = performance.now();
        // Tracks how many responses are left until the next prime word should
        // be displayed. It is initially set, and always reset, to a random
        // integer between 3 and 7 (inclusive).
        let responses_until_prime_word = Math.floor((Math.random() * 4) + 3);
        //declare temporary holder for submitted words
        words_list = [];

        // set up Prime Words list 
        // (NOTE: for a full version I would include a more exhaustive list)
        const prime_words = [
            "WALRUS",
            "ALLIGATOR",
            "CROCODILE",
            "BEAVER",
            "HORSE",
            "SPIDER",
            "DOG",
            "CAT",
            "PELICAN",
            "SEAGULL",
            "EAGLE",
            "MOUSE"
        ];

        prepare_new_trial('input_box', words_list, '#prime_word', prime_words, trial_start_time,
            responses_until_prime_word);
    },

    on_finish: function(data) {
        data.words_list = words_list;
        data.number_of_words = words_list.length;
    }
};

//All trials in the experiment are run in sequence from the timeline list
const timeline = [tutorial, animals];
jsPsych.run(timeline);
