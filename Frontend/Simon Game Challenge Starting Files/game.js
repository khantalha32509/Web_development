var gamePattern=[]
var userPattern=[]
var col=["red","blue","green","yellow"]
var level = 0


    $("body").keydown(function(){
        nextSequence();
        $("h1").text("Level "+level)
        level++
    })
    $(".btn").click(function(){
        var buttonClicked=$(this).attr("id")
        userPattern.push(buttonClicked)
        animePress(buttonClicked)
        playSound(buttonClicked)  
    })
    // $("body").keydown(function(){
    //     $("h1").text("Game Over")
    //     level=0
    //     setInterval(function () {
    //     $("h1").text("Press a key to start")
    //     },500)
    // })
function checkAnswer(currentLevel){

}


function nextSequence(){
    var randomNumber=Math.round(Math.random()*4)
    var randomChosenColor=col[randomNumber]
    gamePattern.push(randomChosenColor)
    
    $("."+randomChosenColor).fadeOut(100).fadeIn(100)
   
    playSound(randomChosenColor);
}

function playSound(name){
   
        var  clickSound= new Audio("sounds/"+name+".mp3")
       clickSound.play();
           
  
}
function animePress(currentColor){
   
        $("#"+currentColor).addClass("pressed")
        setInterval(function () {
            $("#"+currentColor).removeClass("pressed")
        },300)
    
   
}