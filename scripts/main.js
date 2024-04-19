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
/*
let img = null
Setup.loadImg().then((v) => {
     img = v
     onImgLoad("sound1")
})

Setup.loadSound().then(onSoundLoad("sound1"))
*/
function onImgLoad(name){
     console.log(name + " Image Loaded (" + imgLoadProgress + "/3)")
     imgLoadProgress++
     updateLoadingBar()
}
function onSoundLoad(name){
     console.log(name + " Sound Loaded (" + soundLoadProgress + "/3)")
     soundLoadProgress++
     updateLoadingBar()
}

function updateLoadingBar(){
     let loadingBar = startButton.children[1]
     loadingBar.clear()

     let barWidth = (startButton.width / 6) * (imgLoadProgress + soundLoadProgress)
     loadingBar.roundRect(-98, -23, barWidth, 46, 10)
     loadingBar.fill(0xe0db36)
     if(imgLoadProgress + soundLoadProgress == 6){
          startButton.children[2].text = "PLAY"
          startButton.eventMode = "static"
          startButton.cursor = "cursor"
          //Button hover
          startButton.addEventListener('pointerover', (v)=>{
               console.log("Start button hovered.");
               gsap.to(startButton, {pixi: {scale: 1.2, rotation: 10}, duration: .25, ease: 'back.out(2)'})
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
               gsap.to(startButton, {pixi: {scale: 0.2, alpha: 0, rotation: -500}, duration: 1, ease: 'power3.out', onComplete: begin})
               startButton.eventMode = "none";
          })
          //Button Up Wrong
          startButton.addEventListener('pointerupoutside', (v)=>{
               console.log("Start button Up but Wrong")
               gsap.to(startButton, {pixi: {scale: 1}, duration: .25, ease: 'back.out(2)'})
          })

     }
}


app.ticker.add((deltaTime) => {
     Engine.tick(deltaTime)
})