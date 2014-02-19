$(window).resize(function() {
  $("body").css("width","");
  pupMakeup();
  makeup();
  makeup404();
});

$(window).load(function() {
  $("body").css("width",$("body").width()-1).css("width",$("body").width()+1);
  makeup();
  pupMakeup();
  makeup404();
});


$(window).scroll(function() {
  if ($(".fixed-menu").length) {
    if ($(window).scrollTop() > $(".main-menu-wrapper").outerHeight()) {
      $(".fixed-menu").fadeIn(150)
    } else {
      $(".fixed-menu").fadeOut(150)
    }
  }
});

$(document).ready(function () {

  makeup404();

  $(".video-thumbs .item").click(function() {
    $(".video-thumbs .act").removeClass("act");
    $(this).addClass("act");
    $(".video-item").hide();
    $(".video-item").eq($(this).prevAll(".item").length).fadeIn(150);
    return false;
  });

  if ($(".common-form select").length) $(".common-form select").customSelect();

  if ($(".slider").length) {
    $(".slider").each(function() {
      $(this).simpleSlider({
        width:640
      });
    });
  }

  if ($("input:checkbox").length) {
    $("input:checkbox").iCheck()
  }

  if ($("#places_datepicker").length) {
    $("#places_datepicker").datepicker({
      altField: $("#places_date"),
      altFormat: "dd-mm-yy",
      firstDay: 1
    });
    //$("#places_datepicker").datepicker( "setDate", "10/12/2012" );
  }
  
  if ($("#date_popup_date").length) {
    $("#date_popup_date").datepicker({
      dateFormat: "dd    mm     yy",
      firstDay: 1,
      beforeShow: function(input,inst) {
        $('#ui-datepicker-div').addClass(this.id);
      }
    });
    
    $("#date_popup_date").click(function() {
      $(this).closest(".placeholder").css("left",-5000);
    });
    
    $("#datePopup .placeholder").click(function() {
      $(this).css("left",-5000);
    });
    
  }
  
  
  

  if ($(".place-specs").length) {
    $(".place-specs .ico").tooltip({
      position: {
        my: "center bottom-19",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "tooltip-arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });

  }
  
  if ($(".place-capacity").length) {
    $(".place-capacity .ico").tooltip({
      position: {
        my: "center bottom-10",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "tooltip-arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });

  }

  if ($(".places-item").length) {
    $(".places-item a").hover(function(e) {
      $(this).closest(".places-item").toggleClass("places-item-hover")
    });
  }

  if ($(".wedding-gallery").length) {
    $(".wedding-gallery").each(function() {
      var picCont = $(this).find(".big-pic");
      var thumbs = $(this).find(".thumbs a");
      picCont.html("<img src='"+ thumbs.eq(0).attr("href") +"' />");
      thumbs.click(function() {
        picCont.html("<img style='display:none' src='"+ $(this).attr("href") +"' />");
        picCont.find("img").fadeIn(250);
        return false;
      });
    });
  }

  $(".banket-item .tooltip-link").click(function() {
    var tooltip = $(this).closest("li").find(".tooltip");
    // $(".banket-items .tooltip").not(tooltip).fadeOut(150);
    // tooltip.fadeToggle(150);
    
    if (!$(this).hasClass("tooltip-link-act")) {
      $(".pup-tooltip").remove();
      $(".tooltip-link-act").removeClass("tooltip-link-act");
      $(this).addClass("tooltip-link-act");
    
    
      if (tooltip.parents().hasClass("banket-item-1")) className = "pup-tooltip-1";
      if (tooltip.parents().hasClass("banket-item-2")) className = "pup-tooltip-2";
      if (tooltip.parents().hasClass("banket-item-3")) className = "pup-tooltip-3";
      
      $("body").append("<div class='pup-tooltip " + className + "' style='display:none;'>" + tooltip.html() + "</div>");
      
      var pupTooltip = $(".pup-tooltip");
      
      if (tooltip.parents().hasClass("banket-item-1")) {
        pupLeft = $(this).offset().left - 80;
        bgPos = "107px 0";
      }
      if (tooltip.parents().hasClass("banket-item-2")) {
        pupLeft = $(this).offset().left + 105 - 20 - pupTooltip.width()/2;
        bgPos = "center 0";
      }
      if (tooltip.parents().hasClass("banket-item-3")) {
        pupLeft = $(this).offset().left + 270 - 20 - pupTooltip.width();
        bgPos = pupTooltip.width() - 222 + "px 0";
      }

      
      
      pupTooltip.css("left",pupLeft).css("top",$(this).offset().top + $(this).height() + 10).css("background-position",bgPos).fadeIn(250);
    
    }
    
  })
  
  $(document).on("click",function(event) {
    if (!$(event.target).hasClass("pup-tooltip") && !$(event.target).hasClass("tooltip-link-act")) {
      $(".pup-tooltip").fadeOut(150,function() {
        $(".pup-tooltip").remove();
        $(".tooltip-link-act").removeClass("tooltip-link-act");
      })
    }
  });
  
  $("body").on("click",".pup-tooltip .close",function() {
    $(".pup-tooltip").fadeOut(150,function() {
      $(".pup-tooltip").remove();
      $(".tooltip-link-act").removeClass("tooltip-link-act");
    })
  });

  $(".tabbed-content").each(function() {
    var tabs = $(this).children(".tabs").find(".tab");
    var tabContents = $(this).children(".tabs-content").children(".tab-content");
    
    if (!tabs.hasClass("act")) {
      tabs.first().addClass("act");
    }
    
    tabContents.hide();
    tabContents.filter("[rel='"+tabs.filter(".act").attr("rel")+"']").show();
    
    tabs.click(function() {
      tabs.removeClass("act");
      $(this).addClass("act");
      
      tabContents.hide();
      
      tabContents.filter("[rel='"+$(this).attr("rel")+"']").fadeIn(250);
      
    });
  
  });
  

  $("a.anchor-link").click(function() {
    
    $("html,body").animate({
      scrollTop: $("a[name='"+$(this).attr("href").replace("#","")+"']").offset().top - 20
    },1000);
    
    return false;
  });
  
  if ($(".main-slider").length) {
    $(".main-slider").mainSlider();
  }
  
  if ($(".menu-slider").length) {
    $(".menu-slider").mainSlider();
  }
  
  $(".people-slider").each(function() {
    $(this).slider({
      step: 10,
      range: "min",
      min: 50,
      max: 5000,
      animate: "slow",
      create: function( e, ui ) {
        var sldr = $(this);
        $(this).parents(".slider-wrapper").append("<div class='begin-link' />");
        $(this).parents(".slider-wrapper").append("<div class='end-link' />");
        var val=$(this).slider('value');
        $(this).find(".ui-slider-handle").html(val);
        $(this).find(".ui-slider-handle").formatNumber();
        $(this).parents(".calc-l").find(".area-val").html(parseFloat($(this).attr("areafactor"))*parseInt(val));
        $(this).parents(".calc-l").find(".area-val").formatNumber();
        $(this).parents(".slider-wrapper").find(".begin-link").on("click",function() {
          sldr.slider("value",sldr.slider("option","min"))
        });
        $(this).parents(".slider-wrapper").find(".end-link").on("click",function() {
          sldr.slider("value",sldr.slider("option","max"))
        });
      },
      slide: function(event, ui) {
        val = ui.value;
        $(this).find(".ui-slider-handle").html(val);
        $(this).find(".ui-slider-handle").formatNumber();
        $(this).parents(".calc-l").find(".area-val").html(parseFloat($(this).attr("areafactor"))*parseInt(val));
        $(this).parents(".calc-l").find(".area-val").formatNumber();
        $(this).parents(".calc-l").find(".price-val").html(parseInt(val)*parseInt($(this).parents(".calc-l").find(".price-slider").slider('value')));
        $(this).parents(".calc-l").find(".price-val").formatNumber();
      }
    });
  });
  
  $(".price-slider").each(function() {
    $(this).slider({
      step: 10,
      range: "min",
      min: 1000,
      max: 4500,
      animate: "slow",
      create: function( e, ui ) {
        var sldr = $(this);
        $(this).parents(".slider-wrapper").append("<div class='begin-link' />");
        $(this).parents(".slider-wrapper").append("<div class='end-link' />");
        var val=$(this).slider('value');
        $(this).find(".ui-slider-handle").html(val);
        $(this).find(".ui-slider-handle").formatNumber();
        $(this).parents(".calc-l").find(".personprice-val").html(val);
        $(this).parents(".calc-l").find(".personprice-val").formatNumber();
        $(this).parents(".calc-l").find(".price-val").html(parseInt(val)*parseInt($(this).parents(".calc-l").find(".people-slider").slider('value')));
        $(this).parents(".calc-l").find(".price-val").formatNumber();
        $(this).parents(".slider-wrapper").find(".begin-link").on("click",function() {
          sldr.slider("value",sldr.slider("option","min"))
        });
        $(this).parents(".slider-wrapper").find(".end-link").on("click",function() {
          sldr.slider("value",sldr.slider("option","max"))
        });
      },
      slide: function(event, ui) {
        val = ui.value;
        $(this).find(".ui-slider-handle").html(val);
        $(this).find(".ui-slider-handle").formatNumber();
        $(this).parents(".calc-l").find(".personprice-val").html(val);
        $(this).parents(".calc-l").find(".personprice-val").formatNumber();
        $(this).parents(".calc-l").find(".price-val").html(parseInt(val)*parseInt($(this).parents(".calc-l").find(".people-slider").slider('value')));
        $(this).parents(".calc-l").find(".price-val").formatNumber();
      }
    });
  });
    
    
  /* --------------------------------------------------------- */

  $(".form-text").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
    }
  });

  $(".form-phone").mask("+7 (999) 999-99-99");

  validateForms();

  makeup();
  
  
});

function makeup() {

  $("input.form-submit").each(function () {
    if ($(this)[0].tagName == "INPUT" && !$(this).parents("form").find("div.form-submit").length) {
      var divBtn = $("<div></div>");
      var submit = $(this);
      divBtn.attr("class",$(this).attr("class")).attr("id",$(this).attr("id")).html("<span>" + $(this).val() + "</span>");
      $(this).after(divBtn);
      $(this).hide();
      
      if ($(this).is(":disabled")) {
        divBtn.addClass("button-disabled")
      }
      
      divBtn.on("click",function () {
        submit.click();
      });
      
      if ($(this).css("display") == "none") {
        divBtn.hide();
      }
      
    }
    
  });
  
  $("input:text, input:password, textarea").each(function() {
    $(this).addClass("initial");
    
    if ($(this).prop("tagName") == "INPUT" || $(this).prop("tagName") == "TEXTAREA") {
      // if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
      if ($(this).hasClass("form-phone")) {
        $(this).focus(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      } else {
        $(this).focus(function() {
          $(this).parents(".form-item").find(".placeholder").addClass("placeholder-initial");
        });
        $(this).keydown(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      }
      $(this).blur(function() {
        $(this).prev().prev(".placeholder").hide();
        $(this).parents(".form-item").find(".placeholder").removeClass("placeholder-initial");
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    } else {
      $(this).focus(function() {
        $(this).removeClass("initial");
        $(this).parents(".form-item").find(".placeholder").hide();
      });
      $(this).blur(function() {
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    }
      
    $(this).parents(".form-item").find(".placeholder").click(function() {
      $(this).focus();
    });
    
  });
  
}

function validateForms() {
  
  $(".common-form form").each(function() {
    $(this).validate({
      focusInvalid: false,
      sendForm : false,
      errorPlacement: function(error, element) {
        // element.parents(".input-wrapper").addClass("input-wrapper-error");
        if (element.attr("errortext")) {
          error.html(element.attr("errortext"))
        }
        error.insertAfter(element).wrap("<div class='error-wrapper' />");
        element.prev(".placeholder").addClass("placeholder-error")
        if (element[0].tagName == "SELECT") {
          element.parents(".form-item").find(".param-selector").addClass("param-sel-error")
        }
      },
      unhighlight: function(element, errorClass, validClass) {
        // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
        $(element).removeClass(errorClass);
        $(element).next(".error-wrapper").remove();
        $(element).prev(".placeholder").removeClass("placeholder-error");
        if ($(element)[0].tagName == "SELECT") {
          $(element).parents(".form-item").find(".param-selector").removeClass("selector-error")
        }
      },
      invalidHandler: function(form, validatorcalc) {
          var errors = validatorcalc.numberOfInvalids();
          if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {                    
              validatorcalc.errorList[0].element.focus();
          }
      }
    });
    
    if ($(this).find(".form-email").length) {
      $(this).find(".form-email").rules('add', {
        email: true,
        messages: {
          required:  "Введите правильный адрес!"
        }
      });
    }
    
    if ($(this).find(".form-date").length) {
      $(this).find(".form-date").rules('add', {
        messages: {
          required:  "Выберите дату!"
        }
      });
    }
    
    if ($(this).find(".form-email").length && $(this).find(".form-phone").length) {
      var thisField = $(this).find(".form-phone");
      var relatedField = $(this).find(".form-email");
      thisField.rules('add', {
        required: function(element) {
          if (relatedField.val() == "") {
            return true;
          } else {
            return false;
          }
        }
      });
      var thisField2 = $(this).find(".form-email");
      var relatedField2 = $(this).find(".form-phone");
      thisField2.rules('add', {
        required: function(element) {
          if (relatedField2.val() == "") {
            return true;
          } else {
            return false;
          }
        }
      });
    }
    
  });  
    
}

function closePopup() {
  $(".tint").fadeTo(500,0,function() {
    $(this).remove();
  });
  $(".popup-act").removeClass("popup-act").fadeTo(300,0,function() {
    $(this).hide();
  });
}

function pupMakeup() {
  var popup = $(".popup-act");
  var pupTop = $(window).scrollTop() + ($(window).height() - popup.outerHeight(true))/2;
  if (pupTop < $(window).scrollTop() + 20) pupTop = $(window).scrollTop() + 20;  $(".tint").css("height",$(window).height()).css("width",$("body").width());
  if (!popup.hasClass("price-popup")) {
    popup.css("top",pupTop).css("left",($(window).width()-popup.outerWidth(true))/2 - 20);
  } else {
    popup.css("margin-top",$(window).scrollTop() - popup.parent().offset().top - popup.parent().outerHeight(true) + ($(window).height()-popup.outerHeight(true))/2);
  }
  
}

function openPopup(pupId) {
  var popup = $("#"+pupId);
  $("body").append("<div class='tint' style='display:none;' />");
  popup.addClass("popup-act").fadeTo(500,1);
  
  $(".tint").fadeTo(300,1);
  pupMakeup();
  
  if (!popup.children(".popup-shadow").length) {
    popup.append("<div class='popup-shadow' />");
  } 
  
  jQuery(document).keydown(function(e){
    if (e == null) { // ie
      keycode = event.keyCode;
    } else { // mozilla
      keycode = e.which;
    }
    
    if(keycode == 27){ // escape, close box
      closePopup()
    }
    
  });
  
  $(".tint").on("click", function () {
    closePopup()
  });
  
  $(".popup .close, .popup .cancel").on("click", function () {
    closePopup()
  });
}

jQuery.extend(jQuery.validator.messages, {
    required: "Заполните поле!",
    remote: "Please fix this field.",
    email: "Введите правильный e-mail",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

(function( jQuery ) {
  jQuery.fn.mainSlider = function() {
  
  
    var slider = $(this);
    var slides = slider.find(".slide");
    var sliderSize = slides.size();
    
    slides.hide();
    slides.eq(0).show().addClass("slide-act");
    
    //sliderMakeup();
    
    var listerDescr = slider.find(".lister-descr");
    
    listerDescr.html(slides.eq(0).find(".descr").html());
    
    if (sliderSize > 1) {
    
      slides.bind("click",function () {
        if (listerItems.filter(".act").next().length) {
          listerItems.filter(".act").next().click();
        } else {
          listerItems.eq(0).click();
        }
      });
      
      var listerItems = slider.find(".lister-item");
      
      // slider.find(".slides").after("<div class='next' />");
      // slider.find(".slides").after("<div class='prev' />");
      
      var prevBtn = slider.find(".prev");
      var nextBtn = slider.find(".next");
      
      nextBtn.click(function() {
        curIndex = parseInt(slider.find(".slide-act").prevAll(".slide").length)
        slides.fadeOut(500).removeClass("slide-act");
        if (curIndex < sliderSize-1) {
          curIndex++;
        } else {
          curIndex = 0;
        }
        slides.eq(curIndex).fadeIn(500).addClass("slide-act");
        listerDescr.html(slides.eq(curIndex).find(".descr").html());
        listerDescr.hide().fadeIn(250);
      });
      
      prevBtn.click(function() {
        curIndex = parseInt(slider.find(".slide-act").prevAll(".slide").length)
        slides.fadeOut(500).removeClass("slide-act");
        if (curIndex > 0) {
          curIndex--;
        } else {
          curIndex = slides.length-1;
        }
        slides.eq(curIndex).fadeIn(500).addClass("slide-act");
        listerDescr.html(slides.eq(curIndex).find(".descr").html());
        listerDescr.hide().fadeIn(250);
      });
      
      
      
      // listerItems.click(function() {
        // var index = slider.find(".slide[rel='"+$(this).attr("rel")+"']").first().prevAll(".slide").length;
        // slides.fadeOut(500).removeClass("slide-act");
        // slides.eq(index).fadeIn(500).addClass("slide-act");
        // listerItems.removeClass("act");
        // $(this).addClass("act");
      // });
      
    }
    
  }
})( jQuery );

(function( jQuery ) {
  jQuery.fn.menuSlider = function() {
  
  
    var slider = $(this);
    var slides = slider.find(".slide");
    var sliderSize = slides.size();
    
    slides.hide();
    slides.eq(0).show().addClass("slide-act");
    
    //sliderMakeup();
    
    if (sliderSize > 1) {
    
      slides.bind("click",function () {
        if (listerItems.filter(".act").next().length) {
          listerItems.filter(".act").next().click();
        } else {
          listerItems.eq(0).click();
        }
      });
      
      var listerItems = slider.find(".lister-item");
      
      slider.find(".slides").after("<div class='next' />");
      slider.find(".slides").after("<div class='prev' />");
      
      var prevBtn = slider.find(".prev");
      var nextBtn = slider.find(".next");
      
      nextBtn.click(function() {
        curIndex = parseInt(slider.find(".slide-act").prevAll(".slide").length)
        slides.fadeOut(500).removeClass("slide-act");
        if (curIndex < sliderSize-1) {
          curIndex++;
        } else {
          curIndex = 0;
        }
        slides.eq(curIndex).fadeIn(500).addClass("slide-act");
        listerItems.removeClass("act");
        listerItems.filter("[rel='"+slides.eq(curIndex).attr("rel")+"']").addClass("act")
      });
      
      prevBtn.click(function() {
        curIndex = parseInt(slider.find(".slide-act").prevAll(".slide").length)
        slides.fadeOut(500).removeClass("slide-act");
        if (curIndex > 0) {
          curIndex--;
        } else {
          curIndex = slides.length-1;
        }
        slides.eq(curIndex).fadeIn(500).addClass("slide-act");
        listerItems.removeClass("act");
        listerItems.filter("[rel='"+slides.eq(curIndex).attr("rel")+"']").addClass("act")
      });
      
      
      
      listerItems.click(function() {
        var index = slider.find(".slide[rel='"+$(this).attr("rel")+"']").first().prevAll(".slide").length;
        slides.fadeOut(500).removeClass("slide-act");
        slides.eq(index).fadeIn(500).addClass("slide-act");
        listerItems.removeClass("act");
        $(this).addClass("act");
      });
      
    }
    
  }
})( jQuery );


(function( $ ) {
  $.fn.formatNumber = function() {
    var obj = $(this);
    obj.each(function () {
      if ($(this).val()) {
        number = $(this).val();
      } else {
        number = $(this).html();
      }
      
      number += '';
      number = number.replace(/\s/g, '');
      x = number.split('.');
      x1 = x[0];
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
      }
      
      if ($(this).val()) {
        $(this).val(x1);
      } else {
        $(this).html(x1);
      }
    });
    
  };
})( jQuery );

function fNum(number) {
  number += '';
  number = number.replace(/\s/g, '');
  x = number.split('.');
  x1 = x[0];
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1;
}

(function( $ ) {
  $.fn.simpleSlider = function(options) {
    var slider = $(this);
    
    if (!slider.parents(".simple-slider").length) {
      slider.css("width",options.width);
      //slider.css("height",options.height);
      slider.wrap("<div class='simple-slider' />");
      slider.children().each(function() {
        $(this).wrap("<div class='slide'><div class='pic-wrapper'><div class='pic' style='width:"+options.width+"px;'></div></div></div>")
        if (options.showtitles && $(this).attr("title")) {
          $(this).parents(".slide").append("<div class='img-descr'>"+$(this).attr("title")+"</div>")
        }
      });
      var items = $(this).children("div.slide");
      
      var sliderSize = items.length;
      
      items.each(function() {
        $(this).addClass("slide").attr("index",$(this).index());
        imgMarginTop = -$(this).find("img").height()/2+options.height/2;
        if (imgMarginTop > 0) imgMarginTop = 0;
        $(this).find("img").css("margin-top",imgMarginTop).after("<div class='pic-mask' />");
        if ($(this).find("img").hasClass("noframe")) {
          $(this).find(".pic-mask").hide();
        }
      });
      
      items.hide();
      items.eq(0).addClass("current").show();
      
      items.eq(0).find("img").attr("src",items.eq(0).find("img").attr("src")+ "?" + new Date().getTime());
      
      items.eq(0).find("img").load(function() {
        slider.css("height",items.eq(0).find("img").height());
        slider.find(".pic").css("height",items.eq(0).find("img").height());
        slider.find(".pic img").css("max-height",items.eq(0).find("img").height());
      });
      
      slider.append("<div class='lister fc' />");
      
      var lister = slider.parent().find(".lister");
      
      for (i=0;i<items.length;i++) {
        lister.append("<span class='lister-item'></span>")
      }
      
      var listerItems = lister.find(".lister-item");
      
      listerItems.first().addClass("act")
      
      
      if (sliderSize > 1) {
        slider.after("<div class='next' />");
        slider.after("<div class='prev' />");
      }
      
      // slider.find(".pic-mask").css("width",options.width-20)
      // slider.find(".pic-mask").css("height",options.height-20)
      
      var prevBtn = slider.parents(".simple-slider").find(".prev");
      var nextBtn = slider.parents(".simple-slider").find(".next");
      
      // prevBtn.css("top",options.height/2-24)
      // nextBtn.css("top",options.height/2-24)
      
      nextBtn.click(function() {
        curIndex = parseInt(slider.find(".current").attr("index"))
        if (curIndex < sliderSize-1) {
          curIndex++;
          items.eq(curIndex-1).fadeOut(250).removeClass("current");
          items.eq(curIndex).fadeIn(250).addClass("current");
          // slider.css("height",items.eq(curIndex).height());
        } else {
          items.eq(curIndex).fadeOut(250).removeClass("current");
          items.eq(0).fadeIn(250).addClass("current");
          // slider.css("height",items.eq(0).height());
        }
        imgMarginTop = -items.eq(curIndex).find("img").height()/2+slider.height/2;
        if (imgMarginTop > 0) imgMarginTop = 0;
        items.eq(curIndex).find("img").css("margin-top",imgMarginTop);
      });
      
      prevBtn.click(function() {
        curIndex = parseInt(slider.find(".current").attr("index"))
        if (curIndex > 0) {
          curIndex--;
          items.eq(curIndex+1).fadeOut(250).removeClass("current");
          items.eq(curIndex).fadeIn(250).addClass("current");
          // slider.css("height",items.eq(curIndex).height());
        } else {
          items.eq(curIndex).fadeOut(250).removeClass("current");
          items.eq(sliderSize-1).fadeIn(250).addClass("current");
          // slider.css("height",items.eq(sliderSize-1).height());
        }
        imgMarginTop = -items.eq(curIndex).find("img").height()/2+slider.height/2;
        if (imgMarginTop > 0) imgMarginTop = 0;
        items.eq(curIndex).find("img").css("margin-top",imgMarginTop);
      });
      
      listerItems.click(function() {
        if (!$(this).hasClass("act")) {
          curIndex = $(this).prevAll().length;
          items.eq(lister.find(".act").index()).fadeOut(250).removeClass("current");
          items.eq(curIndex).fadeIn(250).addClass("current");
          lister.find(".act").removeClass("act");
          $(this).addClass("act");
        }
      });
      
      items.click(function() {
        if (lister.find(".act").next().length) {
          lister.find(".act").next().click();
        } else {
          listerItems.eq(0).click();
        }
      });
      
    
    }
    
  };
})( jQuery );

(function( $ ) {
  $.fn.customSelect = function() {
    var selects = $(this);
    selects.each(function () {
      var select = $(this);
      
      if (!$(this).next(".param-selector").length) {
        select.css("visibility","hidden").css("position","absolute").css("z-index","-1");
        select.after("<div class='param-selector' id='" + select.attr("id") + "-selector'>");
        var selector = select.next(".param-selector");
        
        if (select.is(":disabled")) {
          selector.addClass("selector-disabled")
        }
        
        
        selector.append("<div class='param-sel' />").append("<div class='dropdown' />");
        var dropdown = selector.find(".dropdown");
        // dropdown.append("<div class='top-border' />");
        var paramSel = selector.find(".param-sel");
        paramSel.addClass("initial");
        paramSel.append("<div class='arr' />");
        paramSel.append("<div class='sel-value' />");
        
        if (select.find("option[value=" + select.val() + "]").attr("flag")) {
          paramSel.find(".sel-value").html("<img src='" + select.find("option[value=" + select.val() + "]").attr("flag") + "' />" + select.find("option[value=" + select.val() + "]").html());
        } else {
          paramSel.find(".sel-value").html(select.find("option[value=" + select.val() + "]").html());
        }
        
        select.find("option").each(function () {
          if ($(this).attr("flag")) {
            var flag = "<img src=" + $(this).attr("flag") + " />";
          } else {
            flag = "";
          }
          
          if (select.find("option").length > 2) {
          
            if ($(this).val() != select.val() /* || select.attr("ttl")*/) {
              dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
            } else {
              dropdown.append("<div style='display:none' val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
            }
            
          } else {
            dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
          }
          
        });
      
      
        paramSel.on("click",function() {
          $(this).parents(".common-form").find(".form-item").css("z-index",1);
          $(this).parents(".form-item").css("z-index",10);
          if (!select.is(":disabled")) {
            if (dropdown.css("display") != "block") {
              $(".dropdown").fadeOut(150);
              $(".param-open").removeClass("param-open");
              dropdown.fadeIn(150);
              selector.addClass("param-open");
              var maxWidth = 0;
              
              $(this).parents(".form-item").prevAll(".form-item").css("z-index","100");
              $(this).parents(".form-item").css("z-index","1000");
              $(this).parents(".form-item").nextAll(".form-item").css("z-index","100");
              
              dropdown.find("div").each(function () {
                if ($(this).width() >= maxWidth) {
                  maxWidth = $(this).width();
                }
                if (paramSel.width() >= maxWidth) {
                  maxWidth = paramSel.width() + 1;
                }
              });
              
              //paramSel.css("width", maxWidth + "px");
              // dropdown.find("div").css("width", maxWidth + "px");
              // dropdown.css("width", maxWidth);
              
              // ddOverflow = $("html").height() - (dropdown.offset().top + dropdown.height());
              // if (ddOverflow < 0) {
                // dropdown.css("margin-top", -30 - dropdown.height());
              // }
              
              //dropdown.css("top",paramSel.position().top + paramSel.height());
              
            } else {
              dropdown.fadeOut(150);
              selector.removeClass("param-open");
            }
          }
        });
        
        dropdown.find("div").on("click",function () {
          selector.removeClass("param-sel-error");
          paramSel.removeClass("initial");
          var div = $(this);
          paramSel.find(".sel-value").html($(this).html());
          if ($(this).attr("flag")) {
            paramSel.find(".sel-value").attr("flag",$(this).attr("flag"));
          }
          select.val($(this).attr("val")).change();
          if (select.hasClass("hide-ttl")) {
            //select.find("option[value='']").remove();
            dropdown.find("div[val='']").remove();
          }
          dropdown.fadeOut(150, function () {
            dropdown.find("div").show().removeClass("selected");
            div.addClass("selected");
            div.parents(".param-open").removeClass("param-open");
          });
          if ($(this).attr("val")) {
            selector.parents(".form-item").find(".error-wrapper").remove();
          }
        });
      
      }
    });
    
  };
})( jQuery );

function makeup404() {
  if ($(".content-404").length) {
    var contentHeight = $(window).height() - $(".footer").outerHeight() - $(".header").outerHeight();
    if (contentHeight < 400) contentHeight = 400;
    $(".content-404").css("height","auto").css({
      height: contentHeight
    })
  }
}
