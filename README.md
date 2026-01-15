# Verbal Fluency Test

## Program Overview
This program opens an index.html file in any browser that runs a simple jsPsych experiment based on the verbal
fluency test. It includes category words, prime words that briefly appear and then dissappear, one timed
trial, and one tutorial page that outlines how to use the program. 
The program receives input from a user via an HTML textarea object and logs their responses alongside the
time at which that word was submitted (calculated relative to when the current trial started.) 
The program uses the jsPsych library to place time limits on trials and records all collected data in
the .data field of the trial. This data, grouped by trial and data field, is displayed after all trials
have completed using a jsPsych method. 

## Running the Program
To run the program, start by cloning the repository to you device. The easiest way to do this is to open the
repository, open the green "<> code" menu, and then select the "Download Zip" option. After you unzip the 
downloaded project folder, select the "LexLabTestHTML.html" file inside that folder and the program will
open in your default browser.

## Code Organization

## Reflection
