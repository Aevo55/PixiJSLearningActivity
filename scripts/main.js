//Dawson Gilmore
import * as Setup from "./setup.js"
import * as Engine from "./engine.js"
gsap.registerPlugin(PixiPlugin) 

let imgLoadProgress = 0
let soundLoadProgress = 0

const app = new PIXI.Application()
await app.init({ 
     background: '#0066AA', 
     width: 800, 
     height: 500, 
     antialias: true})
document.querySelector(".pixiContainer").appendChild(app.canvas)

let startButton = Setup.createStartButton()
app.stage.addChild(startButton)

//Load Images
let correctText = null
let yesText = null
let incorrectText = null
let wrongText = null

Setup.loadCorrectText("img/correctText.png").then((v) => {
     correctText = v
     onImgLoad("correctText")
})

Setup.loadCorrectText("img/yesText.png").then((v) => {
     yesText = v
     onImgLoad("yesText")
})

Setup.loadCorrectText("img/incorrectText.png").then((v) => {
     incorrectText = v
     onImgLoad("incorrectText")
})

Setup.loadCorrectText("img/wrongText.png").then((v) => {
     wrongText = v
     onImgLoad("wrongText")
})

function onImgLoad(name){
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

function onSoundLoad(name){
     soundLoadProgress++
     console.log(name + " Sound Loaded (" + soundLoadProgress + "/5)")
     updateLoadingBar()
}

function updateLoadingBar(){
     //Progress Bar
     let loadingBar = startButton.children[1]
     loadingBar.clear()

     //Recalc Progress Width
     let barWidth = (300 / 9) * (imgLoadProgress + soundLoadProgress) - 5
     loadingBar.roundRect(-148, -23, barWidth, 46, 10)
     loadingBar.fill(0xe0db36)

     //Enable Button When Done Loading
     if(imgLoadProgress + soundLoadProgress == 9){
          console.log("*** LOADING COMPLETE ***")
          startButton.children[2].text = "PLAY"
          startButton.eventMode = "static"
          startButton.cursor = "cursor"
          //Button hover
          startButton.addEventListener('pointerover', (v)=>{
               console.log("Start button hovered.");
               gsap.to(startButton, {pixi: {scale: 1.2, rotation: 5}, duration: .25, ease: 'back.out(2)'})
          })
          //Button unhover
          startButton.addEventListener('pointerout', (v)=>{
               console.log("Start button unhovered.");
               gsap.to(startButton, {pixi: {scale: 1, rotation: 0}, duration: .25, ease: 'back.out(2)'})
          })
          //Button Down
          startButton.addEventListener('pointerdown', (v)=>{
               console.log("Start button Down")
               gsap.to(startButton, {pixi: {scale: .9}, duration: .25, ease: 'back.out(2)'})

          })
          //Button Up
          startButton.addEventListener('pointerup', (v)=>{
               console.log("Start button Up")
               gsap.to(startButton, {pixi: {scale: 0.2, alpha: 0, rotation: -200}, duration: 1, ease: 'power3.out', onComplete: begin})
               startButton.eventMode = "none";
          })
          //Button Up Wrong
          startButton.addEventListener('pointerupoutside', (v)=>{
               console.log("Start button Up but Wrong")
               gsap.to(startButton, {pixi: {scale: 1}, duration: .25, ease: 'back.out(2)'})
          })

     }
}

function begin(){

}


app.ticker.add((deltaTime) => {
     Engine.tick(deltaTime)
})