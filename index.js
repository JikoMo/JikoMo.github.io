console.log('%c404: Not found!', 'color:red;');
/*
    It is making
    There will be very interesting
    I hope so
*/

$(function () {
    var SLIDE_IN_DOWN = { opacity: 1, top: 0 };
    var SLIDE_IN_UP = { opacity: 1, bottom: 0 };
    var SLIDE_IN_LEFT = { left: 0 };
    var SLIDE_IN_RIGHT = { right: 0 };

    registerCheatCode();
    executeAnimations();

    function executeAnimations() {
        $.when()
            .then(animateTitle)
            .then(animateQuote)
            .then(animateLinks)
            .then(animateLocation);
    }

    function animateTitle() {
        return animate('h1', SLIDE_IN_DOWN);
    }

    function animateQuote() {
        return $.when(
            animate('.quote-line-start', SLIDE_IN_LEFT),
            animate('.quote-line-end', SLIDE_IN_RIGHT),
            animate('.quote-icon-start', SLIDE_IN_DOWN),
            animate('.quote-icon-end', SLIDE_IN_UP)
        )
        .then(function () {
            return animate('.quote-content', SLIDE_IN_DOWN);
        })
        .then(function () {
            return animate('.quote-author', SLIDE_IN_DOWN);
        });
    }

    function animateLinks() {
        var DELAY_STEP = 200;
        var elements = $('.links a');
        var concurrent = $.makeArray(elements)
        .map(function (element, index) {
            return animate(element, SLIDE_IN_DOWN, index * DELAY_STEP);
        });
        return $.when.apply($, concurrent);
    }

    function animateLocation() {
        return $.when(
            animate('.location-icon', SLIDE_IN_UP),
            animate('.location-text', SLIDE_IN_DOWN)
        );
    }

    function animate(selector, properties, delay, options) {
        delay = delay || 0;
        return $(selector).delay(delay)
            .animate(properties, options)
                .promise();
        }

    function registerCheatCode() {
        $(document.body).on('keydown', function (event) {
            var KEY_B = 66;
            if (event.which === KEY_B) {
                $('.relocate-location').text('Bookmark Page');
                $('.relocating').css('opacity', 1);

                window.setTimeout(function () {
                    window.location.href = '/bookmarks.html';
                }, 1000);
                }
        });
    }
});

// The function from https://cloud.tencent.com/developer/article/1629795
function rand(n,m) {
    var result = Math.random()*(m+1-n)+n;
    while(result>m) {
        result = Math.random()*(m+1-n)+n;
    }
    //int
    return Math.floor(result);
    //float
    return result;
}

$(function () {
    function randomSayings() {
        let sayings = [
            {
                "name": "文天祥",
                "text":"人生自古谁无死，留取丹心照汗青。"
            },
            {
                "name": "李白",
                "text": "光景不待人，须臾发成丝。"
            }
        ]
        let saying = sayings[rand(0,sayings.length)];
        document.getElementsByClassName("saying-text")[0].innerText = saying.text;
        document.getElementsByClassName("saying-person")[0].innerText = '—— ' + saying.name;
    }

    randomSayings();
});