ymaps.ready(function () {
  // Создание экземпляра карты и его привязка к созданному контейнеру.
  var myMap = new ymaps.Map("mapPlaces", {
          center: [55.751574, 37.573856],
          zoom: 10,
          behaviors: ['default']
      });
      
      myMap.controls.add(
        new ymaps.control.ZoomControl(),
        { right: 110, top: 20 }
      );

      // Баллун свободной площадки.
      MyBalloonLayout1 = ymaps.templateLayoutFactory.createClass(
          '<div class="map-balloon top">' +
              '<a class="close" href="#"></a>' +
              '<div class="map-balloon-inner fc">' +
                  '<div class="pic"><a href="#"><img src="files/place-tmb-1.jpg"></a></div>' +
                  '<div class="descr"><div class="cont">' +
                  '<h4><a href="#">Большой зал торжеств в московской усадьбе купцов в Кузьминках, 150 м&sup2;</a></h4>' +
                  '<span class="details">Аренда от 70 до 120 тыс. руб.<br />От 100 до 150 гостей</span>' +
                  '</div></div>' +
              '</div>' +
          '</div>', {
          /**
           * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/layout.templateBased.Base.xml#build
           * @function
           * @name build
           */
          build: function () {
              this.constructor.superclass.build.call(this);

              this._element = $('.map-balloon', this.getParentElement());

              this.applyElementOffset();

              this._element.find('.close')
                  .on('click', $.proxy(this.onCloseClick, this));
          },

          /**
           * Удаляет содержимое макета из DOM.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/layout.templateBased.Base.xml#clear
           * @function
           * @name clear
           */
          clear: function () {
              this._element.find('.close')
                  .off('click');

              this.constructor.superclass.clear.call(this);
          },

          /**
           * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IBalloonLayout.xml#event-userclose
           * @function
           * @name onSublayoutSizeChange
           */
          onSublayoutSizeChange: function () {
              MyBalloonLayout1.superclass.onSublayoutSizeChange.apply(this, arguments);

              if(!this._isElement(this._element)) {
                  return;
              }

              this.applyElementOffset();

              this.events.fire('boundschange');
          },

          /**
           * Сдвигаем балун чтобы "хвостик" указывал на точку привязки.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IBalloonLayout.xml#event-userclose
           * @function
           * @name applyElementOffset
           */
          applyElementOffset: function () {
              this._element.css({
                  left: -(this._element[0].offsetWidth / 2) + 5,
                  top: -(this._element[0].offsetHeight) + 5
              });
          },

          /**
           * Закрывает баллун при клике на крестик, кидая событие "userclose" на макете.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IBalloonLayout.xml#event-userclose
           * @function
           * @name onCloseClick
           */
          onCloseClick: function (e) {
              e.preventDefault();

              this.events.fire('userclose');
          },

          /**
           * Используется для автопозиционирования (balloonAutoPan).
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/ILayout.xml#getClientBounds
           * @function
           * @name getClientBounds
           * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
           */
          getClientBounds: function () {
              if(!this._isElement(this._element)) {
                  return MyBalloonLayout1.superclass.getClientBounds.call(this);
              }

              var position = this._element.position();

              return [
                  [position.left, position.top], [
                      position.left + this._element[0].offsetWidth,
                      position.top + this._element[0].offsetHeight
                  ]
              ];
          },

          /**
           * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
           * @function
           * @private
           * @name _isElement
           * @param {jQuery} [element] Элемент.
           * @returns {Boolean} Флаг наличия.
           */
          _isElement: function (element) {
              return element && element[0];
          }
      });
      
      // Баллун занятой площадки
      
      MyBalloonLayout2 = ymaps.templateLayoutFactory.createClass(
          '<div class="map-balloon top">' +
              '<a class="close" href="#"></a>' +
              '<div class="map-balloon-inner fc">' +
                  '<div class="pic"><a href="#"><img src="files/place-tmb-1.jpg"></a></div>' +
                  '<div class="descr"><div class="cont">' +
                  '<h4><a href="#">Большой зал торжеств в Кузьминках, 150 м&sup2;</a></h4>' +
                  '<span class="details">Аренда от 70 до 120 тыс. руб.<br />От 100 до 150 гостей</span>' +
                  '</div></div>' +
              '</div>' +
          '</div>', {
          /**
           * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/layout.templateBased.Base.xml#build
           * @function
           * @name build
           */
          build: function () {
              this.constructor.superclass.build.call(this);

              this._element = $('.map-balloon', this.getParentElement());

              this.applyElementOffset();

              this._element.find('.close')
                  .on('click', $.proxy(this.onCloseClick, this));
          },

          /**
           * Удаляет содержимое макета из DOM.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/layout.templateBased.Base.xml#clear
           * @function
           * @name clear
           */
          clear: function () {
              this._element.find('.close')
                  .off('click');

              this.constructor.superclass.clear.call(this);
          },

          /**
           * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IBalloonLayout.xml#event-userclose
           * @function
           * @name onSublayoutSizeChange
           */
          onSublayoutSizeChange: function () {
              MyBalloonLayout1.superclass.onSublayoutSizeChange.apply(this, arguments);

              if(!this._isElement(this._element)) {
                  return;
              }

              this.applyElementOffset();

              this.events.fire('boundschange');
          },

          /**
           * Сдвигаем балун чтобы "хвостик" указывал на точку привязки.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IBalloonLayout.xml#event-userclose
           * @function
           * @name applyElementOffset
           */
          applyElementOffset: function () {
              this._element.css({
                  left: -(this._element[0].offsetWidth / 2) + 5,
                  top: -(this._element[0].offsetHeight) + 5
              });
          },

          /**
           * Закрывает баллун при клике на крестик, кидая событие "userclose" на макете.
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IBalloonLayout.xml#event-userclose
           * @function
           * @name onCloseClick
           */
          onCloseClick: function (e) {
              e.preventDefault();

              this.events.fire('userclose');
          },

          /**
           * Используется для автопозиционирования (balloonAutoPan).
           * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/ILayout.xml#getClientBounds
           * @function
           * @name getClientBounds
           * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
           */
          getClientBounds: function () {
              if(!this._isElement(this._element)) {
                  return MyBalloonLayout1.superclass.getClientBounds.call(this);
              }

              var position = this._element.position();

              return [
                  [position.left, position.top], [
                      position.left + this._element[0].offsetWidth,
                      position.top + this._element[0].offsetHeight
                  ]
              ];
          },

          /**
           * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
           * @function
           * @private
           * @name _isElement
           * @param {jQuery} [element] Элемент.
           * @returns {Boolean} Флаг наличия.
           */
          _isElement: function (element) {
              return element && element[0];
          }
      });

      // Создание вложенного макета содержимого балуна.
      // MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          // '<h3 class="map-balloon-title">$[properties.balloonHeader]</h3>' +
          // '<div class="map-balloon-content">$[properties.balloonContent]</div>'
      // ),

      // Метка свободной площадки
      myPlacemark1 = window.myPlacemark1 = new ymaps.Placemark([55.75, 37.65], {
          balloonHeader: '',
          balloonContent: ''
          
      }, {
          // Своё изображение иконки метки.
          iconImageHref: 'images/place-pin-free.png',
          // Размеры метки.
          iconImageSize: [40, 46],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-16, -41],
          balloonShadow: false,
          balloonLayout: MyBalloonLayout1
          //balloonContentLayout: MyBalloonContentLayout
         // Не скрываем иконку при открытом балуне.
         // hideIconOnBalloonOpen: false,
         // И дополнительно смещаем балун, для открытия над иконкой.
         // balloonOffset: [3, -40]
      });
      
      
      // Метка занятой площадки
      myPlacemark2 = window.myPlacemark2 = new ymaps.Placemark([55.66, 37.64], {
          balloonHeader: '',
          balloonContent: ''
          
      }, {
          // Своё изображение иконки метки.
          iconImageHref: 'images/place-pin-occupied.png',
          // Размеры метки.
          iconImageSize: [40, 46],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-16, -41],
          balloonShadow: false,
          balloonLayout: MyBalloonLayout2
          //balloonContentLayout: MyBalloonContentLayout
         // Не скрываем иконку при открытом балуне.
         // hideIconOnBalloonOpen: false,
         // И дополнительно смещаем балун, для открытия над иконкой.
         // balloonOffset: [3, -40]
      });

  myMap.geoObjects
    .add(myPlacemark1)
    .add(myPlacemark2);
    
  MyButtonLayout = ymaps.templateLayoutFactory.createClass(
            '<button style="display:none;" class="btn btn-large[if state.selected] active[endif]" title="$[data.title]">' +
                '<i class="icon-fullscreen icon-large"/>' +
            '</button>', {
                build: function () {
                    this.constructor.superclass.build.apply(this, arguments);

                    this._button = this.getData().control;
                    this._container = $('#mapPlaces');
                    this._smallSize = {
                        position: 'relative',
                        width: 1200,
                        height: 340,
                        marginLeft:-110
                    };
                    this._fullSize = {
                        position: 'fixed',
                        top: 0,
                        left:0,
                        width : $(window).width(),
                        height : $(window).height(),
                        zIndex: 10,
                        marginLeft: 0
                    }

                    this._attachHandlers();
                },
                clear: function () {
                    this._detachHandlers();

                    this.constructor.superclass.clear.apply(this, arguments);
                },
                _attachHandlers: function () {
                    this._button.events
                        .add(['select', 'deselect'], this._onButtonClick, this);
                },
                _detachHandlers: function () {
                    this._button.events
                        .remove(['select', 'deselect'], this._onButtonClick, this);
                },
                _onButtonClick: function (e) {
                    var map = this._button.getMap(),
                        state = this._button.state;

                    if(state.get('selected')) {
                        this._container
                            .css(this._fullSize);
                    }
                    else {
                        this._container
                            .css(this._smallSize);
                    }

                    map.container.fitToViewport();
                }
                
                
                
            }
        ),

        // Создание кнопки полноэкранного режима просмотра карты.
        button = new ymaps.control.Button({
            data: {
                title: 'Разворачивает карту на весь экран'
            }
        }, {
            // selectOnClick: false,
            layout: MyButtonLayout
        });
        
        $(".fullscreen-button").on("click",function() {
          $(".btn-large").click();
          $(this).find(".fullscreen-ico").toggleClass("fullscreen-ico-act");
          if ($(".fullscreen-ico").hasClass("fullscreen-ico-act")) {
            $(this).find("span").html("Свернуть");
            myMap.behaviors.enable('scrollZoom');
          } else {
            $(this).find("span").html("На весь экран");
            myMap.behaviors.disable('scrollZoom');
          }
        });

    // Добавление панели инструментов на карту
    myMap.controls.add(button, { top : 10, left : 10 });
  
  $(".map-buttons .map-button").click(function() {
    $(".map-buttons .map-button").removeClass("map-button-act");
    $(this).addClass("map-button-act");
    
    if ($(this).hasClass("map-mkad")) {
      myMap.setCenter([55.76, 37.64]);
      myMap.setZoom(10)
    }
    
    if ($(this).hasClass("map-ttk")) {
      myMap.setCenter([55.76, 37.64]);
      myMap.setZoom(11)
    }
    
    if ($(this).hasClass("map-all")) {
      myMap.setCenter([55.76, 37.64]);
      myMap.setZoom(8)
    }
    
  })
  
  $(".map-cont .pan-left").click(function() {
    var position = myMap.getGlobalPixelCenter();
    myMap.setGlobalPixelCenter([ position[0] - 200, position[1] ]);
  })
  
  $(".map-cont .pan-right").click(function() {
    var position = myMap.getGlobalPixelCenter();
    myMap.setGlobalPixelCenter([ position[0] + 200, position[1] ]);
  })
  
  $(".map-cont .pan-up").click(function() {
    var position = myMap.getGlobalPixelCenter();
    myMap.setGlobalPixelCenter([ position[0], position[1] - 200 ]);
  })
  
  $(".map-cont .pan-down").click(function() {
    var position = myMap.getGlobalPixelCenter();
    myMap.setGlobalPixelCenter([ position[0], position[1] + 200 ]);
  })
  
});

$(function () {

  

  $('#set-balloon-header').click(function () {
      window.myPlacemark.properties.set(
          'balloonHeader',
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      );
  });
  $('#set-balloon-content').click(function () {
      window.myPlacemark.properties.set(
          'balloonContent',
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      );
  });
});