/* Initialisers
-------------------------------*/
	$(function() {

		/* Global vars */
			/* media queries */
			mq_red = '(min-width: 1300px)';
			mq_orange = '(min-width: 992px) and (max-width: 1299px)';
			mq_purple = '(max-width: 991px)';
			mq_yellow = '(min-width: 768px) and (max-width: 991px)';
			mq_green = '(max-width: 767px)';
			mq_blue = '(max-width: 479px)';
			/* animation speed */
			anSp = 500;
			anSpFast = 400;
			
			/* navigation */
			isMobileNav = false;
			mobileNav = '';

			/* forms */
			forms = $('form, .form');
			MasterHeader = $('.master-header');
			SubHeader = $('.sub-pg-header');
			Appfooter = $('.app-footer');
			splash =$('.splash');
			horizontalTab =$('#horizontalTab');
			//HeroBanner =$('.flexslider');
			//BookingSelTop = $('.booking-sel-box');
			AccordionBox = $('.accordion-style');
			//ImgFit = $('.img-fit');

		checkMQs();
		checkFeatures();

		/**********/
		
		//if(MasterHeader.length){initMasterHeader();}
		if(SubHeader.length){initSubHeader();}
		if(splash.length){initSplash();}
		//adjustMenu();
        if(!splash.length){initShowContent()}  
        if(AccordionBox.length){initAccordionBox();}
	});
	
	$(window).resize(function(){
		waitForFinalEvent(function(){
			sizeOrientationChange();
		}, 100, 'main resize');   
        if(MasterHeader.length){initMasterHeader();}
		if(SubHeader.length){initSubHeader();}
	});

	if (!window.addEventListener) {
		window.attachEvent('orientationchange', sizeOrientationChange);
	}else {
		window.addEventListener('orientationchange', sizeOrientationChange, false);
	}

			
//* initSplash()****//
$('.splash').click(function(){
    initSplashRemove();
});
var initSplash = function() {
        splash.animate({opacity:"1"},5000, function(){
           initSplashRemove();
            //alert('hi');
       });
}

var initSplashRemove  = function() {
    if(splash.length){
        $(splash).removeClass('splash');
           $('.splash-bg').slideUp(function(){
               if(MasterHeader.length){initMasterHeader();}
               if(SubHeader.length){initSubHeader();}
              $('.main-content').animate({'opacity':1},500);
           });
    }
    else{
        $(splash).removeClass('splash');
           $('.splash-bg').fadeOut(function(){
               if(MasterHeader.length){initMasterHeader();}
               if(SubHeader.length){initSubHeader();}
              $('.main-content').animate({'opacity':1},500);
           });
    }
}

//* initMasterHeader****//
var initMasterHeader = function() {
    $(".main-content").css({'padding-top':($("header").height())})
      if(Appfooter.length){
          //var ViewPortHeight = $(window).height()-($("header").height()+$("footer").height());
         // $(".main-content").height(ViewPortHeight);
          $(".main-content").css({'padding-bottom':($("footer").height())});
      }
    else{
         //var ViewPortHeight = $(window).height()-($("header").height());
          //$(".main-content").height(ViewPortHeight);
        $(".main-content").css({'padding-bottom':($("footer").height())});
    }
   adjustMasterMenu();
}

//*showContent****//
var initShowContent = function(){
    initSplashRemove();     
}

//* initSubHeader****//
var initSubHeader = function() {
      $(".main-content").css({'padding-top':($("header").height())});
      if(Appfooter.length){
          //var ViewPortHeight = $(window).height()-($("header").height()+$("footer").height());
          //$(".main-content").height(ViewPortHeight);
          $(".main-content").css({'padding-bottom':($("footer").height())});
      }
    else{
         //var ViewPortHeight = $(window).height()-($("header").height());
          //$(".main-content").height(ViewPortHeight);
        $(".main-content").css({'padding-bottom':($("footer").height())});
    }
}

//* adjust menu****//
var adjustMasterMenu = function() {
var $body = document.body
	, $menu_trigger = $body.getElementsByClassName('toggleMenu')[0];

	if ( typeof $menu_trigger !== 'undefined' ) {
		$menu_trigger.addEventListener('click', function() {
			$body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
		});
	}
};

