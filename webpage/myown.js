

// define variables
var INDEX_ANDROID = 0; // define
var INDEX_IOS = 1; // define
var INDEX_WENDESIGN = 2; // define
var INCRIMENT_VAL = 2; // define
var DECRIMENT_VAL = 2; // define
var INCREMENT = "increment"; // define
var DECREMENT = "decrement"; // define
var STATE_STOP = 0; // define
var STATE_ANIMATE = 1; // define
var STATE_FINISH = 2; // define
var MAXIMUM_FRAME = 360; // define

// define, but they can vary when the window size was changed
var SCROLL_Y = [
	0,
	0,
	0];

// array variables
var mCircles = [
	$("#s_android .container4circle"),
	$("#s_ios .container4circle"),
	$("#s_webdesign .container4circle")];
var mAnimateFlame = [
	0,
	0,
	0];
var mSkillScreen = [
	STATE_STOP,
	STATE_STOP,
	STATE_STOP];
var mSync = false;
var mInitialize = false;

//読み込み時の表示
window_load();

//ウィンドウサイズ変更時に更新
window.onresize = window_load;

// called when the window size was changed somehow.
function window_load() {
  	document.getElementById('topimage').style.height
    		= (window.innerHeight - document.getElementById('header').clientHeight) + "px";
    // console.log(window.innerHeight - document.getElementById('header').clientHeight

    // update Y position
    for (var i = 0; i < mCircles.length; i++) {
    	SCROLL_Y[i] = mCircles[i].offset().top;

    	if (!mInitialize) {
			for (var k = 0; k < mCircles[i].length; k++) {
				setCircleColor(mCircles[i][k], i);
			}
		}
	}
}

$(function() {
	// like onScroll
    $(window).scroll(function () {
    	// return when the animations all finished
    	if (mSkillScreen[INDEX_ANDROID] === STATE_FINISH
        		&& mSkillScreen[INDEX_IOS] === STATE_FINISH
        		&& mSkillScreen[INDEX_WENDESIGN] === STATE_FINISH) {
	    	return;
	    }

	    var scrollBottom = $(this).scrollTop() + $(this).height();
	    for (var i = 0; i < mSkillScreen.length; i++) {
	    	// check whether the circle already show up or not.
	    	if (mSkillScreen[i] === STATE_STOP
	    		&& scrollBottom > SCROLL_Y[i]) {
	    		// switch state to Animation
	    		console.log("INDEX " + i + " : start animation");
	    		mSkillScreen[i] = STATE_ANIMATE;
	    	}
	    }

		for (var i = 0; i < mSkillScreen.length; i++) {
			if (mSkillScreen[i] === STATE_ANIMATE) {
				if (!mSync) {
					// start animation
					mSync = true;
					setTimeout("animate(INCREMENT)", 1);
				}
			}
		}
    });
});

function setCircleColor(element, index) {
	// [0] : prec (do not use)
	// [1] : value/deg
	// [2] : valid color
	// [3] : invalid color
	var classes = element.querySelector(".prec").getAttribute("class").split(" ");

	var max_val = parseInt(classes[1], 10);
	var set_val = Math.ceil( // kiriage
		mAnimateFlame[index] * (max_val / 360));
	var validColor = "#" + classes[2];
	var invalidColor = "#" + classes[3];

	var activeBorder = element.querySelector(".active-border");
	activeBorder.style.backgroundColor = validColor;
    if (set_val <= 180) {
        activeBorder.style.backgroundImage
        	= 'linear-gradient(' + (90 + set_val) + 'deg, transparent 50%, ' + invalidColor + ' 50%),' +
			'linear-gradient(90deg, ' + invalidColor + ' 50%, transparent 50%)';
    } else {
        activeBorder.style.backgroundImage
        	='linear-gradient(' + (set_val - 90) + 'deg, transparent 50%, ' + validColor + ' 50%),' +
        	'linear-gradient(90deg, ' + invalidColor + ' 50%, transparent 50%)';
    }
}

function animate(dir){

	for (var i = 0; i < mSkillScreen.length; i++) {
		if (mSkillScreen[i] === STATE_ANIMATE) {
			if (dir === INCREMENT) {
		    	mAnimateFlame[i] += INCRIMENT_VAL;
		    	if (mAnimateFlame[i] > MAXIMUM_FRAME) {
		    		mAnimateFlame[i] = MAXIMUM_FRAME;
		    		mSkillScreen = STATE_FINISH;
		    		console.log("INDEX " + i + " : finish animation");
		    	}
		    } else if (dir === DECREMENT) {
		    	mAnimateFlame[i] -= INCRIMENT_VAL;
		    	if (mAnimateFlame[i] < 0)
		    		mAnimateFlame[i] = 0;
		    }

			for (var k = 0; k < mCircles[i].length; k++) {
				setCircleColor(mCircles[i][k], i);
			}
		}
	}

	var animate = false;
	for (var i = 0; i < mSkillScreen.length; i++) {
		if (mSkillScreen[i] === STATE_ANIMATE) {
			window.setTimeout("animate(INCREMENT)", 1);
			animate = true;
			break;
		}
	}
	if (!animate) SYNC_ANIMATION = false;    
}