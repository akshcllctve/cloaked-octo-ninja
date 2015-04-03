$('.center').contents().unwrap(); /* Remove .center with JS to prevent a small gap underneath the Standard Nav */

$(window).load(function() {
    $('#homepageNivoSlider img').wrap('<div class="js_req_overlay_wrapper" />');
});