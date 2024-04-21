//Dawson Gilmore
import * as Setup from "./setup.js"
gsap.registerPlugin(PixiPlugin)

let currentQuestion = 0
let numCorrect = 0
let numWrong = 0

let imgLoadProgress = 0
let soundLoadProgress = 0

let canAnswer = true

const app = new PIXI.Application()
await app.init({
     background: '#0066AA',
     width: 800,
     height: 400,
     antialias: true
})
document.querySelector(".pixiContainer").appendChild(app.canvas)

//Create buttons and text elements
let startButton = Setup.createStartButton()
app.stage.addChild(startButton)

let startPageText = Setup.createStartPageText()
app.stage.addChild(startPageText)

let questionTitleText = Setup.createQuestionTitleText()
let questionText = Setup.createQuestionText()

let trueButton = Setup.createTrueButton()
let falseButton = Setup.createFalseButton()

let restartButton = Setup.createRestartButton()

//Load Images
let correctText = null
let yesText = null
let incorrectText = null
let wrongText = null

Setup.loadImage("img/correctText.png").then((v) => {
     correctText = v
     correctText.rotation = 0.3
     onImgLoad("correctText")
})

Setup.loadImage("img/yesText.png").then((v) => {
     yesText = v
     yesText.rotation = 0.1
     onImgLoad("yesText")
})

Setup.loadImage("img/incorrectText.png").then((v) => {
     incorrectText = v
     incorrectText.rotation = -0.1
     onImgLoad("incorrectText")
})

Setup.loadImage("img/wrongText.png").then((v) => {
     wrongText = v
     wrongText.rotation = -0.3
     onImgLoad("wrongText")
})

function onImgLoad(name) {
     imgLoadProgress++
     console.log(name + " Image Loaded (" + imgLoadProgress + "/4)")
     updateLoadingBar()
}

//Load Sounds
Setup.loadSound("correctBeep1").then(onSoundLoad("correctBeep1"))
Setup.loadSound("correctBeep2").then(onSoundLoad("correctBeep2"))
Setup.loadSound("wrongBeep1").then(onSoundLoad("wrongBeep1"))
Setup.loadSound("wrongBeep2").then(onSoundLoad("wrongBeep2"))
Setup.loadSound("victory").then(onSoundLoad("victory"))

function onSoundLoad(name) {
     soundLoadProgress++
     console.log(name + " Sound Loaded (" + soundLoadProgress + "/5)")
     updateLoadingBar()
}

function updateLoadingBar() {
     //Progress Bar
     let loadingBar = startButton.children[1]
     loadingBar.clear()

     //Recalc Progress Width
     let barWidth = (300 / 9) * (imgLoadProgress + soundLoadProgress) - 3
     loadingBar.roundRect(-148, -23, barWidth, 46, 10)
     loadingBar.fill(0xe0db36)

     //Enable Button When Done Loading
     if (imgLoadProgress + soundLoadProgress == 9) {
          console.log("*** LOADING COMPLETE ***")
          startButton.children[2].text = "PLAY"
          startButton.eventMode = "static"
          startButton.cursor = "cursor"
          //Button hover
          startButton.addEventListener('pointerover', (v) => {
               console.log("Start button hovered.");
               gsap.to(startButton, { pixi: { scale: 1.2, rotation: 5 }, duration: .25, ease: 'back.out(2)' })
          })
          //Button unhover
          startButton.addEventListener('pointerout', (v) => {
               console.log("Start button unhovered.");
               gsap.to(startButton, { pixi: { scale: 1, rotation: 0 }, duration: .25, ease: 'back.out(2)' })
          })
          //Button Down
          startButton.addEventListener('pointerdown', (v) => {
               console.log("Start button Down")
               gsap.to(startButton, { pixi: { scale: .9 }, duration: .25, ease: 'back.out(2)' })

          })
          //Button Up
          startButton.addEventListener('pointerup', (v) => {
               console.log("Start button Up")
               gsap.to(startButton, { pixi: { scale: 2, alpha: 0, rotation: -300 }, duration: 1, ease: 'power3.out', onComplete: begin })
               gsap.to(startPageText, { pixi: { scale: 2, alpha: 0 }, duration: 1, ease: 'power3.out' })
               startButton.eventMode = "none";
          })
          //Button Up Wrong
          startButton.addEventListener('pointerupoutside', (v) => {
               console.log("Start button Up but Wrong")
               gsap.to(startButton, { pixi: { scale: 1 }, duration: .25, ease: 'back.out(2)' })
          })

     }
}

