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


    function dropdownSortMenu(event) {

      console.log('click dropdown');
      let status = selectData.value.stateOpen;
      console.log('status: ', status);
    
      if (!status) {
        openOrClose();
        document.addEventListener('click', outsideEvtListener);
      } else {
        document.removeEventListener('click', outsideEvtListener);
        openOrClose();
      }

    };

    function outsideEvtListener(event) {

      const customSelect = document.querySelector('.custom-select');
      const customBtn = document.querySelector('.custom-select__btn');
      const customOptions = document.querySelector('.custom-select__options');

      if (event.target === customSelect || customSelect.contains(event.target)) {
        console.log('no do');
        return;
      } else {
        console.log('yes do');
        openOrClose();
        document.removeEventListener('click', outsideEvtListener);
      }

    }
    

    function updateCategory(e) {

      let category = e.target.getAttribute('data-type');
      console.log('category: ', category);

      document.removeEventListener('click', outsideEvtListener);

      openOrClose();

      // 
    };

    function openOrClose() {
      let stateOpen = selectData.value.stateOpen;
      selectData.value.stateOpen = !stateOpen;
    }

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
  `,
};

createApp(test).mount('#test');