<template>
  <div v-if="toy">
    <form @submit="saveToy">
      <ValidationProvider rules="required" v-slot="{ errors }">
        <el-input class="input-name-edit" type="text" id="name-input" v-model="toy.name" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider rules="min:1" v-slot="{ errors }">
        <el-input-number :min="Number(0)" id="price-input" v-model="toy.price" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <el-checkbox id="inStock-input" v-model="toy.inStock">In Stock</el-checkbox>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <el-select v-model="toy.type">
          <el-option :label="'Educational'" :value="'educational'" />
          <el-option :label="'Funny'" :value="'funny'" />
          <el-option :label="'Adult'" :value="'adult'" />
        </el-select>
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <el-button type="success" round>Submit</el-button>
    </form>
  </div>
  <div v-else>
    <form @submit="saveNewToy" class="inputs-edit">
      <ValidationProvider rules="required" v-slot="{ errors }">
        <el-input type="text" placeholder="name" id="name-input" v-model="newToy.name" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider rules="min:1" v-slot="{ errors }">
        <el-input-number :min="Number(0)" id="price-input" v-model="newToy.price" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <el-checkbox id="inStock-input" v-model="newToy.inStock">In Stock</el-checkbox>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <el-select v-model="newToy.type" placeholder="type">
          <el-option :label="'Educational'" :value="'educational'" />
          <el-option :label="'Funny'" :value="'funny'" />
          <el-option :label="'Adult'" :value="'adult'" />
        </el-select>
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <button type="success" round>Submit</button>
    </form>
  </div>
</template>

<script>
import { required, min } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', required);
extend('min', { ...min, message: 'We need to sell toys at a profit' });

export default {
  name: 'toyEdit',
  data() {
    return {
      newToy: {
        name: null,
        price: null,
        type: null,
        inStock: null,
        createAt: Date.now(),
        _id: null,
      },
    };
  },
  methods: {
    saveToy() {
      console.log('this.toy:', this.toy);
      this.$store.dispatch('saveToy', this.toy);
      this.$router.push('/toyApp');
    },
    saveNewToy() {
      const newToy = this.newToy;
      console.log('newToy:', newToy);
      this.$store.dispatch({ type: 'toyAdd', newToy });
      this.$router.push('/toyApp');
    },
  },
  computed: {
    toy() {
      return this.$store.getters.toy;
    },
  },
  components: {},
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.$store.dispatch({ type: 'toyEdit', id });
    }
  },
  destroyed() {},
};
</script>