$('.overlay-bg').click(function(){
    $('body').removeClass('menu-active');
} )
//$('ul#nav_menu > li:has(ul)').addClass('has-submenu');
var initAccordionBox = function(e) {}
/* Functions
-------------------------------*/

	
/* Utility
-------------------------------*/
	// fired on window orientation or size change
	function sizeOrientationChange(){
		checkMQs();
	}

	// check media query support,
	// if supported, set variables
	// if not, set 'orange' as default
	function checkMQs(){
		// returns 'true' if MQs are supported
		if(Modernizr.mq('only all')){
			mq_red_check = Modernizr.mq(mq_red);
			mq_orange_check = Modernizr.mq(mq_orange);
			mq_yellow_check = Modernizr.mq(mq_yellow);
			mq_green_check = Modernizr.mq(mq_green);
			mq_blue_check = Modernizr.mq(mq_blue);
			mq_purple_check = Modernizr.mq(mq_purple);
		}else{
			mq_red_check = false;
			mq_orange_check = true;
			mq_yellow_check = false;
			mq_green_check = false;
			mq_blue_check = false;
			mq_purple_check = false;
		}
		
		// call responsive nav (no init)
		//responsiveNav();
	}
	
	//Check device features
	function checkFeatures(){
		//touch devices
		touchEnabled = Modernizr.touch;		

		if(touchEnabled){
			//ensures that touch devices are still able to scroll up/down smoothly
			$('html, body').removeClass('no-touch').addClass('touch-mod');
		}
		
		//placeholder support
		formPlaceholders = Modernizr.input.placeholder;

		//drop shadow support
		boxShadows = Modernizr.boxshadow;

		// IE7 flag (used to disabled tours slider)
		isIE7 = $('html').hasClass('ie7');

		// IE8 flag
		isIE8 = $('html').hasClass('ie8');

		// initialise forms if they exist
		if(forms.length){
			//initForms();	
		}
	}
	
	// waits for final event to avoid multi-firing (ie: using window.resize)
	// originally from: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
	var waitForFinalEvent = (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = "Don't call this twice without a uniqueId";
			}
			if (timers[uniqueId]) {
				clearTimeout (timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();
	
function setLocation(url){
	window.location.href = url
}

/*** EQUAL HEIGHTS ***/
var $window = $(window);
//	

equalheight = function(container){
var currentTallest = 0,
	currentRowStart = 0,
	rowDivs = new Array(),
	$elm,
	topPosition = 0;
 $(container).each(function() {

   $elm = $(this);
   $($elm).height('auto')
   topPostion = $elm.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $elm.height();
     rowDivs.push($elm);
   } else {
     rowDivs.push($elm);
     currentTallest = (currentTallest < $elm.height()) ? ($elm.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(window).load(function() {
	equalheight('.equal-heights > div, .equal-heights > ul, ul.equal-heights > li, .equal-heights > a');
});

$(window).resize(function(){
	equalheight('.equal-heights > div, .equal-heights > ul, ul.equal-heights > li, .equal-heights > a');
});


$('#HorizontalTabs').easyResponsiveTabs({
   type: 'default', //Types: default, vertical, accordion           
   width: 'auto', //auto or any width like 600px
   fit: true   // 100% fit in a container
});


/*** Faqs ***/
var initAccordionBox = function(e) {
$('.faqslist dt').click(function(){
   var FaqAns = $(this).next('dd')
   $(this).next(FaqAns).slideToggle();
   $(this).toggleClass('active');
});
}

/** required Fields **/
$('.req-field').each(function(){
					var $this = $(this), ReqHolder = $this.find('.holder'), thisText = $this.find('input').val(), thisfield = $this.find("input");
					// initialisation
					if(thisText.length){ReqHolder.fadeOut();}
					else{ReqHolder.fadeIn();}
					//focus
					thisfield.focus(function(){ReqHolder.fadeOut();	}).focusout(function(){
						if($this.find('input').val().length){ReqHolder.fadeOut();}
						else{ReqHolder.fadeIn();}
					});
});	