
jQuery(document).ready(function() {
	
    /*
	    Top menu
	*/
	$('.show-menu a, .hide-menu a').tooltip();
	// show/hide menu
	$('.show-menu a').on('click', function(e) {
		e.preventDefault();
		$(this).fadeOut(100, function(){ $('nav').slideDown(); });
	});
	$('.hide-menu a').on('click', function(e) {
		e.preventDefault();
		$('nav').slideUp(function(){ $('.show-menu a').fadeIn(); });
	});
	// navigation
	$('nav a').on('click', function(e) {
		e.preventDefault();
		var element_class = $(this).attr('class');
		var scroll_to = 0;
		var nav_height = $('nav').height();
		if(element_class == 'menu-top') { scroll_to = $(".coming-soon").offset().top; }
		else if(element_class == 'menu-subscribe') { scroll_to = $(".subscribe").offset().top - nav_height - 60; }
		else if(element_class == 'menu-project') { scroll_to = $(".about").offset().top - nav_height - 60; }
		// else if(element_class == 'menu-testimonials') { scroll_to = $(".testimonials").offset().top - nav_height - 60; }
		else if(element_class == 'menu-about-us') { scroll_to = $(".whos-behind").offset().top - nav_height - 60; }
		else if(element_class == 'menu-camiseta') { scroll_to = $(".camiseta").offset().top - nav_height - 60; }
		else if(element_class == 'menu-patrocinadores') { scroll_to = $(".patrocinadores").offset().top - nav_height - 60; }
		else if(element_class == 'menu-mapa') { scroll_to = $(".map").offset().top - nav_height /*- 60*/; }
		else if(element_class == 'menu-organizacion') { scroll_to = $(".organizadores").offset().top - nav_height - 60; }
        else if(element_class == 'menu-registro') { scroll_to = $(".registro-container").offset().top - nav_height - 60; }
		
		if($(window).scrollTop() != scroll_to && element_class !== undefined) {
			$('html, body').animate({scrollTop: scroll_to}, 1000);
		}
	});
	
    /*
        Background slideshow
    */
    $('.coming-soon').backstretch("assets/img/backgrounds/1.jpg");
    
    $('.about-container').backstretch("assets/img/backgrounds/4.jpg");
	
	$('.camiseta-container').backstretch("assets/img/backgrounds/5.jpg");

    $('.whos-behind-container').backstretch("assets/img/backgrounds/5.jpg");

    $('.registro-container').backstretch("assets/img/backgrounds/3.jpg");

    /*
        Countdown initializer
    */
    var now = new Date("2023/09/30");
    var countTo = now.valueOf();  
    $('.timer').countdown(countTo, function(event) {
    	$(this).find('.days').text(event.offset.totalDays);
    	$(this).find('.hours').text(event.offset.hours);
    	$(this).find('.minutes').text(event.offset.minutes);
    	$(this).find('.seconds').text(event.offset.seconds);
    });
    
    /*
        Testimonials
    */
    $('.testimonial-active').html('<p>' + $('.testimonial-single:first p').html() + '</p>');
    $('.testimonial-single:first .testimonial-single-image img').css('opacity', '1');
    
    $('.testimonial-single-image img').on('click', function() {
    	$('.testimonial-single-image img').css('opacity', '0.5');
    	$(this).css('opacity', '1');
    	var new_testimonial_text = $(this).parent('.testimonial-single-image').siblings('p').html();
    	$('.testimonial-active p').fadeOut(300, function() {
    		$(this).html(new_testimonial_text);
    		$(this).fadeIn(400);
    	});
    });
    
    /*
	    Show latest tweets
	*/
	$('.latest-tweets .tweets').tweet({
		modpath: 'assets/twitter/',
		username: 'anli_zaimi',
		page: 1,
		count: 5,
		loading_text: 'loading ...'
	});
	
	$('.latest-tweets .tweets .tweet_list li').append('<span class="tweet_nav"></span>');
	$('.latest-tweets .tweets .tweet_list li:first .tweet_nav').css('background', '#e8643e');
	$('.latest-tweets .tweets .tweet_list li .tweet_time').hide();
	$('.latest-tweets .tweets .tweet_list li .tweet_text').hide();
	$('.latest-tweets .tweet-active').html($('.latest-tweets .tweets .tweet_list li:first .tweet_text').html());

	$('.latest-tweets .tweets .tweet_list li .tweet_nav').on('click', function() {
		$('.latest-tweets .tweets .tweet_list li .tweet_nav').css('background', 'rgba(255, 255, 255, 0.6)');
		var clicked_tweet_nav = $(this);
    	var new_tweet_text = clicked_tweet_nav.siblings('.tweet_text').html();
    	$('.latest-tweets .tweet-active').fadeOut(300, function() {
    		$(this).html(new_tweet_text);
    		$(this).fadeIn(400, function() {
    			// reload background
    			$('.whos-behind-container').backstretch("resize");
    		});
    	});
    	clicked_tweet_nav.css('background', '#e8643e');
    });

    /*
	    Google maps
	
    var position = new google.maps.LatLng(43.35217 ,-8.41126);
    $('.contact-address .map').gmap({'center': position, 'zoom': 15, 'disableDefaultUI':true, 'callback': function() {
            var self = this;
            self.addMarker({'position': this.get('map').getCenter() });	
        }
    });

    
        Subscription form
    */
    $('.success-message').hide();
    $('.error-message').hide();

    $('.subscribe form').submit(function(e) {
    	e.preventDefault();
        var postdata = $('.subscribe form').serialize();
        $.ajax({
            type: 'POST',
            url: 'assets/subscribe.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                if(json.valid == 0) {
                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.error-message').html(json.message);
                    $('.error-message').fadeIn();
                }
                else {
                    $('.error-message').hide();
                    $('.success-message').hide();
                    $('.subscribe form').hide();
                    $('.success-message').html(json.message);
                    $('.success-message').fadeIn();
                }
            }
        });
    });
    
    /*
	    Contact form
	*/
    $('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function() {
    	$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
    });
	$('.contact-form form').submit(function(e) {
		e.preventDefault();
	    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	    var postdata = $('.contact-form form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.emailMessage != '') {
	                $('.contact-form form .contact-email').addClass('contact-error');
	            }
	            if(json.subjectMessage != '') {
	                $('.contact-form form .contact-subject').addClass('contact-error');
	            }
	            if(json.messageMessage != '') {
	                $('.contact-form form textarea').addClass('contact-error');
	            }
	            if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
	                $('.contact-form form').fadeOut('fast', function() {
	                    $('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	                });
	            }
	        }
	    });
	});

    
});

