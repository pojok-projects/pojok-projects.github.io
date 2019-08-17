new WOW().init();

$(function () {
    var includes = $('[data-include]');
    jQuery.each(includes, function () {
        var include = $(this).data('include');
        var lang = getUrlVars().lang;
        var excludes = ['footer', 'nav-bar', 'scripts', 'styles'];
        var suffix = !excludes.includes(include) ? (lang ? '-' + lang : '-en') : '';
        var file = 'view/' + $(this).data('include') + suffix + '.html';
        $(this).load(file, function () {

            var lang = getUrlVars().lang;
            if (lang) {
                $('a').each(function () {
                    var href = $(this).attr('href');
                    if (href) {
                        var anchor = href.match('#') ? '#' + href.slice(href.indexOf('#') + 1) : null;
                        var main = href.match(/#/g) ? href.slice(0, href.indexOf('#')) : href;
                        if (!main.match(/lang/g)) {
                            main += '?lang=' + lang;
                        }
                        var final = (anchor && anchor !== '/') ? (main + anchor) : main;
                        $(this).attr('href', final);
                    }
                });
            }
        });
    });
});



function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}