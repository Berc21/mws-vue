
<script>
import FilterOption from "@/components/FilterOption.vue";
import RestaurantList from "@/components/RestaurantList.vue";
import MapContainer from "@/components/MapContainer.vue";
export default {
  components: {
    RestaurantList,
    FilterOption,
    MapContainer
  },
  data() {
    return {
      restaurants: [],
    };
  },
  methods: {
    getRestaurants(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => (this.restaurants = res))
        .catch(err => console.log(err));
    }
  },
  created() {
    const url = "http://localhost:1337/restaurants";
    this.getRestaurants(url);
  },
};
</script>



<template>
<div>
  <filter-option/>
  <restaurant-list  :restaurants="restaurants"/>
 </div>
</template>