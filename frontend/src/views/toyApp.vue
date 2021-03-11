<template>
  <div>
    <h1>Toy App</h1>
    <toy-filter />
    <todo-list :toys="toys" @removeToy="removeToy" />
  </div>
</template>

<script>
import { toyService } from '../services/toyService.js';
import todoList from '../cmps/toyList.vue';
import { store } from '../store/index.js';

import toyFilter from './toyFilter.vue';
export default {
  name: 'toyApp',
  data() {
    return {};
  },
  methods: {
    removeToy(toy) {
      this.$store.dispatch({ type: 'removeToy', toy });
    },
  },
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
  },
  components: {
    todoList,
    toyFilter,
  },
  created() {
    this.$store.dispatch('makeToys');
  },
};
</script>
