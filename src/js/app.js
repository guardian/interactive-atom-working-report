import xr from 'xr'
import Mustache from 'mustache'

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    var isVisible = (elemTop <= window.innerHeight / 2) && (elemBottom >= window.innerHeight / 2);
    console.log();
    return isVisible;
}

window.onscroll = function() {
    var wrapper = document.querySelector('body');
    var textSlides = document.querySelectorAll('.working-report__chapter-content');
    var menuItem = document.getElementsByClassName('working-report__menu-item');

    for (var i = 0; i<textSlides.length; i++) {
        var textSlide = textSlides[i];
        var visible = checkVisible(textSlide);
        if (visible) {
            var imgs = textSlide.querySelectorAll('img.wr-desktop-images');
            var imgCount = imgs.length;

            if (imgCount>0) {
                var step = textSlide.clientHeight/imgCount;
                var imgNum = Math.max(0, Math.floor(visible/step));

                for (var j = 0; j<imgs.length; j++) {
                    if (j==imgNum) {
                        imgs[j].classList.add('current-page');
                    } else {
                        imgs[j].classList.remove('current-page');
                    }
                }
            }

            textSlide.classList.add('on');
            menuItem[i].classList.add('on');
        } else {
            textSlide.classList.remove('on');
            menuItem[i].classList.remove('on');
        }
    }
};


function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  // var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  var viewHeight = window.innerHeight;
  if (rect.bottom < 0 || rect.top - viewHeight >= -viewHeight/2) {
      return false;
  } else {
      return -1*rect.top;
  }
}

function scrolling() {
    var container = document.getElementsByClassName('wr-section');
    var content = document.getElementsByClassName('working-report__chapter-content');
    document.addEventListener('scroll', function(){
        for(var i=0; i < container.length; i++) {
            // console.log(content);
            if(isScrolledIntoView(container[i])) {
                container[i].classList.add('inView');
            }else{
                container[i].classList.remove('inView');
            }
        }
    })
}

function menuHover() {
    var mItem = document.getElementsByClassName('working-report__menu');
    var overlay = document.getElementsByClassName('menu-screen-overlay');
    mItem[0].addEventListener('mouseover', function(){
        overlay[0].classList.add('hovering');
    });
    mItem[0].addEventListener('mouseout', function(){
        overlay[0].classList.remove('hovering');
    });
}

function init() {
    scrolling();
    menuHover();
}

init();
