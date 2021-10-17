$(document).ready(function(){
    // Mobile Menu //
    $(document).on('click', '.menu', function (e) {
        e.preventDefault();
        $('html').toggleClass("open--nav");
        $('html').removeClass("open-sub-nav");
    });
    $(document).on('click', '.overlay', function () {
        $('html').removeClass("open--nav");
    });
    $(document).on('click', '.nav-link', function () {
        $('html, body').removeClass("open--nav");
    });
    $(document).on('click', '.sub-menu', function (e) {
        e.preventDefault();
        $('html').toggleClass("open-sub-nav");
        $('html').removeClass("open--nav");
    });
    $(document).on('click', '.sub-overlay', function () {
        $('html').removeClass("open-sub-nav");
    });
    // End Mobile Menu //

    // Select //
    $(document).on('click', '.select .selected', function(e){
        e.stopImmediatePropagation();
        $('.select.open').removeClass('open');
        $(this).closest('.select').toggleClass('open');
    });
    $(document).on('click', '.select .select-list .item', function(e){
        e.stopImmediatePropagation();
        const $select = $(this).closest('.select');
        $select.children('.selected').html($(this).clone());
        $select.toggleClass('open');
        $select.trigger('change', $(this));
        $(this).addClass('active').siblings().removeClass('active');
    });
    $(document).on('click', function() {
        $('.select.open').removeClass('open');
    });
    // End Select //

    // QR mobile //
    $(document).on('click', '.qr-btn', function (e) {
        e.preventDefault();
        $('html').toggleClass("open--qr");
    });
    $(document).on('click', '.qr-block', function (e) {
        e.preventDefault();
        $('html').removeClass("open--qr");
    });
    // End QR mobile //

    // Accordion //
    $('.open-accordion').click(function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).parent().toggleClass('open');
        $(e.currentTarget.nextElementSibling).slideToggle(300);
    });
    // End Accordion //

    // Scroll //
    var scrollBar = $('.wrap-scroll');
    if(scrollBar.length){
        $('.wrap-scroll').each(function() {
            OverlayScrollbars(this, {
                sizeAutoCapable: this.classList.contains('select-list')
            });
        });
    }
    // End Scroll //

    // Promo page //
    $('.btn-promo').click(function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).parent().parent().parent().parent().children('.content-promo').slideToggle(150);
    });
    // End Promo page //
});