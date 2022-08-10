const { createApp, ref } = Vue;

const test = {
  setup() {
    const list = ['cat', 'dog', 'people', 'people'];

    return {
      list,
    }
  },
  template: /*html*/`
    <ul>
      <li v-for="(item, index) of list" :class="index" :key="index">{{index}} = {{ item }}</li>
    </ul>
  `,
};

createApp(test).mount('#test');