 $.ajax({ // Формируем запрос
        type: "POST",
        url: "events.php",
        data: {sel: 'get', csrf: csrf},
        success: function (msg) { // Сообщение с сервера
            // Если пользователь не найден - редиректим на страницу авторизации
            if (msg === 'Unknown user') location.href = 'login.php';

            // Если истекло время сессии -> выводим сообщение, перезагружаем страницу
            if (msg === 'Session has expired') {
                session_has_expired = true;
                /*if (!alertIsShowed) {
                    alertIsShowed = true;
                    if (confirm(lang.Session_time_expired)) window.location.reload();
                    else window.location.reload();
                }
                return false;*/
            }

            events_array5 = JSON.parse(msg);
          }
        });


        $.ajax({ // Формируем запрос
        type: "POST",
        url: "events.php",
        data: {sel: 'get', csrf: csrf},
        success: function (msg) { // Сообщение с сервера
            if (msg == "EMPTY") {
                cbTipsDisplay.fullLoad[type] = 1;
                $("#tip_load_block").remove();
                if (!document.getElementById("tip_list_item_" + type) && cbTipsDisplay.displayed[type] != 0)
                    document.getElementById("tip_window_list").innerHTML += "<table class='tip_list_item t_" + type + " all_load' id='tip_list_item_" + type + "' cellspacing='0' style='border: none'><tr><td style='padding: 10px 0px; text-align: center'>" + lang.tips_loaded + "</td></tr></table>";
                return;
            }

            tips5 = JSON.parse(msg);
          }
        })

  data: {sel: 'get', type: 'tips', key: 'load', value: {type: type, offset: offset, limit: limit}, csrf: csrf},