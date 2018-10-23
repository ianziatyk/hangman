const guess= document.getElementById('guess');
const getHint = document.getElementById('getHint')
const playersGuess =  document.getElementById('playersGuess')
const submit = document.getElementById('submit')
const displayHint = document.getElementById('displayHint')
const guessedLetters = document.getElementById('guessedLetters')
const countText  = document.getElementById('countText')
const newGame = document.getElementById('newGame')
const logo= document.getElementById('logo');

document.getElementById('playersGuess').focus()
const wrapper = document.getElementById('wrapper')
const song1 = new Audio ('./sounds/The Price is Right theme song.mp3')
const song2 = new Audio ('./sounds/The Price is Right Losing Horn - Gaming Sound Effect (HD).mp3')
const song3 = new Audio ('./sounds/The Price is Right Ding - Ding (HD).mp3')

//I added this button for new game instead of having to reload the page!
newGame.addEventListener('click', function(){
	document.location.reload()})

// getHint.addEventListener('click',function(){
// 	displayHint.innerHTML ='Hint: '+ randomHint;
// })

//This is this constructor class for the word and hint

class Word{
	constructor(answer,hint){
		this.answer=answer;
		this.hint=hint;	
	}
}
//this pushes words into word array for math random function
class myWordList{
	constructor(){
		this.wordArray=[];
	}
	addWords(word){
		this.wordArray.push(word);
	}
}
let word1 = new Word('awkward','Causing difficulty; hard to do or deal with.');
let word2 = new Word('bagpipes','A wind instrument consisting of a reed melody pipe and from one to five drones with air supplied continuously either by a bag with valve-stopped mouth tube or by bellows —often used in plural');
let word3 = new Word('croquet','A game played on a lawn, in which colored wooden balls are driven through a series of wickets by means of mallets.');
let word4 = new Word('fishhook','A usually barbed hook for catching fish.');
let word5 = new Word('fjord','A long, narrow, deep inlet of the sea between high cliffs, as in Norway and Iceland, typically formed by submergence of a glaciated valley.');
let word6 = new Word('jukebox','A machine that automatically plays a selected musical recording when a coin is inserted.');
let word7 = new Word('numbskull','A stupid or foolish person.');
let word8 = new Word('phlegm','The thick viscous substance secreted by the mucous membranes of the respiratory passages, especially when produced in excessive or abnormal quantities.');
let word9 = new Word('squawk','A loud, harsh or discordant noise made by a bird or a person.');
let word10 = new Word('sphinx','A mythical creature with the head of a human and the body of a lion.');
let word11 = new Word('quip','A witty remark.');
let word12 = new Word('Yacht','A medium-sized sailboat equipped for cruising or racing.');
let word13 = new Word('rhythmic','Occurring regularly.');
let word14 = new Word('zombie','A song by The Cranberries');

let x = new myWordList()
x.addWords(word1);
x.addWords(word2);
x.addWords(word3);
x.addWords(word4);
x.addWords(word5);
x.addWords(word6);
x.addWords(word7);
x.addWords(word8);
x.addWords(word9);
x.addWords(word10);

var randomNum= Math.floor(Math.random()*x.wordArray.length)
var random = x.wordArray[randomNum]
var randomAnswer = random.answer
let correctGuess=[]
let incorrect = []
let randomHint = random.hint
let randomAnswerA = randomAnswer.split('').sort()
let count = 6

//SPAN MF!!
let randomAnswerSet = new Set(randomAnswerA)
let randomAnswerSetSpan = [...randomAnswerSet]
let gameCheckAnswer = randomAnswerSetSpan.join('')
let guessedLetB = correctGuess.sort()
getHint.addEventListener('click',function(){
	displayHint.innerHTML ='Hint: '+ randomHint;
})

