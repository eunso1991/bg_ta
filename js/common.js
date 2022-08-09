
$(document).ready(function(){
    alert('이 페이지는 취업 지원을 위한 비상업적 포트폴리오 용도로 사용됨을 알려드립니다.');
    preventDefaultAnchor();

    setGNB();
    map_line_ani(); 
    setImageSlide_01('.slide_first', 1, true, 5000);
    setImageSlide_02('.slide_second', 1, true, 5000);

    $('.slider > li').each(function(){      
      $this = $(this);
      $this.find('.char').each(function(i) {
        this.style.setProperty("--char-index", i);
      });
    });

    $('#main_invest .word').each(function(){      
      $this = $(this);
      $this.find('.char').each(function(i) {
        this.style.setProperty("--char-index", i);
      });
    });

    $('#main_best .word').each(function(){      
      $this = $(this);
      $this.find('.char').each(function(i) {
        this.style.setProperty("--char-index", i);
      });
    });

    $('.sub_visual .title').each(function(){      
      $this = $(this);
      $this.find('.char').each(function(i) {
        this.style.setProperty("--char-index", i);
      });
    });
     
    function map_line_ani(){
      var $path = $('.map_blue_line path');
      var $paths1 = $('.line-ani1');
      var $paths2 = $('.line-ani2');
      svg_ani = new TimelineMax({repeat: -1, repeatDelay: 0, delay: 0.5});
      svg_ani.set($path,{drawSVG:"0%"}).to($paths1, 1, {drawSVG:"100%", ease: Power3.easeOut}).to($paths2, 2, {drawSVG:"100%", ease: Power3.easeOut}).to($path, 0.5, {"opacity":0, ease: Power3.easeOut});

      svg_ani.play();
    }  
});

$(window).on('scroll resize', function() {
    var scrollTop = $(window).scrollTop();
    
    if(scrollTop > 0) {
      $('.header').addClass('fixed');
      
    }else {
      $('.header').removeClass('fixed');
    }
});

function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
  val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
  return val;
}

function setGNB() {
  var timerIdFocus = '';

  // 이벤트 동작(접근성 고려)
  $('.pc .gnb .gnb_area > ul > li').on('mouseenter focusin', function() {
    
    if ($(window).width() < 1220.1) return false;
    var index = $('.pc .gnb .gnb_area > ul > li').index($(this));
    clearTimeout(timerIdFocus);
    showSub(index + 1);
  }).on('mouseleave focusout', function() {
    if ($(window).width() < 1220.1) return false;
    timerIdFocus = setTimeout(function() {removeAll();}, 100);
  });

  // 해당 Sub 메뉴 표시 (1, 2, ..., n)
  function showSub(n) {
    var $target = $('.pc .gnb .gnb_area > ul > li:eq(' + (n - 1) + ')');
    var heightNew = 0;
    
    $target.find('div.item > *').each(function() {
    heightNew += $(this).outerHeight(true);    
      
  });

  // 주변 GNB 닫은 후 표시
  $('.header.pc').addClass('hover');
    $target.siblings().removeClass('on');
    $target.siblings().find('div.item').css({'transition':'none', 'height': 0});
    $target.addClass('on');
    $target.find('div.item').css({'height': heightNew + 'px'});
  }

  // 모든 서브메뉴 제거  
  function removeAll() {
    $('.header.pc').removeClass('hover');
    $('.pc .gnb .gnb_area > ul > li').removeClass('on');
    $('.pc .gnb div.item').css({'transition': 'none', 'height': 0});    
  }
 
  $('.mobile .gnbM_btn').on('click', function() {
    $(this).toggleClass('active');
    $('.mobile .gnb').toggleClass('m_open');
    $('body').toggleClass('is-open');
  });  

  
  $('.mobile .gnb .gnb_area > ul > li > a').on('click', function(e) {
    if ($(window).width() < 1220.1 && $(this).next('.item').length > 0) {  
      e.preventDefault();
      $(this).parent().addClass('on');
      $(this).next('.item').find('.sub_2depth_wrap li').css({'height': '45px'});
      $(this).parent().siblings().removeClass('on');
      $(this).parent().siblings().find('li').css({'height': '0px'});
    }
  });
}

