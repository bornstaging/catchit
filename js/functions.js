$( document ).ready(function() {
    var local = localStorage.getItem("cartoon_id");
    if(local=="boy"){
        $("#toy").attr("src","images/boy-running01.gif");
        $("#toy").css("margin-left","-200%");
    } else {
        $("#toy").attr("src","images/Bear_run.gif");
    }
    setTimeout(function(){
        clearInterval(timer);
        stop_the_game();
    },60000);
      timer = setInterval(function(){
      --time_count;
      time_check.text(time_count);
      $("#myBar").css("width",max_progress_bar+'%');
      max_progress_bar = max_progress_bar - 1.66;
    },1000);
    var random= Math.floor(Math.random() * 5) + 0;
    var bigSize = ["images/fru_1.png",
                    "images/fru_2.png",
                    "images/fru_3.png",
                    "images/fru_4.png",
                    "images/fru_5.png"];
    function randBg(){
        for(var i = 1;i <= 5; i++){
            random= Math.floor(Math.random() * 5) + 0;
            $("#f"+i).attr("src",bigSize[random]);
        }
    } 
    randBg();
});
$(document).on('mousemove', function (e) {
    basket.css('left', e.pageX);
    if(e.pageX < pageX){
        basket.css("transform",'scaleX(-1)');
    }
    if(pageX < e.pageX){
        basket.css("transform",'scaleX(1)');
    }
    if(pageX == e.pageX){
    }
    pageX = e.pageX;
   
});

function fruit_down(fruit) {
    fruit_current_position = parseInt(fruit.css('top'));
    fruit.css('top', fruit_current_position + speed);
}

function check_fruit_hits_floor(fruit) {
    if (collision(fruit, floor)) {
        show_bulls_eye(fruit);
        fruit_bg = $(fruit).children('img').attr("src");
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
            fruit_bg = $(fruit).children('img').attr("src");
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
    var banana = "<img class='b_count' src='images/fru_5.png' />";
    $(".score-board").append(banana);
    if(score > 3){
        $(".b_count").css("width","20%");
        $(".score-board").css("bottom","5%");
    }
    if(score > 10){
        $(".b_count").css("width","15%");
    }
    if(score > 12){
        $(".b_count").css("width","12%");
        $(".score-board").css("bottom","3%");
    }
    if(score > 24){
        $(".b_count").css("width","10%");
    }
    if(score > 30){
        $(".b_count").css("width","8%");
    }
    if(score > 48){
        $(".b_count").css("width","5%");
        $(".score-board").css("bottom","1%");
    }
}

function stop_the_game() {
    cancelAnimationFrame(anim_id);
    restart.slideDown();
    $(".fruit, #basket").hide();
    $("#myBar").css("width","0%");
    clearInterval(timer);
}

restart.click(function () {
    location.reload();
});

function randombg(fruit_parse){
    var fruit_temp = fruit_parse.children('img').attr('id');
    var random = Math.floor(Math.random() * 5) + 0;
    var bigSize = ["images/fru_1.png",
                    "images/fru_2.png",
                    "images/fru_3.png",
                    "images/fru_4.png",
                    "images/fru_5.png"];
    $("#"+fruit_temp).attr("src",bigSize[random]);
}

function initial(fruit){
    var dynamic = Math.floor(Math.random() * 80) + 10;
    $("#"+fruit.attr('id')).css("left", "calc("+dynamic+"% + 8%/2 - 2%/2)");
}

