(function () {

    "use strict";

    $('.demopage-preview_item img').hover(function () {
        var demoIMGheight = $(this).height();
        if (demoIMGheight > 280) {
            var demoIMGheight = $(this).height();
            var demoIMGheight2 = demoIMGheight - 280;
            $(this).css('top', -demoIMGheight2);
        } else {
            var demoIMGheight = $(this).height();
            var demoIMGheight2 = demoIMGheight - 230;
            $(this).css('top', -demoIMGheight2);
        }
    }, function () {
        $(this).css('top', 0);
    });

    var Core = {
        initialized: false,
        initialize: function () {
            if (this.initialized)
                return;
            this.initialized = true;
            this.build();
        },
        build: function () {
            // Owl carousel init
            this.initOwlCarousel();
            // Fixed header 
            this.fixedHeader();
            // Isotope init
            this.isotopeGallery();
            // Tooltips
            this.initTooltips();
            // Loader
            this.loaderInit();
            // Chart js init
            this.homeGraph();
            // Init fancybox
            this.initFancyBox();
            // Init fancybox video
            this.initFancyBoxVideo();
            // Wow init
            this.wowInit();
            // Accordeon
            this.initTabs();
            // Pro slider init
            this.initSliderPro();
            //Scroll to
            this.initScrollTo();
            // Hover tabs
            this.initHoverTabs();
            //Init scrollreveral
            this.initSR();
            // Init toggle menu
            this.initToggleMenu();
            // Counters start
            this.waypointsStart();
        },
        waypointsStart: function () {
            var countersIteration = true;
            var skillsIteration = true;
            $(window).on('scroll', function () {
                if ($('.counters').length && $('.counters').offset().top < ($('body').scrollTop() + $(window).height()) && countersIteration) {
                    $(".spincrement").spincrement({
                        duration: 5000
                    });
                    countersIteration = false;
                }
            });
            $(window).on('scroll', function () {
                if ($('.skills').length && $('.skills').offset().top < ($('body').scrollTop() + $(window).height()) && skillsIteration) {
                    $('.skill-item').each(function () {
                        var persent = $(this).attr('data-percent');
                        $(this).find('.skill-line span').animate({
                            width: persent + '%'
                        }, 800);
                    });
                    skillsIteration = false;
                }
            });
        },
        initToggleMenu: function () {

            var trigger = $('.toggle-menu-button');
            var isClosed = true;

            function showMenu() {
                $('#nav').addClass('navbar-scrolling-fixing');
                $('#fixedMenu').delay(0).fadeIn(300);
                trigger.addClass('is-open');
                isClosed = false;
            }
            
            function hideMenu() {
                $('#fixedMenu').fadeOut(100);
                $('#nav').removeClass('navbar-scrolling-fixing');
                trigger.removeClass('is-open');
                isClosed = true;
            }

            trigger.on('click', function (e) {
                e.preventDefault();
                if (isClosed === true) {
                    showMenu();
                } else {
                    hideMenu();
                }
            });
        },
        initScrollTo: function () {
            $('.scrollTo').on('click', function (e) {
                e.preventDefault();
                var href = $(this).attr('href');
                $('html, body').animate({
                    scrollTop: $(href).offset().top - 20
                }, 'slow');
            });
        },
        initSR: function () {
            window.sr = ScrollReveal({
                reset: true
            });
            sr.reveal('.fadeInSR');
        },
        initHoverTabs: function () {
            $('.wrap-services-tabs .wrap-tabs .nav.nav-tabs li a').hover(function () {
                $(this).tab('show');
            });
        },
        initTabs: function () {
            function toggleActive(e) {
                $(e.target).prev('.panel-heading').toggleClass('active');
            }
            $('#accordion-one').on('hidden.bs.collapse shown.bs.collapse', toggleActive);
        },
        initFancyBox: function () {
            $('.fancybox').fancybox();
        },
        initFancyBoxVideo: function () {
            $(".fancybox-video").click(function () {
                $.fancybox({
                    'padding': 0,
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'title': this.title,
                    'width': 680,
                    'height': 495,
                    'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                    'type': 'swf',
                    'swf': {
                        'wmode': 'transparent',
                        'allowfullscreen': 'true'
                    }
                });

                return false;
            });
        },
        isotopeGallery: function () {
            var $container = $('#gallery-items');

            $(window).load(function () {
                $container.isotope({
//		    resizable: false, // disable normal resizing
                    transitionDuration: '0.65s',
                    masonry: {
                        columnWidth: $container.find('.gallery-item:not(.wide)')[0]
                    }
                });

                $(window).resize(function () {
                    $container.isotope('layout');
                });
            });

            // filter items on button click
            $('#filters').on('click', 'a', function (e) {
                $(e.target).toggleClass('active').siblings().removeClass("active");
                var filterValue = $(this).attr('data-filter');
                $container.isotope({filter: filterValue});
            });
        },
        homeGraph: function () {

            $(".graph-line").each(function (i) {
                $(this).highcharts({
                    chart: {
                        type: 'area',
                        backgroundColor: 'rgba(246, 246, 246, 0.1)'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        gridLineDashStyle: 'Dash',
                        gridLineWidth: 1,
                        categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
                        title: {
                            enabled: false
                        },
                        labels: {
                            style: {"color": "#555555"}
                        }
                    },
                    yAxis: {
                        gridLineDashStyle: 'Dash',
                        title: {
                            enabled: false
                        },
                        labels: {
                            style: {"color": "#555555"}
                        }
                    },
                    tooltip: {
                        shared: false,
                        useHTML: true,
                        backgroundColor: '#ed912a',
                        borderColor: '#ed912a',
                        borderRadius: '5',
                        borderWidth: '0',
                        headerFormat: '<table>',
                        pointFormat: '<tr>' +
                                '<td style="color: #fff; font-weight: bold; font-family: Karla, sans-serif; ">{point.y}K VISITORS</td></tr>',
                        footerFormat: '</table>',
                        valueDecimals: 2
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#cacddc',
                            lineWidth: 2,
                            marker: {
                                lineWidth: 2,
                                lineColor: '#cacddc'
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                            name: 'FIRST',
                            showInLegend: false,
                            data: [11, 26, 15, 43, 38, 55, 79],
                            color: '#fff',
                            lineColor: "#cccccc",
                            fillColor: {
                                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                                stops: [
                                    [0, 'rgba(35, 122, 198, 0.00)'],
                                    [1, 'rgba(35, 122, 198, 0.00)']
                                ]
                            },
                            marker: {
                                radius: 6
                            }
                        }, {
                            name: 'SECOND',
                            showInLegend: false,
                            data: [16, 22, 57, 36, 58, 76, 84],
                            color: '#fff',
                            lineColor: '#237ac6',
                            fillColor: {
                                linearGradient: {x1: 1, x2: 1, y1: 0, y2: 1},
                                stops: [
                                    [0, 'rgba(35, 122, 198, 0.05)'],
                                    [1, 'rgba(255, 255, 255, 0)']
                                ]
                            },
                            marker: {
                                lineWidth: 2,
                                lineColor: '#237ac6',
                                radius: 6,
                                symbol: 'circle'
                            }

                        }]
                });
            });

        },
        initOwlCarousel: function (options) {

            $(".enable-owl-carousel").each(function (i) {
                var $owl = $(this);
                var navigationData = $owl.data('navigation');
                var paginationData = $owl.data('pagination');
                var singleItemData = $owl.data('single-item');
                var autoPlayData = $owl.data('auto-play');
                var transitionStyleData = $owl.data('transition-style');
                var mainSliderData = $owl.data('main-text-animation');
                var afterInitDelay = $owl.data('after-init-delay');
                var stopOnHoverData = $owl.data('stop-on-hover');
                var min600 = $owl.data('min600');
                var min800 = $owl.data('min800');
                var itemsData = $owl.data('items');
                var animateOutData = $owl.data('animate-out');
                var animateInData = $owl.data('animate-in');
                var min1200 = $owl.data('min1200');
                var responsiveItems = $owl.data('responsive-items');
                $owl.owlCarousel({
                    nav: navigationData,
                    dots: paginationData,
                    singleItem: singleItemData,
                    autoPlay: autoPlayData,
                    transitionStyle: transitionStyleData,
                    stopOnHover: stopOnHoverData,
                    animateOut: animateOutData,
                    animateIn: animateInData,
                    items: itemsData,
                    navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
                    responsive: {
                        0: {
                            items: responsiveItems
                        },
                        767: {
                            items: itemsData
                        }

                    },
                    itemsCustom: [
                        [0, 1],
                        [600, min600],
                        [800, min800],
                        [1200, min1200]
                    ],
                    afterInit: function (elem) {
                        if (mainSliderData) {
                            setTimeout(function () {
                                $('.main-slider_zoomIn').css('visibility', 'visible').removeClass('zoomIn').addClass('zoomIn');
                                $('.main-slider_fadeInLeft').css('visibility', 'visible').removeClass('fadeInLeft').addClass('fadeInLeft');
                                $('.main-slider_fadeInLeftBig').css('visibility', 'visible').removeClass('fadeInLeftBig').addClass('fadeInLeftBig');
                                $('.main-slider_fadeInRightBig').css('visibility', 'visible').removeClass('fadeInRightBig').addClass('fadeInRightBig');
                            }, afterInitDelay);
                        }
                    },
                    beforeMove: function (elem) {
                        if (mainSliderData) {
                            $('.main-slider_zoomIn').css('visibility', 'hidden').removeClass('zoomIn');
                            $('.main-slider_slideInUp').css('visibility', 'hidden').removeClass('slideInUp');
                            $('.main-slider_fadeInLeft').css('visibility', 'hidden').removeClass('fadeInLeft');
                            $('.main-slider_fadeInRight').css('visibility', 'hidden').removeClass('fadeInRight');
                            $('.main-slider_fadeInLeftBig').css('visibility', 'hidden').removeClass('fadeInLeftBig');
                            $('.main-slider_fadeInRightBig').css('visibility', 'hidden').removeClass('fadeInRightBig');
                        }
                    },
                    afterMove: sliderContentAnimate,
                    afterUpdate: sliderContentAnimate,
                });
            });
            function sliderContentAnimate(elem) {
                var $elem = elem;
                var afterMoveDelay = $elem.data('after-move-delay');
                var mainSliderData = $elem.data('main-text-animation');
                if (mainSliderData) {
                    setTimeout(function () {
                        $('.main-slider_zoomIn').css('visibility', 'visible').addClass('zoomIn');
                        $('.main-slider_slideInUp').css('visibility', 'visible').addClass('slideInUp');
                        $('.main-slider_fadeInLeft').css('visibility', 'visible').addClass('fadeInLeft');
                        $('.main-slider_fadeInRight').css('visibility', 'visible').addClass('fadeInRight');
                        $('.main-slider_fadeInLeftBig').css('visibility', 'visible').addClass('fadeInLeftBig');
                        $('.main-slider_fadeInRightBig').css('visibility', 'visible').addClass('fadeInRightBig');
                    }, afterMoveDelay);
                }
            }
        },
        fixedHeader: function (options) {
            if ($(window).width() > 767) {
                // Fixed Header
                var topOffset = $(window).scrollTop();
                if (topOffset > 0) {
                    $('.scrolling-header .navbar').addClass('navbar-scrolling');
                }
                $(window).on('scroll', function () {
                    var fromTop = $(this).scrollTop();
                    if (fromTop > 0) {
                        $('body').addClass('fixed-header');
                        $('.scrolling-header .navbar').addClass('navbar-scrolling');
                    } else {
                        $('body').removeClass('fixed-header');
                        $('.scrolling-header .navbar').removeClass('navbar-scrolling');
                    }

                });
            }
        },
        initTooltips: function () {
            $('[data-toggle="tooltip"]').tooltip();
        },
        loaderInit: function () {
            $(window).on('load', function () {
                var $preloader = $('#page-preloader'),
                        $spinner = $preloader.find('.spinner');
                $spinner.fadeOut();
                $preloader.delay(350).fadeOut(800);
            });
        },
        wowInit: function () {
            var scrollingAnimations = $('body').data("scrolling-animations");
            if (scrollingAnimations) {
                new WOW().init();
            }
        },
        initSliderPro: function () {
            $(".slider-pro-init").each(function (i) {
                var $sliderpro = $(this);
                var orientationData = $sliderpro.data('orientation');
                var arrowsControlData = $sliderpro.data('arrows-control');
                var buttonsControlData = $sliderpro.data('buttons-control');
                var buttonsControlData = $sliderpro.data('buttons-control');
                var autoheightData = $sliderpro.data('autoheight');
                $sliderpro.sliderPro({
                    width: 1920,
                    height: 800,
                    orientaton: orientationData,
                    fade: true,
                    arrows: arrowsControlData,
                    buttons: buttonsControlData,
                    waitForLayers: true,
                    thumbnailPointer: false,
                    touchSwipe: false,
                    autoHeight: autoheightData,
                    autoplay: true,
                    autoScaleLayers: false,
                    captionFadeDuration: 100
                });
            });
        }
    };
    Core.initialize();
})();