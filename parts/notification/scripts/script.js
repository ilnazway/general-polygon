
outputNotification();

function outputNotification() {
  let listNewNotif = [];
  let flickerTimer;
  let flickerTimerIcon;
  let flashingTime = 1000;
  const startTitle = document.title;
  const icon = document.querySelector('link[rel="icon"]');
  const urlDefaultIcon = icon.getAttribute('href');
  const urlIconNotif = './img/icon_songs.ico';

  newValueNotification();

  function newValueNotification() {

    const field = document.querySelector('#field');
    btnAdd = document.querySelector('#add');

    btnAdd.addEventListener('click', function() {
      let newValue = field.value;
      console.log('stop');
      clearInterval(flickerTimer);
      document.title = startTitle;

      if (newValue.length > 0) {
        listNewNotif.push(newValue);
        console.log('listNewNotif: ', listNewNotif);
      };

    });

    stratFlickerNotif(listNewNotif);

  };

  function stratFlickerNotif(list) {
    const listNotification = list;

    const btnStart = document.querySelector('#start');
    btnStart.addEventListener('click', function() {

      let count = 0;
      let listLength = listNotification.length;

      if (listLength === 0) {

        return;

      } else if (listLength === 1) {
        document.title = listNotification[0];
        startFlickerIcon();

        flickerTimer = setInterval(function() {
          if (count % 2 == 0) {
            document.title = startTitle;
          } else {
            document.title = listNotification[0];
          };
          count++;
        }, flashingTime);

      } else {
        document.title = listNotification[0];
        startFlickerIcon();

        flickerTimer = setInterval(function() {
          if ((listLength - 1) <= count) {
            count = 0;
          } else {
            count++;
          }
          document.title = listNotification[count];
        }, flashingTime);

      }
    });

    const btnStop = document.querySelector('#stop');
    btnStop.addEventListener('click', function() {
      clearInterval(flickerTimer);
      clearInterval(flickerTimerIcon);

      icon.setAttribute('href', urlDefaultIcon);
      document.title = startTitle;
      console.log('stop');
    });
  };

  function startFlickerIcon() {
    let count = 0;
    icon.setAttribute('href', urlIconNotif);

    flickerTimerIcon = setInterval(function() {

      if (count % 2 === 0) {
        icon.setAttribute('href', urlDefaultIcon);
      } else {
        icon.setAttribute('href', urlIconNotif);
      }
      count++;

    }, flashingTime);
  }
};






