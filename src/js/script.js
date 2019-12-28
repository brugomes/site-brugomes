(function() {

    function smoothScroll(){
        $(document).on('click', 'a[href^="#"]', function (event) {
            event.preventDefault();
    
            $('html, body').animate({
                scrollTop: ($($.attr(this, 'href')).offset().top) - 30
            }, 500);
        })
    }

    function showFloatingMenu(){
        $window = $(window);

        if ($window.width() >= 1024) {
            $window.scroll(function() {
                if ($window.scrollTop() >= 60) {
                    $(".floating-menu").fadeIn(500);
                } else {
                    $(".floating-menu").fadeOut(500);
                }
            });
        }
    }

    smoothScroll();
    showFloatingMenu();
})();