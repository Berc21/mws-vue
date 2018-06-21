
<script>
export default {
  
}
</script>


<template>
  <div class="filter-options">
        <h2>Filter Results</h2>
        <select id="neighborhoods-select" name="neighborhoods" onchange="updateRestaurants()">
          <option value="all">All Neighborhoods</option>
        <option value="Manhattan">Manhattan</option><option value="Brooklyn">Brooklyn</option><option value="Queens">Queens</option></select>
        <select id="cuisines-select" name="cuisines" onchange="updateRestaurants()">
          <option value="all">All Cuisines</option>
        <option value="Asian">Asian</option><option value="Pizza">Pizza</option><option value="American">American</option><option value="Mexican">Mexican</option></select>
      </div>
</template>

<style scoped>
.filter-options {
  width: 100%;
  height: 50px;
  background-color: #3397DB;
  align-items: center;
}
.filter-options h2 {
  color: white;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1;
  margin: 0 20px;
}
.filter-options select {
  background-color: white;
  border: 1px solid #fff;
  font-family: Arial,sans-serif;
  font-size: 11pt;
  height: 35px;
  letter-spacing: 0;
  margin: 10px;
  padding: 0 10px;
  width: 200px;
}
</style>