function setImageSlide_01(selector, first, status, speed) {
 
    $(selector).each(function() {
      var $selector = $(this);
      var numSlide = $selector.find('.slider > li').length;
      var slideNow = 0;
      var slidePrev = 0;
      var slideNext = 0;
      var slideFirst = first;
      var timerSpeed = speed; 
      var count = 0;
      var countId = '';
      var isCounterOn = status;
      var offsetTop = 0;
      var onAnimation = false;
      var onAnimation_num = false;
  
      if (isCounterOn === true) {
        $selector.find('.slide_control_wrap a.play').addClass('on');
      } else {
        $selector.find('.slide_control_wrap a.play').removeClass('on');
      }  
      
      showSlide(slideFirst);       
      
      $selector.find('.slide_control_wrap a.prev').on('click', function() {
        //showSlide(slidePrev);        
        showPrev_numSlide(slidePrev);

        count = 0;
        if (isCounterOn === true) {
            return false;            
        } else {
        countId = setInterval(function() {
            count += 1;
            if(count === 50){
                clearTimeout(countId);
            }
            loading_bar();
        }, 100); 
        }
          
      });
  
      $selector.find('.slide_control_wrap a.next').on('click', function() {      
        //showSlide(slideNext);
        console.log('hi1')
        showNext_numSlide(slideNext);
        count = 0;
        if (isCounterOn === true) {
            return false;
        } else {
          countId = setInterval(function() {
            count += 1;
              
            if(count === 50){
                clearTimeout(countId);
            }
            loading_bar();
          }, 100);
         
        } 
      });
  
      $selector.find('.slide_control_wrap a.play').on('click', function() {
        if (isCounterOn === true) {
          stopCounter();
        } else { 
          startCounter();                 
        }
      });  
  
      function startCounter() {
        clearTimeout(countId);
        count = 0;
        countId = setInterval(function() {
            count += 1;
            if(count === 50){
                //showSlide(slideNext);
                showNext_numSlide(slideNext); 
                count = 0;
            }
            loading_bar();
        }, 100);

        $selector.find('.slide_control_wrap a.play').addClass('on');
        isCounterOn = true;
      }
  
      function stopCounter() {
        clearTimeout(countId);
        $selector.find('span.bar').removeClass('on');
        $selector.find('.slide_control_wrap a.play').removeClass('on');     
        isCounterOn = false;
      }
  
      function resetCounter() {
        clearTimeout(countId);
       
        if (isCounterOn === true) {
            
            countId = setInterval(function() {
            count += 1;            
              if(count === 50){
                //showSlide(slideNext);
                showNext_numSlide(slideNext);
                count = 0;                
              }

              loading_bar();              
            }, 100);
        }
          
      }
  
      function showSlide(n) {
        resetCounter();
        if (slideNow === 0) {         
          $selector.find('.slider li').removeClass('on');
          $selector.find('.slider li:eq(' + (n - 1) + ')').addClass('on');
        } else {
           
            $selector.find('.slider li').removeClass('on');
            $selector.find('.slider li:eq(' + (n - 1) + ')').addClass('on');
        }

        slideNow = n;
        slidePrev = (n === 1) ? numSlide : (n - 1);
        slideNext = (n === numSlide) ? 1 : (n + 1);
        //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
      }

      function loading_bar(){
        $('.count_txt.count1').text(count);
        // var loading_val = (100 * count )/ 50
        // $('.indicator li .counter').css({'width':0+'%'});
        // $('.indicator li.on .counter').css({'width':loading_val+'%'});
      }

      function showNext_numSlide(n) {
       
        resetCounter();
        if (slideNow === n || onAnimation === true) return false;
        var clone = $selector.find('.numSlide > li:eq(0)').clone();
        $selector.find('.numSlide').append(clone);
        offsetTop += 100;
        onAnimation = true;
        showSlide(n);
        $selector.find('.numSlide').animate({'top': -offsetTop + '%'},1200,function(){
          $selector.find('.numSlide > li:eq(0)').remove();
          offsetTop -= 100;
          $selector.find('.numSlide').css({'top': -offsetTop + '%'});
          onAnimation = false;
        });
      }

      function showPrev_numSlide(n) {
       
        if (slideNow === n || onAnimation === true) return false;
        var clone = $selector.find('.numSlide > li:eq(' + (numSlide - 1) + ')').clone();
        $selector.find('.numSlide > li:eq(' + (numSlide - 1) + ')').remove();
        $selector.find('.numSlide').prepend(clone);
        offsetTop -= 100;
        onAnimation = true;
        showSlide(n);
        $selector.find('.numSlide').css({'top': offsetTop + '%'});
        offsetTop += 100;
        $selector.find('.numSlide').animate({'top': offsetTop + '%'},1200,function(){
          onAnimation = false;
        });
        
      }
    });
}

