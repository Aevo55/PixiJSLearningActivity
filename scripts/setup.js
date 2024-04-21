export async function loadImage(path){
     let tex = await PIXI.Assets.load(path)
     let obj = new PIXI.Sprite(tex)
     obj.scale.set(1.5)
     obj.anchor.set(0.5,0.5)
     obj.x = 400
     obj.y = 150
     obj.alpha = 0
     return obj
}

export async function loadSound(soundName){
     PIXI.Assets.add({alias: soundName, src:"sound/" + soundName + ".wav"})
     return PIXI.Assets.load(soundName)
}

const buttonTextStyle = new PIXI.TextStyle({
     fontFamily: 'Arial',
     fontSize: 40,
     fontWeight: 'bold',
     fill: '#5076ff',
     stroke: '#000000',
     align: "center"
});

export function createStartButton(){
     let startButton = new PIXI.Container()

     let background = new PIXI.Graphics()
     background.roundRect(-150,-25, 300, 50, 10)
     background.fill(0xFFFFFF)
     background.stroke({width: 3, color: 0x000000})

     let progress = new PIXI.Graphics();
     progress.roundRect(-150,-25, 0, 50, 10)
     progress.fill(0xe0db36)


     let txt = new PIXI.Text({text: "LOADING...", style: buttonTextStyle})
     txt.x = 0
     txt.y = 0
     txt.anchor.set(0.5,0.5)

     startButton.addChild(background)
     startButton.addChild(progress)
     startButton.addChild(txt)
     startButton.x = 400
     startButton.y = 250

     return startButton
}

const mainTextStyle = new PIXI.TextStyle({
     fontFamily: '\"Courier New\", Courier, monospace',
     fontSize: 42,
     fontWeight: '1000',
     fill: '#000000',
     stroke: '#5076ff',
     align: "center"
});

export function createStartPageText(){
     let txt = new PIXI.Text({text: "Test Your Beginner\nJavascript Knowledge!", style: mainTextStyle})
     txt.anchor.set(0.5,0.5)
     txt.x = 400
     txt.y = 100
     return txt
}

export function createQuestionTitleText(){
     let txt = new PIXI.HTMLText({text: '<span style="color: #00FF00">TRUE</span> or <span style="color: #FF0000">FALSE</span>', style: mainTextStyle})
     txt.anchor.set(0.5,0.5)
     txt.x = 400
     txt.y = 100
     return txt
}

export function createQuestionText(){
     let txt = new PIXI.Text({text: 'true === 1', style: mainTextStyle})
     txt.anchor.set(0.5,0.5)
     txt.x = 400
     txt.y = 175
     return txt
}

const trueTextStyle = new PIXI.TextStyle({
     fontFamily: 'Arial',
     fontSize: 40,
     fontWeight: 'bold',
     fill: '#00FF00',
     stroke: '#000000',
     strokeThickness: 5,
     align: "center"
});

export function createTrueButton(){
     let button = new PIXI.Container()

     let background = new PIXI.Graphics()
     background.roundRect(-100,-25, 200, 50, 10)
     background.fill(0xe0db36)
     background.stroke({width: 3, color: 0x000000})

     let txt = new PIXI.Text({text: "TRUE", style: trueTextStyle})
     txt.x = 0
     txt.y = 0
     txt.anchor.set(0.5,0.5)

     button.addChild(background)
     button.addChild(txt)
     button.x = 250
     button.y = 275

     return button
}

const falseTextStyle = new PIXI.TextStyle({
     fontFamily: 'Arial',
     fontSize: 40,
     fontWeight: 'bold',
     fill: '#FF0000',
     stroke: '#000000',
     strokeThickness: 5,
     align: "center"
});

export function createFalseButton(){
     let button = new PIXI.Container()

     let background = new PIXI.Graphics()
     background.roundRect(-100,-25, 200, 50, 10)
     background.fill(0xe0db36)
     background.stroke({width: 3, color: 0x000000})

     let txt = new PIXI.Text({text: "FALSE", style: falseTextStyle})
     txt.x = 0
     txt.y = 0
     txt.anchor.set(0.5,0.5)

     button.addChild(background)
     button.addChild(txt)
     button.x = 550
     button.y = 275

     return button
}

export function createRestartButton(){
     let button = new PIXI.Container()

     let background = new PIXI.Graphics()
     background.roundRect(-150,-25, 300, 50, 10)
     background.fill(0xe0db36)
     background.stroke({width: 3, color: 0x000000})

     let txt = new PIXI.Text({text: "RESTART", style: buttonTextStyle})
     txt.x = 0
     txt.y = 0
     txt.anchor.set(0.5,0.5)

     button.addChild(background)
     button.addChild(txt)
     button.x = 400
     button.y = 250

     return button
}