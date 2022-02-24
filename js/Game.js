class Game {
    constructor() {
      this.resetTitle=createElement("h2")
      this.resetButton=createButton("")
      this.leaderboardTitle=createElement("h2")
      this.leader1=createElement("h2")
      this.leader2=createElement("h2")
      this.playerMoving= false
      this.leftKeyActive= false
      this.blast= false
    }
    start() {
      player = new Player();
      playerCount=player.getCount();
      form=new Form()
      form.display()
      dog= createSprite(width-200, height/2-100)
      dog.addImage("dog",dogImg)
      dog.scale=0.1
      cat= createSprite(width-200, height/2+100)
      cat.addImage("cat",catImg)
      cat.scale=0.1
    }

    getState(){
     database.ref("gameState").on("value",function(data){
         gameState= data.val()
         
     })
    }

    updateState(state){
        database.ref("/").update({
            gameState:state
        })
    }

    handleElements(){
      form.hide()
      form.titleImg.position(40,60)
      form.title.position(20,5)
      form.title.class("titleAfterEffect")
      form.titleImg.class("gameTitleAfterEffect")
      this.resetTitle.html("Reset game")
      this.resetTitle.class("resetText")
      this.resetTitle.position(width/2+200,40)
      this.resetButton.class("resetButton")
      this.resetButton.position(width/2+230,100)
      this.leaderboardTitle.html("Leaderboard")
      this.leaderboardTitle.class("resetText")
      this.leaderboardTitle.position(width/3-60,40)
      this.leader1.class("resetText")
      this.leader1.position(width/3-50,80)
      this.leader2.class("resetText")
      this.leader2.position(width/3-50,130)
    }
    
    handleReset(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        playerCount:0,
        gameState:0,
        players:{},
        carsAtEnd:0
      })
      window.location.reload()
    })
    }

    play(){
    this.handleElements()
    this.handleReset()
    Player.getPlayersInfo()
    console.log(allPlayers)
    if(allPlayers!==undefined){
      var index=0
      for(var plr in allPlayers){
        index=index+1
        var x= allPlayers[plr].positionX
        var y = height-allPlayers[plr].positionY 
        var currentLife= allPlayers[plr].life
        cars[index-1].position.x=x
        cars[index-1].position.y=y
       if(index==player.index){
         stroke(10)
         fill("green")
         ellipse(x,y,60,60)
         camera.position.x=cars[index-1].position.x
         camera.position.y=cars[index-1].position.y
       }

      }
      drawSprites();
    }
    }

    

}