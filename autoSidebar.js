$(function() {

var $window = $(window);
var lastScrollTop = $window.scrollTop();
var wasScrollingDown = true;

var $sidebar = $("#sidebar");
if ($sidebar.length > 0) {

    var initialSidebarTop = $sidebar.position().top;
    var fixing = $sidebar.offset().top

    $window.scroll(function(event) {

        var windowHeight = $window.height();
        var sidebarHeight = $sidebar.outerHeight();

        var scrollTop = $window.scrollTop();
        var scrollBottom = scrollTop + windowHeight;

        var sidebarTop = $sidebar.position().top;
        var sidebarBottom = sidebarTop + sidebarHeight;

        var heightDelta = Math.abs(windowHeight - sidebarHeight);
        var scrollDelta = lastScrollTop - scrollTop;

        var isScrollingDown = (scrollTop > lastScrollTop);
        var isWindowLarger = (windowHeight > sidebarHeight);
    

        if ((isWindowLarger && scrollTop > initialSidebarTop) || (!isWindowLarger && scrollTop > initialSidebarTop + heightDelta)) {
            $sidebar.css('position', 'sticky');
        } else if (!isScrollingDown && scrollTop <= initialSidebarTop) {
            $sidebar.css('top', 0);
        }

        var dragBottomDown = (sidebarBottom <= scrollBottom-fixing+40 && isScrollingDown);
        var dragTopUp = (sidebarTop >= scrollTop-fixing+95 && !isScrollingDown);

        if (dragBottomDown) {
            if (isWindowLarger) {
                $sidebar.css('top', 0);
            } else {
                $sidebar.css('top', -heightDelta);
            }
        } else if (dragTopUp) {
            $sidebar.css('top', 80);
        } else if ($sidebar.css('position', 'sticky')) {
            var currentTop = parseInt($sidebar.css('top'), 10);

            var minTop = -heightDelta;
            var scrolledTop = currentTop + scrollDelta;

            var isPageAtBottom = (scrollTop + windowHeight >= $(document).height());
            var newTop = (isPageAtBottom) ? minTop : scrolledTop;


            $sidebar.css('top', newTop);
        }

        lastScrollTop = scrollTop;
        wasScrollingDown = isScrollingDown;
    });
}
});



/*
else if ($sidebar.css('position', 'sticky')) {
            var currentTop = parseInt($sidebar.css('top'), 10);

            var minTop = -heightDelta;
            var scrolledTop = currentTop + scrollDelta;

            var isPageAtBottom = (scrollTop + windowHeight >= $(document).height());
            var newTop = (isPageAtBottom) ? minTop : scrolledTop;

            $sidebar.css('top', newTop);
        }


        console.log("initial Sidebar Top: "+initialSidebarTop);
                console.log("İ Sidebar Top: "+fixing);
*/