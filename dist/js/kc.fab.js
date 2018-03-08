
/*===================================================================
=            KC.FAB : Materialize Floating Action Button            =
===================================================================*/
/*
 * Copyright 2015 Mark Luk
 * Released under the MIT license
 * https://github.com/katrincwl/kc_fab/blob/master/LICENSE
 *
 * @author: Mark Luk
 * @version: 1.0
 * @date: 18/3/2015
 * 
 * @modifier: AllDone
 * @date: 09/11/2017
 */
(function ($) {
    if (!$.kc) {
        $.kc = new Object();
    };

    $.kc.fab = function (el, links, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("kc.fab", base);

        var main_fab_btn;
        var sub_fab_btns;
        base.clickOnMenuButtons = false;
        base.close = function () {
            $.when().then(function () {
                setTimeout(function () {
                    if (!base.clickOnMenuButtons) {
                        base.opened=false;
                        sub_fab_btns.removeClass('show');
                        overlay = $(".kc_fab_overlay");
                        overlay.remove();                        
                    }
                }, 150);
            }, function (reason) { console.log(reason) });
           
        };
        base.closeDeferred = function (event, callback) {
            var defer = $.Deferred();            
            setTimeout(function () {
                callback(event);
                defer.resolve(true);
            }, 1);

            return defer.promise();
        };
        base.init = function () {
            if (typeof (links) === "undefined" || links === null) {
                links = [
                    {
                        "url": null,
                        "bgcolor": "red",
                        "icon": "+",
                        'not':'hing'
                    },
                    {
                        "url": "http://www.example.com",
                        "bgcolor": "orange",
                        "icon": "+"
                    },
                    {
                        "url": "http://www.example.com",
                        "bgcolor": "yellow",
                        "icon": "+"
                    }
                ];
            }
            base.opened=false;
            base.clickcount = 0;
            base.links = links;
            if (base.links.length > 0) {
                main_btn = base.links[0];
                color_style = (main_btn.color) ? "color:" + main_btn.color + ";" : "";
                bg_color_style = (main_btn.bgcolor) ? "background-color:" + main_btn.bgcolor + ";" : "";
                main_btn_dom = "<button data-link-href='" + ((main_btn.url) ? main_btn.url : "") + "' data-link-target='" + ((main_btn.target) ? main_btn.target : "") + "' class='kc_fab_main_btn' style='" + bg_color_style + "'><span style='" + color_style + "'>" + main_btn.icon + "</span><div></div></button>";
                sub_fab_btns_dom = "";
                base.links.shift();

                var sub_fab_btns_domContainer = $("<div>");
                sub_fab_btns_domContainer.addClass('sub_fab_btns_wrapper');
                
                for (var i = 0; i < base.links.length; i++) {
                    color_style = (base.links[i].color) ? "color:" + base.links[i].color + ";" : "";
                    bg_color_style = (base.links[i].bgcolor) ? ("background-color:" + base.links[i].bgcolor + ";") : "background:#F44336;";
                    id_elem = "";
                    if (typeof (base.links[i].id) != "undefined") {
                        id_elem = "id='" + base.links[i].id + "'";
                    }
                    var extra_data = '';
                    if (base.links[i].extraData) {
                        extra_data = " data-extra=" + base.links[i].extraData + " ";
                    }
                    var disabled = '';
                    if (base.links[i].disabled !== null && typeof base.links[i].disabled !== 'undefined' && base.links[i].disabled) {
                        disabled = " disabled ";
                    }


                    var templateDiv = $("<div>");
                    var templateButton = $("<button>");
                    var templateSpan = $("<span>");
                    templateButton.attr('id', base.links[i].id);
                    templateButton.attr('type', 'button');
                    if (base.links[i].disabled !== null && typeof base.links[i].disabled !== 'undefined' && base.links[i].disabled) {
                        templateButton.attr('disabled', 'disabled');
                    }
                    templateButton.attr('data-link-title', base.links[i].title);
                    templateButton.addClass('sub_fab_btn');
                    if (base.links[i].titleAlwaysOn) {
                        templateButton.addClass('always');
                    }
                    if (base.links[i].cssClass) {
                        var classes = base.links[i].cssClass.split(' ');
                        for (var u = 0; u < classes.length; u++) {
                            templateButton.addClass(classes[u]);
                        }
                    }
                    if (base.links[i].bgcolor) {
                        templateButton.css('background-color', base.links[i].bgcolor);
                    }

                    templateSpan.css('color', (base.links[i].color ? base.links[i].color : 'black'));
                    if (base.links[i].icon) {
                        templateSpan.append(base.links[i].icon);
                    }
                    templateButton.append(templateSpan);
                    if (base.links[i].innerFn) {
                        if (typeof base.links[i].innerFn === 'string') {
                            templateButton.data('fxn', eval(base.links[i].innerFn));
                        }
                        else {
                            templateButton.data('fxn', base.links[i].innerFn);
                        }
                        templateButton .on('mousedown', function (e) {
                       // templateButton.click(function (e) {                           
                            if (!base.clickOnMenuButtons) {
                                base.clickOnMenuButtons = true;
                               //  console.time('click');
                                console.log('click n', ++base.clickcount);                                    
                              /*        $(this).data('fxn')(e);
                              $.when().then(function(fsd){
                                    base.clickOnMenuButtons = false;
                                    base.close();
                                }, function (reason) {
                                    base.clickOnMenuButtons = false;
                                    console.log('click button error ', reason);                                    
                                });
                            */
                              base.closeDeferred(e, $(this).data('fxn')).then(function () {
                                   // console.timeEnd('click');
                                    base.clickOnMenuButtons = false;
                                    base.close();
                                }, function (reason) {
                                    base.clickOnMenuButtons = false;
                                    console.log('click button error ', reason);                                    
                                });
                            }
                        });
                    } else {
                        if (base.links[i].fn) {
                            var thisEl = "(this)";
                            if (base.links[i].onlyEvent) {
                                thisEl = "(event)";
                            }
                            if (base.links[i].onlyThis) {
                                thisEl = "(this)";
                            }
                            if (base.links[i].eventAndThis) {
                                thisEl = "(event,this)";
                            }
                            templateButton.attr('onclick', base.links[i].fn + thisEl);
                        } else {
                            templateButton.attr('data-link-href', (base.links[i].url ? base.links[i].url : ""));
                            templateButton.attr('data-link-target', ((base.links[i].target) ? base.links[i].target : ""));
                        }
                    }
                    templateDiv.append(templateButton);
                    sub_fab_btns_domContainer.append(templateDiv);
                };
                base.$el.append(sub_fab_btns_domContainer).append(main_btn_dom);

            } else {
                if (typeof console == "undefined") {
                    window.console = {
                        log: function (msg) {
                            alert(msg);
                        }
                    };
                }
                console.log("Invalid links array param");
            }

            base.options = $.extend({}, $.kc.fab.defaultOptions, options);


            main_fab_btn = base.$el.find(".kc_fab_main_btn");
            sub_fab_btns = base.$el.find(".sub_fab_btns_wrapper");

            main_fab_btn.click(function (e) {
                if ($(this).attr('data-link-href').length > 0) {
                    if ($(this).attr('data-link-target')) {
                        window.open($(this).attr('data-link-href'), $(this).attr('data-link-target'));
                    } else {
                        window.location.href = $(this).attr('data-link-href');
                    }
                }
                sub_fab_btns.toggleClass('show');

                if ($(".kc_fab_overlay").length > 0) {
                    $(".kc_fab_overlay").remove();
                    main_fab_btn.blur();
                } else {
                    $('body').append('<div class="kc_fab_overlay" ></div>');
                }

                if ($(this).find(".ink").length === 0) {
                    $(this).prepend("<span class='ink'></span>");
                } else {
                    $(this).find(".ink").remove();
                    $(this).prepend("<span class='ink'></span>");
                }

                ink = $(this).find(".ink");

                if (!ink.height() && !ink.width()) {
                    d = Math.max($(this).outerWidth(), $(this).outerHeight());
                    ink.css({ height: d, width: d });
                }

                x = e.pageX - $(this).offset().left - ink.width() / 2;
                y = e.pageY - $(this).offset().top - ink.height() / 2;

                ink.css({ top: y + 'px', left: x + 'px' }).addClass("animate");

            });

            sub_fab_btns.find('.sub_fab_btn').on('mousedown', function (e) {

                if ($(this).attr('data-link-href') && $(this).attr('data-link-href').length > 0) {
                    if ($(this).attr('data-link-target')) {
                        window.open($(this).attr('data-link-href'), $(this).attr('data-link-target'));
                    } else {
                        window.location.href = $(this).attr('data-link-href');
                    }
                }
                setTimeout(function () { 
                    if (!base.clickOnMenuButtons) {
                         base.close();
                    } 
                }, 300);
            });

 
            main_fab_btn.focusout(base.close);          
        };

        base.init();
    };

    $.kc.fab.defaultOptions = {};

    $.fn.kc_fab = function (links, options) {
        return this.each(function () {
            (new $.kc.fab(this, links, options));
        });
    };

})(jQuery);