function setImageSlide_02(selector2, first, status, speed) {
  $(selector2).each(function() {
    var $selector = $(this);
    var numSlide = $selector.find('.slide02 > li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var slideFirst = first;
    var timerSpeed = speed; 
    var count = 0;
    var countId = '';
    var isCounterOn = status;
    var offsetTop = 0;
    var onAnimation = false;
    var onAnimation_num = false;

    if (isCounterOn === true) {
      $selector.find('.slide_control_wrap a.play').addClass('on');
    } else {
      $selector.find('.slide_control_wrap a.play').removeClass('on');
    }  
    
    showSlide(slideFirst); 
    
    $selector.find('.slide_control_wrap a.prev').on('click', function() {      
 
      //showSlide(slidePrev);        
      showPrev_numSlide(slidePrev);

      count = 0;
      if (isCounterOn === true) {
          return false;            
      } else {
      countId = setInterval(function() {
          count += 1;
          if(count === 50){
              clearTimeout(countId);
          }
          loading_bar();
      }, 100); 
      }
        
    });

    $selector.find('.slide_control_wrap a.next').on('click', function() {      
      //showSlide(slideNext);
      console.log('hi2')
      showNext_numSlide(slideNext);
      count = 0;
      if (isCounterOn === true) {
          return false;
      } else {
        countId = setInterval(function() {
          count += 1;
            
          if(count === 50){
              clearTimeout(countId);
          }
          loading_bar();
        }, 100);       
      } 
    });

    $selector.find('.slide_control_wrap a.play').on('click', function() {
      if (isCounterOn === true) {
        stopCounter();
      } else { 
        startCounter();                 
      }
    });  

    function startCounter() {
      clearTimeout(countId);
      count = 0;
      countId = setInterval(function() {
          count += 1;
          if(count === 50){
              //showSlide(slideNext);
              showNext_numSlide(slideNext); 
              count = 0;
          }
          loading_bar();
      }, 100);

      $selector.find('.slide_control_wrap a.play').addClass('on');
      isCounterOn = true;
    }

    function stopCounter() {
      clearTimeout(countId);
      $selector.find('span.bar').removeClass('on');
      $selector.find('.slide_control_wrap a.play').removeClass('on');     
      isCounterOn = false;
    }

    function resetCounter() {
      clearTimeout(countId);
     
      if (isCounterOn === true) {
          
          countId = setInterval(function() {
          count += 1;            
            if(count === 50){
              //showSlide(slideNext);
              showNext_numSlide(slideNext);
              count = 0;                
            }

            loading_bar();              
          }, 100);
      }
        
    }

    function showSlide(n) {
      resetCounter();
      if (slideNow === 0) {         
        $selector.find('.slider li').removeClass('on');
        $selector.find('.slider.slide01 li:eq(' + (n - 1) + ')').addClass('on');
        $selector.find('.slider.slide02 li:eq(' + (n - 1) + ')').addClass('on');
      } else {
         
          $selector.find('.slider li').removeClass('on');
          $selector.find('.slider li:eq(' + (n - 1) + ')').addClass('on');
          $selector.find('.slider.slide02 li:eq(' + (n - 1) + ')').addClass('on');
      }

      slideNow = n;
      slidePrev = (n === 1) ? numSlide : (n - 1);
      slideNext = (n === numSlide) ? 1 : (n + 1);
      console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext + ' / ' + numSlide);
    }

    function loading_bar(){
      $('.count_txt.count2').text(count);
      // var loading_val = (100 * count )/ 50
      // $('.indicator li .counter').css({'width':0+'%'});
      // $('.indicator li.on .counter').css({'width':loading_val+'%'});
    }

    function showNext_numSlide(n) {
     
      resetCounter();
      if (slideNow === n || onAnimation === true) return false;
      var clone = $selector.find('.numSlide > li:eq(0)').clone();
      $selector.find('.numSlide').append(clone);
      offsetTop += 100;
      onAnimation = true;
      showSlide(n);
      $selector.find('.numSlide').animate({'top': -offsetTop + '%'},1200,function(){
        $selector.find('.numSlide > li:eq(0)').remove();
        offsetTop -= 100;
        $selector.find('.numSlide').css({'top': -offsetTop + '%'});
        onAnimation = false;
      });
    }

    function showPrev_numSlide(n) {
     
      if (slideNow === n || onAnimation === true) return false;
      var clone = $selector.find('.numSlide > li:eq(' + (numSlide - 1) + ')').clone();
      $selector.find('.numSlide > li:eq(' + (numSlide - 1) + ')').remove();
      $selector.find('.numSlide').prepend(clone);
      offsetTop -= 100;
      onAnimation = true;
      showSlide(n);
      $selector.find('.numSlide').css({'top': offsetTop + '%'});
      offsetTop += 100;
      $selector.find('.numSlide').animate({'top': offsetTop + '%'},1200,function(){
        onAnimation = false;
      });
      
    }
  });
}
