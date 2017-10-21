  var SimpleCard = require("./Simple");
 var Cloze = require("./Cloze");
 var inquirer = require("inquirer");
 var fs = require("fs");
 const SimpleCard = require("./Simple");
 const Cloze = require("./Cloze");
 const inquirer = require("inquirer");
 const fs = require("fs");
 var correct = 0;
  var wrong = 0;
  var cardArray = [];
  // ********************************* Main Process *************************************

 function flashcards() {
 const flashcards = () => {

     inquirer.prompt([{
         inquirer.prompt([{

             type: 'list',
             name: 'userType',
             message: 'What would you like to do?',
             choices: ['create-basic-cards', 'create-cloze-cards', 'basic-quiz', 'cloze-quiz', 'quit']
         }
                 type: 'list',
                 name: 'userType',
                 message: 'What would you like to do?',
                 choices: ['create-basic-cards', 'create-cloze-cards', 'basic-quiz', 'cloze-quiz', 'quit']
             }

     ]).then(function(choice) {

         if (choice.userType === 'create-basic-cards') {
             readCards('log.txt');
             createCards(basicPrompt, 'log.txt');
         } else if (choice.userType === 'create-cloze-cards') {
             readCards('cloze-log.txt');
             createCards(clozePrompt, 'cloze-log.txt');
         } else if (choice.userType === 'basic-quiz') {
             basicQuiz('log.txt', 0);
         } else if (choice.userType === 'cloze-quiz') {
             basicQuiz('cloze-log.txt', 0);
         } else if (choice.userType === 'quit') {
             console.log('Thanks for playing!');
         }
     });
 }
 //***************************************** Functions *********************************
         ]).then(function(choice) {

             if (choice.userType === 'create-basic-cards') {
                 readCards('log.txt');
                 createCards(basicPrompt, 'log.txt');
             } else if (choice.userType === 'create-cloze-cards') {
                 readCards('cloze-log.txt');
                 createCards(clozePrompt, 'cloze-log.txt');
             } else if (choice.userType === 'basic-quiz') {
                 quiz('log.txt', 0);
             } else if (choice.userType === 'cloze-quiz') {
                 quiz('cloze-log.txt', 0);
             } else if (choice.userType === 'quit') {
                 console.log('Thanks for playing!');
             }
         });
     }
     //***************************************** Functions *********************************

 function readCards(logFile) {
 const readCards = (logFile) => {
      cardArray = [];
      //This grabs any previously created cards and saves them to a new array...
      fs.readFile(logFile, "utf8", function(error, data) {

          var jsonContent = JSON.parse(data);

         for (var i = 0; i < jsonContent.length; i++) {
         for (let i = 0; i < jsonContent.length; i++) {
              cardArray.push(jsonContent[i]);
          }
      });
  };

 function createCards(promptType, logFile) {
 const createCards = (promptType, logFile) => {

      inquirer.prompt(promptType).then(function(answers) {

 @@ -66,39 +66,7 @@ function createCards(promptType, logFile) {
      });
  };

 var basicPrompt = [{
     name: "front",
     message: "Enter Front of Card: "
 }, {
     name: "back",
     message: "Enter Back of Card: "

 }, {
     type: 'confirm',
     name: 'makeMore',
     message: 'Create another card (hit enter for YES)?',
     default: true
 }]

 var clozePrompt = [{
     name: "text",
     message: "Enter a sentence, putting the word you want to hide in parentheses, like this: 'I cannot tell a (lie)'",
     validate: function(value) {
         var parentheses = /\(\w.+\)/;
         if (value.search(parentheses) > -1) {
             return true;
         }
         return 'Please put a word in your sentence in parentheses'
     }
 }, {
     type: 'confirm',
     name: 'makeMore',
     message: 'Create another card (hit enter for YES)?',
     default: true
 }]


 function basicQuiz(logFile, x) {
 const quiz = (logFile, x) => {

      fs.readFile(logFile, "utf8", function(error, data) {

 @@ -134,12 +102,12 @@ function basicQuiz(logFile, x) {
                      console.log('Correct!');
                      correct++;
                      x++;
                     basicQuiz(logFile, x);
                     quiz(logFile, x);
                  } else {
                      gameCard.printAnswer();
                      wrong++;
                      x++;
                     basicQuiz(logFile, x);
                     quiz(logFile, x);
                  }

              })
 @@ -155,17 +123,47 @@ function basicQuiz(logFile, x) {
      });
  };

 function writeToLog(logFile, info) {
 const writeToLog = (logFile, info) => {

      fs.writeFile(logFile, info, function(err) {
          if (err)
              console.error(err);
      });
  }

 const basicPrompt = [{
     name: "front",
     message: "Enter Front of Card: "
 }, {
     name: "back",
     message: "Enter Back of Card: "

 }, {
     type: 'confirm',
     name: 'makeMore',
     message: 'Create another card (hit enter for YES)?',
     default: true
 }]

 const clozePrompt = [{
     name: "text",
     message: "Enter a sentence, putting the word you want to hide in parentheses, like this: 'I cannot tell a (lie)'",
     validate: function(value) {
         var parentheses = /\(\w.+\)/;
         if (value.search(parentheses) > -1) {
             return true;
         }
         return 'Please put a word in your sentence in parentheses'
     }
 }, {
     type: 'confirm',
     name: 'makeMore',
     message: 'Create another card (hit enter for YES)?',
     default: true
 }]

 var makeMore = {
     //Prompt to find out if user wants to play again before exiting program (default is yes)
 const makeMore = {
     //Prompt to find out if user wants to make more cards (default is yes)
      type: 'confirm',
      name: 'makeMore',
      message: 'Create another card (hit enter for YES)?',
