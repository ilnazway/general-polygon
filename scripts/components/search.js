const { createApp, ref, onMounted, computed, watch, toRefs } = Vue;

export const CustomSearch = {

  propts: {
    string: 'test props',
  },


  setup(propts) {

    const propsDataTest = toRefs(propts);

    const searchData = {
      input: {
        text: '',
        placeholder: 'Найдите нужную новость'
      },
    };

    const allRequest = {
      search: '',
      test: 'https://www.anapioficeandfire.com/api/houses',
    };

    const resultSearchNews = ref({});

    const reactiveInput = ref([]);

    const cardsData = ref([]);

    async function getDataApi() {
      let response = await fetch('https://www.anapioficeandfire.com/api/houses');
      let result = await response.json();

      // console.log('result serach.js: ', result);

      cardsData.value = result;
    };

    onMounted(
      getDataApi,
    );

    watch(resultSearchNews, watchDo);

    function watchDo() {
      console.log(propsDataTest.value);
    }

    const searchQuery = ref('');

    function searchRelevant() {
      console.log(searchData.input.text);

      fetch(allRequest.test, {
        method: 'GET',
        // headers: { 'Content-type': 'application/json' },
        // body: searchData.input.text,
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        return resultSearchNews.value = data;
      });


    };

    return {
      searchData,
      cardsData,
      reactiveInput,
      searchRelevant,
      searchQuery
    }
  },
  template: /*html*/`
    <div class="custom-search_wrap">
      <div class="custom-search">
        <input type="text" v-model="searchData.input.text" @keyup.enter="searchRelevant()" :placeholder="searchData.input.placeholder">
        <button @click="searchRelevant()">search</button>
        <p>{{reactiveInput.value}}</p>
        <p class="val">{{searchNewsCards}}</p>
      </div>
    </div>
  `,
}

