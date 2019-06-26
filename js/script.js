$(function () {

    the_game = function () {

        if (check_fruit_hits_floor(fruit1) || check_fruit_hits_basket(fruit1)) {
            set_fruit_to_initial_position(fruit1);
            randombg(fruit1);
        } else {
            fruit_down(fruit1);
        }

        if (check_fruit_hits_floor(fruit2) || check_fruit_hits_basket(fruit2)) {
            set_fruit_to_initial_position(fruit2);
            randombg(fruit2);
        } else {
            fruit_down(fruit2);
        }

        if (check_fruit_hits_floor(fruit3) || check_fruit_hits_basket(fruit3)) {
            set_fruit_to_initial_position(fruit3);
            randombg(fruit3);
        } else {
            fruit_down(fruit3);
        }

        if (check_fruit_hits_floor(fruit4) || check_fruit_hits_basket(fruit4)) {
            set_fruit_to_initial_position(fruit4);
            randombg(fruit4);
        } else {
            fruit_down(fruit4);
        }

        if (check_fruit_hits_floor(fruit5) || check_fruit_hits_basket(fruit5)) {
            set_fruit_to_initial_position(fruit5);
            randombg(fruit5);
        } else {
            fruit_down(fruit5);
        }

        if (life > 0) {
            anim_id = requestAnimationFrame(the_game);
        } else {
            stop_the_game();
        }
    };

    anim_id = requestAnimationFrame(the_game);

});
    