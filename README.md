# Verbal Fluency Test

## Program Overview
This program opens an index.html file in any browser that runs a simple jsPsych experiment based on the verbal
fluency test. It includes category words, prime words that briefly appear and then dissappear, one timed
trial, and one tutorial page that outlines how to use the program. 
The program receives input from a user via an HTML textarea object and logs their responses alongside the
time at which that word was submitted (calculated relative to when the current trial started.) Every 
3 to 7 words, a prime word meant to suggest a prompt to the user briefly appears and suspends use of 
the input box before dissappearing. To analyze how it affected the users responses, the time the prompt
appeared and dissappeared is recorded as data and presented alongside the data from user submitted words.
The program uses the jsPsych library to place time limits on trials and records all collected data in
the .data field of the trial. This data, grouped by trial and data field, is displayed after all trials
have completed using a jsPsych method. 

## Running the Program
To run the program, start by cloning the repository to you device. The easiest way to do this is to open the
repository, open the green "<> code" menu, and then select the "Download Zip" option. After you unzip the 
downloaded project folder, select the "LexLabTestHTML.html" file inside that folder and the program will
open in your default browser.

## Code Organization
I organized my code to make the code inside of the individual trial as sparse and high level as possible
to streamline the addition of more trials in the future. I wanted the on_load function to mainly contain
the prime words list for a given trial so it would be obvious and quickly editable, so I put most of the
initialization code in the prepare_new_trial function. 
In prepare_new_trial, I continued this pattern of deferral with submit_word and finally with handle_prime_word_appearance
to clearly separate these operations from one another even though they directly trigger eachother. While there are many
arguments passed down through the latter two functions, I feel this choice is justified given that it ends up simplifying
calls to prepare_new_trial, which will have to be used much more often as it should be called in every trial. 

## Reflection
If I had more time to dedicate to this project, I would try to figure out a way to add a far more exhaustive list of
prime words for the animal category trial. While I added more words than I could get through by entering nonsense until
the prime word appeared and then copying it into the prompt, it would be safer to have over one hundred words so that there
would be a very low chance of running out of prime words to present. This would be most elegantly implemented by connecting
some external file containing many prime words for each trial to the javascript code rather than simply typing the prompts
into the trial code itself. However, I expended so much time learning Javascript and the jsPsych library in general that
I felt it was better to move on and finish the project. This is mainly because I spent a good deal of time on a simpler 
implementation of the project thinking that I may not be able to approach the intended implementation in the first place. 
However, I found this very helpful in learning how to use javascript and the jsPsych tools that allowed me to implement
this final project, so I do not regret the decision to do so.
