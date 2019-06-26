$( document ).ready(function() {

    setTimeout(function(){
        stop_the_game();
        clearInterval(timer);
    },61000);
    var timer = setInterval(function(){
      time_count--;
      time_check.text(time_count);
    },1000);
    var random= Math.floor(Math.random() * 5) + 1;
    var bigSize = ["url('images/fru_1.png')",
                    "url('images/fru_2.png')",
                    "url('images/fru_3.png')",
                    "url('images/fru_4.png')",
                    "url('images/fru_5.png')"];
    function randBg(){
        for(var i = 0;i <= 5; i++){
            random= Math.floor(Math.random() * 5) + 1;
            var ele = document.getElementsByClassName("fruit")[i];
            ele.style.backgroundImage = bigSize[random];
        }
    } 
    randBg();
    
    
});
$(document).on('mousemove', function (e) {
    basket.css('left', e.pageX);
    if(e.pageX < pageX){
       /*  basket.css("background-image","url('images/Bear_run.gif')"); */
        basket.css("transform",'scaleX(-1)');
    }
    if(pageX < e.pageX){
        basket.css("transform",'scaleX(1)');
    }
    if(pageX == e.pageX){
      /*   basket.css("background-image","url('images/Bear_stop.gif')"); */
    }
    pageX = e.pageX;
   
});

/* var change = {
    37: {
      left: "-=1"
    },
  
    38: {
      top: "-=1"
    },
  
    39: {
      left: "+=1"
    },
  
    40: {
      top: "+=1"
    },
  }
  $(document).one("keydown", keyDown)
  
  var going;
  
  function keyDown(e) {
    console.log("down")
    $(document).one("keyup", keyup)
    var animation = change[e.which];
    going = setInterval(keepGoing, 1);
  
    function keepGoing() {
      $("#basket").css(animation)
    }
  
  }
  
  function keyup(e) {
    console.log("up")
    clearInterval(going)
    $(document).one("keydown", keyDown)
  } */


function fruit_down(fruit) {
    fruit_current_position = parseInt(fruit.css('top'));
    fruit.css('top', fruit_current_position + speed);
}

function check_fruit_hits_floor(fruit) {
    if (collision(fruit, floor)) {
        show_bulls_eye(fruit);
        fruit_bg = $(fruit).css('background-image');
        banana_count = fruit_bg.search("fru_5.png");
        if(banana_count > 0){
            decrement_life();
        }
        return true;
    }
    return false;
}

function set_fruit_to_initial_position(fruit) {
    initial(fruit);
    fruit.css('top', fruit_initial_position); 
}

function show_bulls_eye(fruit) {
    bullseye_num = fruit.attr('data-bullseye');
    $('#bullseye' + bullseye_num).show();
    hide_bulls_eye(bullseye_num);
}

function hide_bulls_eye(bullseye_num) {
    setTimeout(function () {
        $('#bullseye' + bullseye_num).hide();
    }, 800);
}

function decrement_life() {
    life--;
    life_span.text(life);
}

function check_fruit_hits_basket(fruit) {
    if (collision(fruit, basket)) {
        fruit_top = parseInt(fruit.css('top'));
        if (fruit_top < basket_top) {
            fruit_bg = $(fruit).css('background-image');
            banana_count = fruit_bg.search("fru_5.png");
            if(banana_count > 0){
                update_score();
                return true;
            }
        }
    }
    return false;
}

function update_score() {
    score++;
    if (score % 10 === 0 && speed <= max_speed) {
        speed++;
    }
    score_span.text(score);
    score_1.text(score);
}

function stop_the_game() {
    cancelAnimationFrame(anim_id);
    restart.slideDown();
    $(".fruit, #basket").hide();
}

restart.click(function () {
    location.reload();
});

function randombg(fruit_parse){
    var fruit_temp = fruit_parse.attr('id');
    var random = Math.floor(Math.random() * 5) + 1;
    var bigSize = ["url('images/fru_1.png')",
                    "url('images/fru_2.png')",
                    "url('images/fru_3.png')",
                    "url('images/fru_4.png')",
                    "url('images/fru_5.png')"];
    var ele = document.getElementById(fruit_temp);
    ele.style.backgroundImage = bigSize[random]; 
}

function initial(fruit){
   /*  for(var x = 0; x <= 100 ; x++){
        console.log("#fruit");
        var dynamic = Math.floor(Math.random() * 100) + 1;
        var dynamic1= Math.floor(Math.random() * 5) + 1;
        console.log("calc("+dynamic+"% + 8%/2 - 2%/2)");
        $("#fruit"+dynamic1).css("left", "calc("+dynamic+"% + 8%/2 - 2%/2)");
        console.log("#fruit");
        console.log("#fruit"+dynamic1);
       //console.log("#fruit");
    } */
    var dynamic = Math.floor(Math.random() * 80) + 10;
    $("#"+fruit.attr('id')).css("left", "calc("+dynamic+"% + 8%/2 - 2%/2)");

}


