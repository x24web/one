/*==========[index]==========
01 - VARIABLES
02 - Navbar
03 - Smooth Scrolling
04 - Filtering Portfolio
05 - LightBox
06 - Carousel in Testimonials Section
07 - Preloader
08 - Feedback in Testimonials Section
09 - Back To Up
10 - Counter up

NOTE:
------
Please DO NOT EDIT THIS JS, you may need to use "custom.js" file for writing your custom js.
We may release future updates so it will overwrite this file. it's better and safer to use "custom.js".
===========================*/

// 01 - VARIABLES
var Nav                 = $("nav.navbar"),
    $document           = $(document),
    $window             = $(window),
    scrollUp            = 0,
    countonly           = 1,
    portfolioContent    = $("#portfolio .gallery"),
    portfolioItems      = $("#portfolio .gallery .item"),
    firstFeedback       = $(".testimonials .all-clients .client:first-of-type"),
    clientFeedback      = $(".testimonials .all-clients .client");
$(function () {
    "use strict";

    // 02.1 - Init Scrollspy
    $('body').scrollspy({ target: '#main-nav' });

    // 02.2 - Nav Fixed on Scroll
    if ($window.scrollTop() > 0) {
        Nav.addClass("fixed");
    } else {
        Nav.removeClass("fixed");
    }
    // 02.3 - Hidden Navbar with scroll
    $window.on("scroll", function () {
        
        if ($window.scrollTop() > 0) {
            Nav.addClass("fixed");
        } else {
            Nav.removeClass("fixed");
        }
        
        var scrollDown = $window.scrollTop();
        
        if (scrollDown > scrollUp) {
            Nav.addClass("hidden");
        } else {
            Nav.removeClass("hidden");
        }
        
        scrollUp = scrollDown;
    });

    // 03 - Smooth Scrolling
    $("#main-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
            scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
    // 04 - Filtering Portfolio
    $('.filter-group').on('click', 'span', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    
    $(".filter-group span:first-of-type").on("click", function () {
        portfolioItems.hide(0).delay(100).fadeTo(500 , 1);
    });
    
    $(".filter-group span:not(:first-of-type)").on("click", function () {
        portfolioItems.hide(0).delay(100);
        $('.' + $(this).data('filter')).fadeTo(500 , 1);
    });

    // 05 - LightBox init
    $('.gallery a').simpleLightbox();

    // 06 - Owl Carousel
    if ($('.clients').length) {
        
        // Fire Owl Carousel Slider Plugin in Clients Section
        $('.testimonials .clients').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            autoplaySpeed: 600,
            dragEndSpeed: 600,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
    }
});
 

$window.on("load", function () {

    "use strict";

    // 07 - Preloader
    $(".preloader").delay(400).fadeOut(600, function () {
        $(this).remove();
    });

    // 08 - Clients Feedback in Testimonials Section
    if ($("#testimonials").length) {
        
        var cardContent     = $(".testimonials .testimonials-content .client-card > div:not(.arrows)"),
            clientImg       = $(".testimonials .testimonials-content .client-card .client-img img"),
            clientName      = $(".testimonials .testimonials-content .client-card .card-text .card-name"),
            feedbackDate    = $(".testimonials .testimonials-content .client-card .card-text .feedback-date"),
            feedbackText    = $(".testimonials .testimonials-content .client-card .card-text .feedback"),
            firstFeedback   = $(".testimonials .all-clients .client:first-of-type"),
            clientFeedback  = $(".testimonials .all-clients .client"),
            nextBtn         = $(".testimonials .client-card .arrows #next"),
            prevBtn         = $(".testimonials .client-card .arrows #prev"),
            clientIndex     = 0,
            feedbackSpeed   = 5000;
        
        firstFeedback.addClass("active").siblings(".client").removeClass("active");
        
        clientImg.attr({
            'src': firstFeedback.find(".client-img img").attr('src'),
            'alt': firstFeedback.find(".client-img img").attr('alt')
        });
        clientName.text(firstFeedback.find('.card-name').text());
        feedbackDate.text(firstFeedback.find('.feedback-date').text());
        feedbackText.text(firstFeedback.find('.feedback').text());
        
        // When Click on Client Image
        $(".testimonials .all-clients .client .client-img img").on("click", function () {
            cardContent.hide();
            
            clientIndex = $(this).parents(".client").index();
            
            $(this).parents(".client").addClass("active").siblings(".client").removeClass("active");
            
            clientImg.attr({
                'src': $(this).attr('src'),
                'alt': $(this).attr('alt')
            });
            clientName.text($(this).parent(".client-img").siblings(".card-text").children('.card-name').text());
            feedbackDate.text($(this).parent(".client-img").siblings(".card-text").children('.feedback-date').text());
            feedbackText.text($(this).parent(".client-img").siblings(".card-text").children('.feedback').text());
            
            cardContent.fadeIn(300);
            feedbackResetTiming();
        });
        
        // When Click on Next Button
        nextBtn.on("click", nextperson);
        function nextperson(){
            cardContent.hide();
            
            if (clientIndex < clientFeedback.length - 1) {
                clientIndex += 1;
            } else {
                clientIndex = 0;
            }
            
            clientFeedback.eq(clientIndex).addClass("active").siblings(".client").removeClass("active");
            
            clientImg.attr({
                'src': clientFeedback.eq(clientIndex).find(".client-img img").attr('src'),
                'alt': clientFeedback.eq(clientIndex).find(".client-img img").attr('alt')
            });
            clientName.text(clientFeedback.eq(clientIndex).find('.card-name').text());
            feedbackDate.text(clientFeedback.eq(clientIndex).find('.feedback-date').text());
            feedbackText.text(clientFeedback.eq(clientIndex).find('.feedback').text());
            
            cardContent.fadeIn(300);
            feedbackResetTiming();
        }
        
        // When Click on Prev Button
        prevBtn.on("click", function () {
            cardContent.hide();
            
            if (clientIndex > 0) {
                clientIndex -= 1;
            } else if (clientIndex === 0) {
                clientIndex = clientFeedback.length - 1;
            }
            
            clientFeedback.eq(clientIndex).addClass("active").siblings(".client").removeClass("active");
            
            clientImg.attr({
                'src': clientFeedback.eq(clientIndex).find(".client-img img").attr('src'),
                'alt': clientFeedback.eq(clientIndex).find(".client-img img").attr('alt')
            });
            clientName.text(clientFeedback.eq(clientIndex).find('.card-name').text());
            feedbackDate.text(clientFeedback.eq(clientIndex).find('.feedback-date').text());
            feedbackText.text(clientFeedback.eq(clientIndex).find('.feedback').text());
            
            cardContent.fadeIn(300);
            feedbackResetTiming();
        });
        
        // slider timing
        function feedbackTiming() {
            nextperson();
        }
        
        // slider autoplay
        var feedbackTimingRun = setInterval(function () {
            feedbackTiming();
        }, feedbackSpeed);
        
        function feedbackResetTiming() {
            
            clearInterval(feedbackTimingRun);
            
            feedbackTimingRun = setInterval(function () {
                feedbackTiming();
            }, feedbackSpeed);
            
        }   
    }
    // 09 - Back To Up
    $('.Scroll-To-Top').on("click", function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
    });
});

$(window).on('scroll', function () {
    // 09 - Back To Up
    if ($(window).scrollTop() < 400) {
        $('.Scroll-To-Top').removeClass('active');
    } else {
        $('.Scroll-To-Top').addClass('active');
    }
    // 10 - counterUp
    if (($(window).scrollTop() > ($("#counter").offset().top - 400 )) && countonly == 1) {
        countonly = 0;
        $('.counter').each(function (index, element) {
            var speed = 8000;
            var x = parseInt(element.textContent);
            var y = 0;
            var count = setInterval(function(){
                element.innerHTML = y;
                y++;
                if(y == x){
                    clearInterval(count);
                }
            }, speed/x);
        });
    }
});