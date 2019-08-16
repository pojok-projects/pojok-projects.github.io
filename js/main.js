new WOW().init();
$(function () {
    var includes = $('[data-include]');
    jQuery.each(includes, function () {
        var file = 'view/' + $(this).data('include') + '.html';
        $(this).load(file);
    });
});