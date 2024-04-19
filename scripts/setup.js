export async function loadImg(){
     let tex = await PIXI.Assets.load("img/ant.png")
     let obj = new PIXI.Spite(tex)
     obj.scale.set(0.1)
     obj.pivot.set(0.5,0.5)
     obj.x = 100
     obj.y = 100
     return obj
}

export async function loadSound(){
     PIXI.Assets.add({alias: 'sound', src:"sounds/antSound.mp3"})
     return PIXI.Assets.load('sound')
}

const startBtnTextStyle = new PIXI.TextStyle({
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
     background.roundRect(-100,-25, 200, 50, 10)
     background.fill(0xFFFFFF)
     background.stroke({width: 3, color: 0x000000})

     let progress = new PIXI.Graphics();
     progress.roundRect(-100,-25, 0, 50, 10)
     progress.fill(0xe0db36)


     let txt = new PIXI.Text({text: "LOADING...", style: startBtnTextStyle})
     txt.x = 0
     txt.y = 0
     txt.anchor.set(0.5,0.5)

     startButton.addChild(background)
     startButton.addChild(progress)
     startButton.addChild(txt)
     startButton.x = 400
     startButton.y = 400

     return startButton
}