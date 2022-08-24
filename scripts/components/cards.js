const { createApp, ref, onMounted, computed, watch, toRefs } = Vue;

export const ContentCards = {
  props: ['dataForDraw'],

  setup(props) {

    function updateCards() {
      return props.dataForDraw.dataCards;
    }

    return {
      updateCards,
    };

  },

  template: /*html*/ `
    <div v-for="dataCard in updateCards()" :key="dataCard.id">
      <ul>
        <li><h4>{{ dataCard.title }}</h4></li>
        <li>{{ dataCard.body }}</li>
      </ul>
      <hr>
    </div>
  `
};
