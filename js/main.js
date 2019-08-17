const appendScript = (src) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    document.head.appendChild(script);
};

const getUrlVars = () => {
    let vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

(function () {
    var startingTime = new Date().getTime();
    appendScript('/js/jquery-3.2.1.min.js');
    appendScript('/js/popper.min.js');
    appendScript('/js/bootstrap.min.js');
    appendScript('/js/mdb.js');

    var checkReady = function (callback) {
        if (window.jQuery) {
            callback(jQuery);
        } else {
            window.setTimeout(function () {
                checkReady(callback);
            }, 20);
        }
    };

    checkReady(function ($) {
        $(function () {
            setTimeout(() => {
                new WOW().init();
            }, 1200);

            $(() => {
                const includes = $('[data-include]'),
                    lang = getUrlVars().lang,
                    excludes = ['footer', 'navbar', 'scripts', 'styles'];

                jQuery.each(includes, function () {
                    const include = $(this).data('include'),
                        suffix = !excludes.includes(include) ? (lang ? '-' + lang : '-en') : '';

                    $(this).load('view/' + include + suffix + '.html', () => {
                        if (lang) {
                            $('a').each(function () {
                                const href = $(this).attr('href');
                                if (href) {
                                    const anchor = href.match('#') ? '#' + href.slice(href.indexOf('#') + 1) : null;
                                    let main = href.match(/#/g) ? href.slice(0, href.indexOf('#')) : href;
                                    main += (!main.match(/lang/g)) ? '?lang=' + lang : '';
                                    $(this).attr('href', (anchor && anchor !== '/') ? (main + anchor) : main);
                                }
                            });
                        }
                    });
                });
            });
        });
    });
})();