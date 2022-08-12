const { ref, onMounted } = Vue;

export const customSelect = {
  setup() {
    const selectData = ref({
      type: {
        all: 'Все новости',
        evol: 'Новый функционал',
        news: 'Новости компании',
        shop: 'Магазин конфигурации',
        houses: 'houses',
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


    function openOrClose() {
      let stateOpen = selectData.value.stateOpen;
      selectData.value.stateOpen = !stateOpen;
    };

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
    

    function updateCategory(event) {

      document.removeEventListener('click', outsideEvtListener);
      openOrClose();

      let category = event.target.getAttribute('data-type');

      let categoryTitle = event.target.textContent.trim();
      selectData.value.button.title = categoryTitle;

      updateNewsCards(category);
    };

    async function updateNewsCards(category) {
      try {
        let request = await fetch(`https://www.anapioficeandfire.com/api/${category}`);
        let result = await request.json();
        console.log('result: ', result);
      } catch {
        console.log('error');
      }
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

// createApp(customSelect);