
$(document).ready(function(){
    
    $('.slide > li:eq(0) .word .char').each(function(i){
        $(this).find('.char')
        this.style.setProperty("--char-index", i)
    });

    $('.slide > li:eq(1) .word .char').each(function(i){
        $(this).find('.char')
        this.style.setProperty("--char-index", i)
    });

    $('.slide > li:eq(2) .word .char').each(function(i){
        $(this).find('.char')
        this.style.setProperty("--char-index", i)
    });

    $('.slide > li:eq(3) .word .char').each(function(i){
        $(this).find('.char')
        this.style.setProperty("--char-index", i)
    });

    setImageSlide('.image_slide', 1, true, 5000);
});

function setImageSlide(selector, first, status, speed) {
    $(selector).each(function() {
      var $selector = $(this);
      var numSlide = $selector.find('.slide > li').length;
      var slideNow = 0;
      var slidePrev = 0;
      var slideNext = 0;
      var slideFirst = first;
      //var timerId = '';
      var timerSpeed = speed;
      //var isTimerOn = status;  
      var count = 0;
      var countId = null;
      var isCounterOn = status;
       
  
      $selector.find('.slide > li').each(function(i) {
        //$(this).css({'left': (i * 100) + '%', 'display': 'block'});
        $selector.find('.indicator').append('<li><a href="#">' + ('0'+ (i + 1)) + '</a><span class="bar"><i class="counter"></i></span></li>\n');
      });  
  
      if (isCounterOn === true) {
        $selector.find('.slide_control_wrap a.play').addClass('on');
      } else {
        $selector.find('.slide_control_wrap a.play').removeClass('on');
      }
  
      
      showSlide(slideFirst);
  
      $selector.find('.indicator li a').on('click', function() {
        var index = $selector.find('.indicator li').index($(this).parent());
        showSlide(index + 1);        
        
      });
      
      /*
      $selector.find('.slide li a').on('focus', function() {
        var index = $selector.find('.slide li').index($(this).parent());
        $selector.find('div.box').scrollLeft(0);
        showSlide(index + 1);      
      });       
      */
      $selector.find('.slide_control_wrap a.prev').on('click', function() {
        $(this).find('img').stop(true).animate({'left': '-10px'}, 30).animate({'left': '0px'}, 100);
        showSlide(slidePrev);
        if (isCounterOn === true) {
          count = 0;
          $('.count_txt').text(count);
          var loading_val = (100 * count )/ 50
          $('.indicator li .counter').css({'width':0+'%'});
          $('.indicator li.on .counter').css({'width':loading_val+'%'});
        }
      });
  
      $selector.find('.slide_control_wrap a.next').on('click', function() {
        $(this).find('img').stop(true).animate({'right': '-10px'}, 30).animate({'right': '0px'}, 100);
        showSlide(slideNext);
        if (isCounterOn === true) {
          count = 0;
          $('.count_txt').text(count);
          var loading_val = (100 * count )/ 50
          $('.indicator li .counter').css({'width':0+'%'});
          $('.indicator li.on .counter').css({'width':loading_val+'%'});
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
          countId = setInterval(function() {
              count += 1;
              
              if(count === 50){
                showSlide(slideNext);
                count = 0;
              }
              $('.count_txt').text(count);
              var loading_val = (100 * count )/ 50
              $('.indicator li .counter').css({'width':0+'%'});
              $('.indicator li.on .counter').css({'width':loading_val+'%'});
             
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
                showSlide(slideNext);
                count = 0;
              }
  
              $('.count_txt').text(count);
              var loading_val = (100 * count )/ 50
              $('.indicator li .counter').css({'width':0+'%'});
              $('.indicator li.on .counter').css({'width':loading_val+'%'});
            }, 100);
        }
          
      }
  
      function showSlide(n) {
        resetCounter();
        if (slideNow === 0) {
          //$selector.find('.slide').css({'transition': 'none', 'left': (-(n - 1) * 100) + '%'});
          $selector.find('.slide li').removeClass('on');
          $selector.find('.slide li:eq(' + (n - 1) + ')').addClass('on');
        } else {
            $selector.find('.slide li').removeClass('on');
            $selector.find('.slide li:eq(' + (n - 1) + ')').addClass('on');
        }
        $selector.find('.indicator li').removeClass('on');
        $selector.find('.indicator li:eq(' + (n - 1) + ')').addClass('on');
        slideNow = n;
        slidePrev = (n === 1) ? numSlide : (n - 1);
        slideNext = (n === numSlide) ? 1 : (n + 1);
        console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
      }
      
    });
  }