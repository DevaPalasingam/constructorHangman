var inquirer = require("inquirer");

var letterConstruct = require("./constructors/letter.js");
var wordConstruct = require("./constructors/word.js");


var masterList = ["typewriter", "pager", "fax machine", "dial up", "phonebook", "floppy disk", "vhs", "rotary telephone", "telephone booth", "dumb phone", "walkman", "overhead projector"];
var validLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var currentWordObject;
var currentWordLetters = [];
var attemptedLetters = [];


newWord();
printLetters();
guessingTime();






// guessingTime - prompts the user to type a letter. checks if a valid letter has been typed
function guessingTime() {
	inquirer.prompt([
		{
			type: "input",
			message: "Guess a letter",
			name: "userInput"
		}
	]).then(function(userKey){
		// safeguard from memory leaks. safety gets set to false if this function has called another function
		var safety = true;

		// keyCheck is being set to what the user typed in
		var keyCheck = userKey.userInput;

		if (safety === true) {
			// if keyCheck is a letter that's already been attempted, then reprompt the user to guess
			for (var p = 0; p < attemptedLetters.length; p++) {
				if (keyCheck === attemptedLetters[p]) {
					safety = false;
					console.log("");
					printAttempted();
					printLetters();
					guessingTime();
				}
			}
			// closes for-loop
		}

		if (safety === true) {
			// if keyCheck is a valid letter, then will call checkLetter
			for(var i = 0; i < validLetters.length; i++) {
				if (keyCheck === validLetters[i]) {
					safety = false;
					checkLetter(keyCheck);
				}
			}
			// closes for-loop
		}

		if (safety === true) {
			console.log("");
			printAttempted();
			printLetters();
			guessingTime();
		}

	});
}
// guessingTime ===============================================



// checkLetter - this will check the letter that the user types
function checkLetter(typedKey) {
	// foundLetter will be set to true if a new letter has been guessed
	var foundLetter = false;

	// compares typedKey to each of the letters in currentWordLetters
	for (var i = 0; i < currentWordLetters.length; i++) {
		
		// if typedKey matches a letter that hasn't been guessed yet, set that letter to true
		if (typedKey === currentWordLetters[i].letter && currentWordLetters[i].currentState === false) {
			currentWordLetters[i].currentState = true;
			foundLetter = true;
		}

	}
	// closes for-loop

	if (foundLetter === false) {
		currentWordObject.triesLeft--;
	}

	console.log("");
	printAttempted();
	printLetters();
	guessingTime();

}
// checkLetter =================================================


// newWord - function that picks a new word
function newWord() {
	var chosenWord;
	// grabs random word from masterList
	chosenWord = masterList[Math.floor(Math.random() * masterList.length)];
	// makes a new Word object
	var makeWord = new wordConstruct(chosenWord, 10);
	// sets currentWordObject to that new Word
	currentWordObject = makeWord;

	// clears the arrays
	currentWordLetters = [];
	attemptedLetters = [];

	for(var i = 0; i < chosenWord.length; i++) {
		var makeLetter = new letterConstruct(chosenWord.charAt(i), false);
		currentWordLetters.push(makeLetter);
	}

}
// newWord =====================================================


// printLetters - prints out all of the letters and blanks
function printLetters() {
	// varPrint contains the letters to be printed
	var varPrint = "";

	for(var i = 0; i < currentWordLetters.length; i++) {
		
		// if the letter is " " print out a blank
		if (currentWordLetters[i].letter === " ") {
			currentWordLetters[i].currentState = true;
			varPrint = varPrint + " ";
		}

		// if the letter has been guessed, print it out
		if (currentWordLetters[i].currentState === true) {
			varPrint = varPrint + currentWordLetters[i].letter;
		}

		// if letter hasn't been guessed, print out "_ "
		if (currentWordLetters[i].currentState === false) {
			varPrint = varPrint + "_ ";
		}

	}
	// closes for-loop

	console.log(varPrint);
}
// printLetters ============================================


// printAttempted - prints letters that have already been attempted
function printAttempted() {
	var attempted = "";
	for(var i = 0; i < attemptedLetters.length; i++) {
		attempted = attempted + attemptedLetters[i];
	}
	console.log("Letters attempted: " + attempted);
}