//Switch to question screen
function begin() {
     app.stage.removeChild(startButton)
     app.stage.removeChild(startPageText)

     app.stage.addChild(questionTitleText)
     app.stage.addChild(questionText)

     app.stage.addChild(trueButton)
     app.stage.addChild(falseButton)
     trueButton.eventMode = "static"
     trueButton.cursor = "pointer"
     falseButton.eventMode = "static"
     falseButton.cursor = "pointer"
     createTrueFalseListeners()

     app.stage.addChild(correctText)
     app.stage.addChild(wrongText)
     app.stage.addChild(yesText)
     app.stage.addChild(incorrectText)
}

function createTrueFalseListeners() {
     //******* TRUE BUTTON *********
     //True Button hover
     trueButton.addEventListener('pointerover', (v) => {
          console.log("true button hovered.");
          gsap.to(trueButton, { pixi: { scale: 1.1 }, duration: .25, ease: 'back.out(2)' })
     })
     //True Button unhover
     trueButton.addEventListener('pointerout', (v) => {
          console.log("true button unhovered.");
          gsap.to(trueButton, { pixi: { scale: 1 }, duration: .25, ease: 'back.out(2)' })
     })
     //True Button Down
     trueButton.addEventListener('pointerdown', (v) => {
          console.log("true button Down")
          gsap.to(trueButton, { pixi: { scale: .9 }, duration: .25, ease: 'back.out(2)' })
     })
     //True Button Up
     trueButton.addEventListener('pointerup', (v) => {
          console.log("true button Up")
          gsap.to(trueButton, { pixi: { scale: 1.1 }, duration: .25, ease: 'power3.out' })
          verifyQuestion(true)
     })
     //True Button Up Wrong
     trueButton.addEventListener('pointerupoutside', (v) => {
          console.log("true button Up but Wrong")
          gsap.to(trueButton, { pixi: { scale: 1 }, duration: .25, ease: 'back.out(2)' })
     })

     //******** FALSE BUTTON ***********
     //False Button Hover
     falseButton.addEventListener('pointerover', (v) => {
          console.log("false button hovered.");
          gsap.to(falseButton, { pixi: { scale: 1.1 }, duration: .25, ease: 'back.out(2)' })
     })
     //False Button unhover
     falseButton.addEventListener('pointerout', (v) => {
          console.log("false button unhovered.");
          gsap.to(falseButton, { pixi: { scale: 1 }, duration: .25, ease: 'back.out(2)' })
     })
     //False Button Down
     falseButton.addEventListener('pointerdown', (v) => {
          console.log("false button Down")
          gsap.to(falseButton, { pixi: { scale: .9 }, duration: .25, ease: 'back.out(2)' })

     })
     //False Button Up
     falseButton.addEventListener('pointerup', (v) => {
          console.log("false button Up")
          gsap.to(falseButton, { pixi: { scale: 1.1 }, duration: .25, ease: 'power3.out' })
          verifyQuestion(false)
     })
     //False Button Up Wrong
     falseButton.addEventListener('pointerupoutside', (v) => {
          console.log("false button Up but Wrong")
          gsap.to(falseButton, { pixi: { scale: 1 }, duration: .25, ease: 'back.out(2)' })
     })
}

