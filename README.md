# Verbal Fluency Test

## Program Overview
This program opens an index.html file in any browser and runs a simple jsPsych experiment based on the verbal
fluency test. It includes category words, prime words that briefly appear and then dissappear, one timed
trial, and one tutorial page that outlines how to use the program. 
The program receives input from a user via an HTML textarea object and logs their responses alongside the
time at which that word was submitted (calculated relative to when the current trial started.) Every 
3 to 7 words, a prime word meant to suggest a prompt to the user briefly appears and suspends use of 
the input box before dissappearing. To analyze how it affected the user's responses, the time the prompt
appeared and dissappeared is also recorded.
The program uses the jsPsych library to place time limits on trials and records all collected data in
the .data field of a given trial. This data, grouped by trial and data field, is displayed after all trials
have completed using a jsPsych method. 

## Running the Program
To run the program, start by cloning the repository to you device. The easiest way to do this is to open the
repository, open the green "<> code" menu, and then select the "Download Zip" option. After you unzip the 
downloaded project folder, double click the "LexLabTestHTML.html" file inside that folder and the program will
open in your default browser.

## Code Organization
I organized my code with the primary aim of making the on_load function of a given trial as sparse and high level as
possible to streamline the addition of more trials in the future. I wanted the on_load function to mainly contain
the prime_words list for a given trial so it would be obvious and quickly editable, so I put most of the
initialization code in the prepare_new_trial function. 
In prepare_new_trial, I continued this pattern of deferral with submit_word and finally with handle_prime_word_appearance
to clearly separate these operations from one another. While there are many arguments passed down through the latter two
functions, I feel this choice is justified given that it ends up simplifying calls to prepare_new_trial, which will have
to be called much more often as it should be used in every trial outside of the tutorial. 

## Reflection
If I had more time to dedicate to this project, I would add a more exhaustive list of prime words for the animal category trial.
While I added more prime words than I could get through by entering a deluge of nonsense responses until the prime word appeared
and then copying it into the prompt, it would be safer to have over one hundred words so that there would be a very low chance of
running out of prime words to present. This would be most elegantly implemented by connecting an external file containing many
prime words for each trial to the javascript code rather than simply typing the prompts into the trial code itself. 
However, I expended so much time learning Javascript and the jsPsych library in general that I felt it was better to simply move on
and finish the project. This is mainly because I spent a good deal of time on a simpler implementation of the project thinking that
I may not be able to approach the intended implementation in the first place. However, I found this simplified implementaion very
helpful in learning javascript and the jsPsych library tools that allowed me to implement the final iteration of the project, so
I am glad I took this approach.
