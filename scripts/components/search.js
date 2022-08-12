const { createApp, ref, onMounted, computed } = Vue;

export const customSearch = {
  setup() {
    const searchData = {
      input: {
        text: '',
        placeholder: 'Найдите нужную новость'
      },
    };

    const cardsData = ref([]);

    async function getDataApi() {
      let response = await fetch('https://www.anapioficeandfire.com/api/houses');
      let result = await response.json();

      console.log('result: ', result);

      cardsData.value = result;
    }

    onMounted(
      getDataApi
    );

    watch(getDataApi);

    const searchQuery = ref('');
    const searchNewsCards = computed(function() {
      return cardsData.value.map(
        value => value.name
      )
    });

    

    return {
      searchData,
      cardsData,
      searchNewsCards,
      searchQuery
    }
  },
  template: /*html*/`
    <div class="custom-search_wrap">
      <div class="custom-search">
        <input type="text" v-model="searchData.input.text" @input="searchNewsCards()" :placeholder="searchData.input.placeholder">
        <button>search</button>
        <p>{{searchData.input.text}}</p>
        <p class="val">{{searchNewsCards}}</p>
      </div>
    </div>
  `,
}

