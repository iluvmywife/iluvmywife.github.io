(function() { 
    var textGalleryContent = $(".wsb-media-content"),
        textGalleryList = [],
        currentSlide = 0,
        galleryTimer = 4000,
        timer;

    $.ajax({
        url: "/content/script/text-gallery.json", 
        success: initializeGallery
    });

    function initializeGallery(data) {
        textGalleryList = data;
        displaySlide(0);
    }

    function displaySlide(slideNumber) {
        var slide = textGalleryList[slideNumber];
        
        var tgc = $(".wsb-media-content");
        tgc.hide(500);
        tgc.attr("src", slide.src);
        tgc.css("margin-top", slide["margin-top"]);
        tgc.show(500);
    }

    function advanceSlide() {
        clearTimeout(timer);
        // Reset if we go over the end
        var nextSlide = currentSlide + 1 >= textGalleryList.length ? 0 : currentSlide + 1;

        displaySlide(nextSlide);

        currentSlide = nextSlide;

        timer = setTimeout(advanceSlide, galleryTimer);
    }

    function goBackSlide() {
        clearTimeout(timer);
        // Reset if we go over the end
        var prevSlide = currentSlide - 1 == 0 ? textGalleryList.length : currentSlide - 1;

        displaySlide(prevSlide);

        currentSlide = prevSlide;

        timer = setTimeout(advanceSlide, galleryTimer);
    }

    $(".wsb-media-gallery-arrows-right-arrow").click(advanceSlide);
    $(".wsb-media-gallery-arrows-left-arrow").click(goBackSlide);
})();