//Question List
const questions = [
     "true === 1",
     "true + true === 2",
     "0 == \"0\"",
     "0 == []",
     "\"0\" == []",
     "(1/0) == (10 ** 1000)",
     "parseInt(0.00005) == 5",
     "parseInt(0.000005) == 5",
     "parseInt(0.0000005) == 5",
     "!!\"\" === false",
     "0.1 + 0.1 == 0.2",
     "0.1 + 0.2 == 0.3",
     "[] == \"\"",
     "[,] == \"\"",
     "[,,] == \"\"",
     "[,,] == \",\"",
     "[,] + [,] == \",\"",
     "[,,] + [,,] == \",,\""
]

async function verifyQuestion(answer) {
     if(!canAnswer){ //return instantly if not allowed to answer
          return
     }
     canAnswer = false

     //I am so incredibly happy about this line
     let correct = (answer == eval(questions[currentQuestion]))

     currentQuestion++
     console.log(correct)
     if(correct){
          numCorrect++
          if(numCorrect % 2 == 0){ //Alternate Sounds
               await playCorrectOne()
          }else{
               await playCorrectTwo()
          }
     }else{
          numWrong++
          if(numWrong % 2 == 0){ //Alternate Sounds
               await playWrongOne()
          }else{
               await playWrongTwo()
          }
     }
     if(currentQuestion < 18){ //Complete game if questions are done
          loadQuestion(currentQuestion)
     }else{
          gameComplete()
     }
     
}

async function playCorrectOne() {
     PIXI.sound.play('correctBeep1')
     PIXI.sound.volume('correctBeep1')
     correctText.alpha = 1
     await gsap.to(correctText, { pixi: { alpha: 0 }, duration: 0.75, ease: 'power3.in' })
}
async function playCorrectTwo() {
     PIXI.sound.play('correctBeep2')
     PIXI.sound.volume('correctBeep2')
     yesText.alpha = 1
     await gsap.to(yesText, { pixi: { alpha: 0 }, duration: 0.75, ease: 'power3.in' })
}
async function playWrongOne() {
     PIXI.sound.play('wrongBeep1')
     PIXI.sound.volume('wrongBeep1')
     incorrectText.alpha = 1
     await gsap.to(incorrectText, { pixi: { alpha: 0 }, duration: 0.75, ease: 'power3.in' })
}
async function playWrongTwo() {
     PIXI.sound.play('wrongBeep2')
     PIXI.sound.volume('wrongBeep2')
     wrongText.alpha = 1
     await gsap.to(wrongText, { pixi: { alpha: 0 }, duration: 0.75, ease: 'power3.in' })
}

function loadQuestion(qNum) {
     questionText.text = questions[qNum]
     canAnswer = true
}

//Switch to results screen
function gameComplete() {
     PIXI.sound.play('victory')
     PIXI.sound.volume('victory')
     app.stage.removeChild(trueButton)
     app.stage.removeChild(falseButton)
     questionTitleText.text = "Quiz Complete!"
     questionText.text = "Score: " + numCorrect + "/17"

     app.stage.addChild(restartButton)
     restartButton.eventMode = "static"
     restartButton.cursor = "pointer"

     //Restart Button Hover
     restartButton.addEventListener('pointerover', (v) => {
          console.log("restart button hovered.");
          gsap.to(restartButton, { pixi: { scale: 1.1 }, duration: .25, ease: 'back.out(2)' })
     })
     //restart Button unhover
     restartButton.addEventListener('pointerout', (v) => {
          console.log("restart button unhovered.");
          gsap.to(restartButton, { pixi: { scale: 1 }, duration: .25, ease: 'back.out(2)' })
     })
     //restart Button Down
     restartButton.addEventListener('pointerdown', (v) => {
          console.log("restart button Down")
          gsap.to(restartButton, { pixi: { scale: .9 }, duration: .25, ease: 'back.out(2)' })

     })
     //restart Button Up
     restartButton.addEventListener('pointerup', (v) => {
          console.log("restart button Up")
          location.reload()
     })
     //restart Button Up Wrong
     restartButton.addEventListener('pointerupoutside', (v) => {
          console.log("restart button Up but Wrong")
          gsap.to(restartButton, { pixi: { scale: 1 }, duration: .25, ease: 'back.out(2)' })
     })
}