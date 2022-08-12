
import { customSearch } from './components/search.js';
import { customSelect } from './components/select.js';

const { createApp, ref, onMounted } = Vue;

const base = {
  setup() {
    onMounted(
      function() {
        // console.log('ok');
      }
    );

  },
  components: {
    'custom-search': customSearch,
    'custom-select': customSelect,
  },
  template: /*html*/`
    <div class="base">
      <custom-search></custom-search>
      <custom-select></custom-select>
    </div>
  `,
};

createApp(base).mount('#base-block');