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


