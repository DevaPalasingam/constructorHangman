var inquirer = require("inquirer");

var letterConstruct = require("./constructors/letter.js");
var wordConstruct = require("./constructors/word.js");


var masterList = ["typewriter", "pager", "fax machine", "dial up", "phonebook", "floppy disk", "vhs", "rotary telephone", "telephone booth", "dumb phone", "walkman", "overhead projector"];
var validLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var currentWordObject;
var currentWordLetters = [];
var attemptedLetters = [];

var foundLetter = false;


newWord();
printLetters();
debugger;





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


