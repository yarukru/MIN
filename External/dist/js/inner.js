$(document).ready(function() {
    $('.menu-trigger').on('click', function(){
        $(this).toggleClass('active');
        $('.menu').toggleClass('open');
        $('.auth-bar').removeClass('open');
    });

    $('.menu-overlay').on('click', function(){
        $('.menu-trigger').removeClass('active');
        $('.menu').removeClass('open');
        enableScroll();
    });

    $('.auth-btn').on('click', function(e){
        e.preventDefault();
        $('.menu-trigger').removeClass('active');
        $('.menu').removeClass('open');
        $('.auth-bar').toggleClass('open');
    });

    $('.closed-auth, .auth-overlay').on('click', function(e){
        e.preventDefault();
        $('.menu-trigger').removeClass('active');
        $('.menu').removeClass('open');
        $('.auth-bar').toggleClass('open');
    });

    // Modal Lang //
    $('.lang-m_w').click(function(e){
        e.preventDefault();
        $( $.attr(this, 'href') ).fadeIn(200);
    });
    $(document).on('click', '.close-m-lang', function (e) {
        e.preventDefault();
        $('.modal-lang').fadeOut(200);
    });
    $(document).on("click", '.lang-link', function(e){
        e.preventDefault();
        $(".lang-link").removeClass('active');
        $(this).addClass('active');
    });
    // End Modal Lang //

    $(window).on('load resize', function () {
        if ($(window).width() > 800) {
            $('.lang-wrap').insertBefore('.header .row .menu-trigger');
            $('.nav-right').insertBefore('.header .row .menu-trigger');
        } else {
            $('.lang-wrap').insertBefore('.header .menu .inner-wrapper');
            $('.nav-right').insertBefore('.header .menu .inner-wrapper');
        }
    });

    // FIX header
    if ($(window).width() > '801'){
        $(window).scroll(function(){
            var headerHeight = $('.header').height()-20;
            var menu = $('.header');
            if ( $(this).scrollTop() > headerHeight && menu.hasClass("default") ){
                menu.removeClass("default")
                    .addClass("fixed")

            } else if($(this).scrollTop() <= headerHeight && menu.hasClass("fixed")) {
                menu.removeClass("fixed")
                    .addClass("default")
            }
        });
    }
    // END FIX header

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

    // TABS //
    $(".tab").click(function(e) {
        e.preventDefault();

        const $tabs_el = $(this).closest('.tabs');
        const tabs_block_id = $tabs_el.attr('data-tabs-block');
        const $tabs_block = $('.tabs-block[data-tabs-block="'+tabs_block_id+'"]');
        const tab_item_id = $(this).attr('data-tab-id');

        $tabs_el.find(".tab").removeClass("active");
        $(this).addClass("active");

        $tabs_block.find('.tab-item').hide();
        $tabs_block.find('.tab-item[data-tab-id="'+tab_item_id+'"]').show();
    });
    $('.tabs').each(function() {
        $(this).find('.tab').eq(0).click()
    });
    $(document).on('change', '.select.tab-switcher', function(event, item) {
        const tabs_block_id = $(this).attr('data-tabs-block');
        const $tabs_block = $('.tabs-block[data-tabs-block="'+tabs_block_id+'"]');
        const tab_item_id = $(item).attr('data-tab-id');
        $tabs_block.find('.tab-item').hide();
        $tabs_block.find('.tab-item[data-tab-id="'+tab_item_id+'"]').show();
    });
    // END TABS //

    // Accordion //
    $('.btn-accordion').click(function(e){
        e.preventDefault()
        $(this).toggleClass('active');
        $(this).parent().toggleClass('open');
        $(e.currentTarget.nextElementSibling).slideToggle(300);
    });
    // End Accordion //
});