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

    // MODAL //
    $(document).on('click', '.modal_w', function (e) {
        e.preventDefault();
        $( $.attr(this, 'href') ).fadeIn(200);
    });
    $(document).on('click', '.closed-modal', function (e) {
        e.preventDefault();
        $('.modal').fadeOut(200);
    });
    // END Modal//

    // Pin Code //
    $('.pin-code .keyboard .btn-keyboard').click(function(e) {
        e.preventDefault();

        const $block = $(this).closest('.pin-code');
        const $result_mask_block = $block.find('.pin-field .box-mask');
        const $result_input = $block.find('.pin-field .result_input');
        const $result_input_value = $result_input.val();

        const pin_length = parseInt($block.attr('data-value-length')) || 4;
        const key_value = $(this).attr('data-value');


        $result_mask_block.removeClass('invalid');
        switch ($(this).attr('data-action')) {
            case 'backspace':
                $result_input.val($result_input_value.substr(0, $result_input_value.length - 1));
                break;

            case 'check':
                // Demo check
                if ($result_input_value === '1234' || $result_input_value.length < pin_length) {
                    // invalid pin
                    $result_input.val('');

                    // Set invalid class after some time to rerun CSS animation
                    setTimeout(() => $result_mask_block.addClass('invalid'), 10)
                } else {
                    // valid pin
                    alert('Valid!');
                }
                break;

            default:
                if ($result_input_value.length < pin_length) {
                    $result_input.val(`${$result_input_value}${key_value}`);
                }
                break
        }


        const $result_input_value_after = $result_input.val();
        const mask_items = $result_mask_block.children('span')
        mask_items.removeClass('active');
        for (let index = 0; index < $result_input_value_after.length; index++) {
            mask_items.eq(index).addClass('active');
        }
    });
    // End Pin Code //

    // MODAL Test Alert//
    $(document).on('click', '.modal_alert_w', function (e) {
        e.preventDefault();
        $( $.attr(this, 'href') ).fadeIn(200);
    });
    $(document).on('click', '.closed-alert-modal', function (e) {
        e.preventDefault();
        $('.modal-alert').fadeOut(200);
    });
    // END Modal Test Alert//

    // Pin Code wrap //
    $(".pin-digit").on("keyup", function (e) {
        if (e.keyCode == 8 || e.keyCode == 48) {
            $(e.currentTarget).prev().select();
            $(e.currentTarget).prev().focus();
        } else {
            if ($(e.currentTarget).val() != "") {
                console.log($(e.currentTarget).next())
                $(e.currentTarget).next().select();
                $(e.currentTarget).next().focus();
            }
        }
    });
    // End Pin Code wrap //
});