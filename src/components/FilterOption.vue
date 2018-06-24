
<script>
export default {
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      option: {
        neighborhood: "All",
        cuisine: "All"
      },
    };
  },
  methods: {
    changeOption() {
       this.$emit('filtered', this.option)
    }
  }
};
</script>


<template>
  <div class="filter-options">
        <h2>Filter Results</h2>
        
        <select id="neighborhoods-select" v-model="option.neighborhood" @change="changeOption" name="neighborhoods" >
          <option value="All">All Neighborhoods</option>
          <option value="Manhattan">Manhattan</option>
          <option value="Brooklyn">Brooklyn</option>
          <option value="Queens">Queens</option>
        </select>
        
        <select id="cuisines-select" name="cuisines" v-model="option.cuisine"  @change="changeOption" >
            <option value="All">All Cuisines</option>
          <option value="Asian">Asian</option>
          <option value="Pizza">Pizza</option>
          <option value="American">American</option>
          <option value="Mexican">Mexican</option>
        </select>
      </div>
</template>

<style scoped>
.filter-options {
  width: 100%;
  background-color: #3397db;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-options h2 {
  color: black;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  margin: 0 2rem;
}

.filter-options select {
  background-color: white;
  border: 1px solid #fff;
  font-family: Arial, sans-serif;
  font-size: 1.6rem;
  height: 3.5rem;
  letter-spacing: 0;
  margin: 1rem;
  padding: 0 1rem;
  width: 20rem;
}

@media only screen and (max-width: 60rem) {
  .filter-options {
    flex-direction: column;
    padding-top: 1rem;
  }
}
</style>
