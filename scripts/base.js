
import { CustomSearch } from './components/search.js';
import { CustomSelect } from './components/select.js';
import { ContentCards } from './components/cards.js';
import { CustomPagination } from './components/pagination.js';

const { createApp, ref, toRef, onMounted, computed } = Vue;

const base = {

  setup() {

    const dataForDraw = ref({
      dataCards: [],
      totalCards: 0,
      amountCards: 15,
      requestCardsFunc: requestCards,
    });

    const requestData = {
      amountCards: 15,
      startCard: 1,
      endCard: 15,
      type: 'shop',
    }

    const imitationType = {
      all: '',
      shop: '',
      evol: ''
    };

    /**
     * @param {string} type - тип новостей
     * @returns данные новостей и общее количество по типу
     */
    async function requestCards(num) {
      dataForDraw.value.dataCards = [];
      try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${num}`);
        let result = await response.json();
        let postresult = await JSON.parse(JSON.stringify(result));
        console.log('postresult: ', postresult);

        dataForDraw.value.dataCards.push(...postresult);
        console.log('dataForDraw.value.dataCards: ', dataForDraw.value.dataCards);

        const totalResult = 151;
        dataForDraw.value.totalCards = totalResult;
        console.log('dataForDraw.value.totalCards: ', dataForDraw.value.totalCards);
      } catch (error) {
        console.log('error: ', error);
      }
    };

    function quantityPagePagination() {
      console.log(dataForDraw.value.totalCards);
    };

    onMounted(
      requestCards(1),
    );

    return {
      dataForDraw,
    }

  },
  components: {
    'custom-search': CustomSearch,
    'custom-select': CustomSelect,
    'content-cards': ContentCards,
    'custom-pagination': CustomPagination,
  },
  template: /*html*/`
    <div class="base">
      <custom-search></custom-search>
      <custom-select></custom-select>
      <custom-pagination :data-for-draw="dataForDraw"></custom-pagination>
      <content-cards :data-for-draw="dataForDraw"></content-cards>
    </div>
  `,
};

createApp(base).mount('#base-block');