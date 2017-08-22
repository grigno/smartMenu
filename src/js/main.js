/*!
 * smartMenu.js v0.1 - Build at runtime a functional smart menu!
 * Copyright (c) 2017 Marco Grignaffini grigno@gmail.com
 * License: MIT
 */

(function ($) {
  $.fn.smartMenu = function (options) {
    // Establish our default settings
    var settings = $.extend({
      prependTo: $('body'), // Prepend to item
      hashSuffix: '', // eg: section
      scrollSpeed: 800,
      offset: 80,
      onScrollStart: function () {
      },
      onScrollEnd: function () {
      }
    }, options, $.fn.smartMenu.defaults);

    var self = this;
    var items = [];
    var menuSelector = settings.menuSelector;
    var hashSuffix = settings.hashSuffix;
    var scrollSpeed = settings.scrollSpeed;
    var offset = settings.offset;
    var prependTo = settings.prependTo;

    $(window).on('scroll', function () {
      if (items.length) {
        if ($(document).scrollTop() - self.first().offset().top > 0 - offset) {
          if (!$(menuSelector).hasClass('shown')) {
            $(menuSelector).addClass('shown');
          }
        } else {
          if ($(menuSelector).hasClass('shown')) {
            $(menuSelector).removeClass('shown');
          }
        }

        //scroll spy
        self.each(function (i, e) {
          if ($(document).scrollTop() - $(e).offset().top > -offset) {
            //console.log($(e).data('hash'))
            $(menuSelector).find('a').removeClass('active');
            var t = $(e).data('hash');
            $(menuSelector).find('a[href*="#' + t + '"]').addClass('active');
          }
        });

        if ($(window).scrollTop() + $(window).height() === $(document).height()) {
          $(menuSelector).find('a').removeClass('active');
          $(menuSelector).find('a').last().addClass('active');
        }

      }
    });

    $(document).on('click', menuSelector + ' a', function (e) {
      var item = $(this);

      settings.onScrollStart.call($(this));

      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        e.preventDefault();
        scrollPage(item);
      }
    });

    $(window).on('load', function () {
      var h = location.hash;
      if (h.length) {
        var d = h.substr(1);
        if (!$("[data-hash=" + d + "]").is($("[data-hash]").first())) {
          scrollPage();
        }
      }
    });

    var scrollPage = function (item) {
      var hashName;
      if (!item){
        hashName = location.hash;
      }else{
        hashName = item[0].hash
      }

      var hashValue = hashName.slice(1);

      if (hashValue.length && hashValue.substr(0, hashSuffix.length) === hashSuffix) {
        var target = $('[data-hash=' + hashValue + ']');
        $('html, body').animate({
          scrollTop: target.offset().top - offset + 40
        }, scrollSpeed, function () {
          location.hash = hashName;
          settings.onScrollEnd.call(item);
        });
      }
    };

    self.each(function () {
      var item = {};
      item['hash'] = $(this).data('hash');
      item['text'] = $(this).data('title');

      items.push(item);
    });

    var build = function (items) {
      if (items.length) {
        var html = '<div class="smart-menu"><div class="smart-wrapper"><div class="menu-centered"><ul class="menu">';
        $.each(items, function (i, e) {
          var href = location.pathname + '#' + e.hash;
          html += '<li><a href="' + href + '">' + e.text + '</a></li>';
        });
        html += '</ul></div></div></div>';

        $(prependTo).prepend(html);
      }
    };

    return build(items);

  }


  $.fn.smartMenu.defaults = {
    menuSelector: '.smart-menu'
  };

}(jQuery));