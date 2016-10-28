//読み込み時の表示
window_load();

//ウィンドウサイズ変更時に更新
window.onresize = window_load;
var s_androidY, s_iosY, s_webdesignY;

//サイズの表示
function window_load() {
  	document.getElementById('topimage').style.height
    		= (window.innerHeight - document.getElementById('header').clientHeight) + "px";
    // console.log(window.innerHeight - document.getElementById('header').clientHeight

    // update Y position
	s_androidY = $("#s_android").offset().top;
	s_iosY = $("#s_ios").offset().top;
	s_webdesignY = $("#s_webdesign").offset().top;
}

/*See here http://jsfiddle.net/zap4f/1/ */
var i = 0 , prec;
var degs = $("#prec").attr("class").split(' ')[1];
var activeBorder = $("#activeBorder");
var INCRIMENT_VAL = 2; // define
var DECRIMENT_VAL = 2; // define
var INCREMENT = "increment"; // define
var DECREMENT = "decrement"; // define
var STATE_STOP = 0;
var STATE_ANIMATE = 1;
var STATE_FINISH = 2;
var SCROLLED_ANDROID = STATE_STOP;
var SCROLLED_IOS = STATE_STOP;
var SCROLLED_WEBDESIGN = STATE_STOP;
var SYNC_ANIMATION = false;

$(function() {
	// like onScroll
    $(window).scroll(function () {
    	// return when the animations all finished
    	if (SCROLLED_ANDROID === STATE_FINISH
        		&& SCROLLED_IOS === STATE_FINISH
        		&& SCROLLED_WEBDESIGN === STATE_FINISH) {
	    	return;
	    }


    	// scrollBottom > s_xxxxxY
        if (SCROLLED_ANDROID === STATE_STOP &&
        		(($(this).scrollTop() + $(this).height())
        		 > s_androidY)) {
        	console.log("SCROLLED_ANDROID start animation");
			SCROLLED_ANDROID = STATE_ANIMATE;
        }
        if (SCROLLED_IOS === STATE_STOP &&
        		(($(this).scrollTop() + $(this).height())
        		 > s_iosY)) {
        	console.log("SCROLLED_IOS start animation");
        	SCROLLED_IOS = STATE_ANIMATE;
        }
        if (SCROLLED_WEBDESIGN === STATE_STOP &&
        		(($(this).scrollTop() + $(this).height())
        		 > s_webdesignY)) {
        	console.log("SCROLLED_WEBDESIGN start animation");
        	SCROLLED_WEBDESIGN = STATE_ANIMATE;
        }

        if (SCROLLED_ANDROID === STATE_ANIMATE
        		|| SCROLLED_IOS === STATE_ANIMATE
        		|| SCROLLED_WEBDESIGN === STATE_ANIMATE) {
	    	if (!SYNC_ANIMATION) {
	    		SYNC_ANIMATION = true;
	    		window.setTimeout("animate(INCREMENT)", 1);
	    	}
	    }
    });
});
var stopper = 0;
function animate(dir){

	if (SCROLLED_ANDROID === STATE_ANIMATE) {
		stopper++;
	    if (dir === INCREMENT) {
	    	i += INCRIMENT_VAL;
	    	if (i > degs) i = degs;
	    } else {
	    	i -= DECRIMENT_VAL;
	    	if (i < 0) i = 0;
	    }
	    
	    prec = (100 * i) / 360;   
	    // $(".prec").html(Math.round(prec)+"%");
	    
	    if (i <= 180) {
	        activeBorder.css(
	        	'background-image',
	        	'linear-gradient(' + (90+i) + 'deg, transparent 50%, #6d8701 50%),linear-gradient(90deg, #6d8701 50%, transparent 50%)');
	    } else{
	        activeBorder.css('background-image','linear-gradient(' + (i-90) + 'deg, transparent 50%, #ffff00 50%),linear-gradient(90deg, #6d8701 50%, transparent 50%)');
	    }

	    console.log(stopper +":"+i);

	    if (i >= degs) {
			SCROLLED_ANDROID = STATE_FINISH;
	    }
	}


	if (SCROLLED_ANDROID === STATE_ANIMATE) {
    		// || SCROLLED_IOS === STATE_ANIMATE
    		// || SCROLLED_WEBDESIGN === STATE_ANIMATE) {
	    window.setTimeout("animate(INCREMENT)", 1);
	} else {
		SYNC_ANIMATION = false;
	}
    
    // setTimeout(loopit(INCREMENT), 1);
}