const { createApp, ref, onMounted, computed, watch, toRefs } = Vue;

export const CustomPagination = {
  props: ['dataForDraw'],

  setup(props) {

    // let count = ref(props.dataForDraw.totalCards);

    function numberPages() {
      let count = props.dataForDraw.totalCards;
      console.log('count: ', count);
      let amount = props.dataForDraw.amountCards;
      console.log('amount: ', amount);
      let total = Math.ceil(count / amount);
      console.log('total: ', total);
      if (total > 15) {
        total = 15;
      } else if (total === 1) {
        return;
      }
      return total;
    };

    function goPage(event, num) {
      event.preventDefault();
      props.dataForDraw.requestCardsFunc(num);
    }

    const newValue = computed(numberPages);

    // onMounted(
    //   numberPages,
    // )

    return {
      newValue,
      goPage
    }
  },

  template: /*html*/ `
    <div>
      <h3>Pagination</h3>
      <p>{{ dataForDraw.totalCards }}</p>
      <p>{{ newValue }}</p>

      <ul>
        <li>
          <a v-for="num in newValue" @click="goPage($event, num)" href="#">{{ num }}</a>
        </li>
      </ul>
      <hr>
    </div>
  `,
};