//This function makes boxes equal to the length of the word that is randomly being generated!!!
function theBoxes(){
	console.log(randomHint)
	console.log(randomAnswer)
for (let i=0;i<randomAnswer.length;i++){
	let box = document.createElement('div');
	box.id= 'box'+i;
	box.className = 'holla';
		document.getElementById('wrapper').appendChild(box);
		// box.style.border = '2px solid white';
		// box.style.height = '100px';
		// box.style.width = '100%';
		// box.style.display = 'flex';
		// box.style.flexDirection = 'row'
		// box.style.margin= '10px';
		document.getElementById('countText').innerHTML =("<img src='./images/Hangman-" +count+".png' width='120px' height='120px'>")
		document.getElementById('guessLet').innerHTML = 'Incorrect Guesses: ' + incorrect

	}

 }
//this is the functioin being called so that on load the game is available!!
 theBoxes()
//I added this funtionality so that you can play the game without using the mouse!!
 window.addEventListener('change', function(){
 	document.getElementById('submit').focus()
})

 submit.addEventListener ('click', function(){ 
 	document.getElementById('playersGuess').focus()
 	 let result = false;
	for (let z=0;z<randomAnswer.length;z++){
		if(playersGuess.value.length>1){
			alert('one charecter at a time please')
			playersGuess.value=''
			return
			
		}
			
			let valueExists = playersGuess.value == randomAnswer[z];
			let valueExistsNot = playersGuess.value == !randomAnswer[z];
			let wasNotGuessedYet = !guessedLetB.includes(playersGuess.value);
			let wasGuessed = guessedLetB.includes(playersGuess.value)
			// let wasGuessedWrong = incorrect.includes(playersGuess.value)
		if (valueExists && wasNotGuessedYet){
		     
			document.getElementById('box'+[z]).innerHTML= randomAnswer[z]
			song3.play()
					
			result=true
		}
		if (valueExists && wasGuessed){
			alert ('you guessed this one ')
			playersGuess.value=''
			return
		}
		if (incorrect.includes(playersGuess.value) ){
				alert('You already guessed this letter, and its wrong!')
				playersGuess.value=''
				return
		}
		else{}
	}
	if (result === true) {
		correctGuess.push(playersGuess.value)
		// console.log(correctGuess)
	}
	//this is if you guess incorrectly, the incorrect word gets pushed to an array displayed(innerHTML) on the
 if (result===false){
		incorrect.push(playersGuess.value)
		console.log(result)
		count--;
		console.log(count)
		document.getElementById('guessLet').innerHTML = 'Incorrect: ' + incorrect
}
// This is the alert if you win the game 
if (guessedLetB.sort().join('')==randomAnswerSetSpan.join('')
){		song1.play()
		alert('you win!!')
		document.body.style.animation= ('Gradient 1s ease infinite');
		logo.innerHTML = "<img src='./images/PIR-logo-win.png' width='725px' height='725px'>"
		document.getElementById("submit").disabled = true;
		document.getElementById('getHint').disabled = true;
		document.getElementById('playersGuess').disabled = true;
		submit.style.color = ('transparent')
		submit.style.border = ('transparent')
		getHint.style.color = ('transparent')
		getHint.style.border = ('transparent')
		playersGuess.style.color = ('transparent')
		playersGuess.style.border = ('transparent')
		return
		
}
//this is the alert if you lose!
	if(count == 0){
		song2.play()
		alert('you lose')
		document.getElementById("submit").disabled = true;
		document.getElementById('getHint').disabled = true;
		document.getElementById('playersGuess').disabled = true;
		submit.style.color = ('transparent')
		submit.style.border = ('transparent')
		getHint.style.color = ('transparent')
		getHint.style.border = ('transparent')
		playersGuess.style.color = ('transparent')
		playersGuess.style.border = ('transparent')
		document.getElementById('countText').innerHTML =("<img src='./images/Hangman-" +count+".png' width='120px' height='120px'>");
		countText.style.color = ('red')
		countText.style.fontSize = ('50px')
		document.body.style.animation= ('Gradient 1s ease infinite');
		document.body.style.background =('linear-gradient(-45deg,#ff0000, #ffffff)');
		document.body.style.backgroundSize = ('400% 400%');

		return

	}
	console.log(result)
	console.log('last')
	console.log(count)
	playersGuess.value=''
	document.getElementById('countText').innerHTML =("<img src='./images/Hangman-" +count+".png' width='120px' height='120px'>");

})



