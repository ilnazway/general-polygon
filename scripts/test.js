const { createApp, ref, onMounted } = Vue;

const test = {
  setup() {
    const selectData = ref({
      type: {
        all: 'Все новости',
        evol: 'Новый функционал',
        news: 'Новости компании',
        shop: 'Магазин конфигурации',
      },
      button: {
        title: 'Все новости',
      },
      stateOpen: false,
    });

    onMounted(
      function now() {
        let dropdown = document.querySelector('.custom-select__dropdown');
        // console.log(dropdown.closest('.custom-select'));
      }
    );

    function dropdownSortMenu(e) {

      let stateOpen = selectData.value.stateOpen;
      selectData.value.stateOpen = !stateOpen;

      let select = e.target.closest('.custom-select');
      console.log(select);
      // let dropdown = select.querySelector('.custom-select__dropdown');
      // console.log('dropdown: ', dropdown);

      document.addEventListener('click', outsideEvtListener);

      function outsideEvtListener(evt) {
      console.log('evt: ', evt);
          if (evt.target === select || select.contains(evt.target)) {
              return;
          }
stateOpen = selectData.value.stateOpen;
          selectData.value.stateOpen = !stateOpen;
          // убираем слушатель событий
          document.removeEventListener('click', outsideEvtListener);
      }
    };

    

    function updateCategory(e) {
      let category = e.target.getAttribute('data-type');
      console.log('category: ', category);

      // document.removeEventListener('click', outsideEvtListener);

      // let stateOpen = selectData.value.stateOpen;
      // selectData.value.stateOpen = !stateOpen;
    };

    return {
      selectData,
      dropdownSortMenu,
      updateCategory,
    }
  },
  template: /*html*/`
  <div class="custom-select_wrap">
    <div class="custom-select">
    <button class="custom-select__btn" :class="{'custom-select__btn_open': selectData.stateOpen}" @click="dropdownSortMenu($event)">{{ selectData.button.title }}</button>
        <div class="custom-select__dropdown" :class="{'custom-select__dropdown_open': selectData.stateOpen}">
          <ul class="custom-select__options">
            <li class="custom-select__option" v-for="(option, nameObj) in selectData.type" :key="nameObj" :data-type="nameObj" @click="updateCategory($event)">{{ option }}</li>
          </ul>
        </div>
    </div>
  </div>
  <div class="cubick"></div>
  `,
};

createApp(test).mount('#test');