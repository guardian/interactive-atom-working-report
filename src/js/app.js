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

    for (var i = 0; i<textSlides.length; i++) {
        var textSlide = textSlides[i];
        var visible = checkVisible(textSlide);
        if (visible) {
            textSlide.classList.add('on');
        } else {
            textSlide.classList.remove('on');
        }
    }
};


function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  // var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  var viewHeight = window.innerHeight;
  return !(rect.bottom < 0 || rect.top - viewHeight >= -viewHeight/2);
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

function init() {
    scrolling();
}

init();
