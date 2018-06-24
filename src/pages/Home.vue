
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
      isShownFav: false,
      beforeFiltered: []
    };
  },
  methods: {
    getRestaurants(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.restaurants = res;
          this.beforeFiltered = res;
        })
        .catch(err => console.log(err));
    },
    getfav() {
      if (this.isShownFav) {
        const url = "http://localhost:1337/restaurants";
        this.getRestaurants(url);
        this.isShownFav = false;
      } else {
        const url = "http://localhost:1337/restaurants/?is_favorite=true";
        this.getRestaurants(url);
        this.isShownFav = true;
      }
    },
    filterSelected(option) {
      this.restaurants = this.beforeFiltered;

      this.restaurants = this.restaurants.filter(item => {
        if (option.cuisine == "All" && option.neighborhood == "All") {
         return this.beforeFiltered;
        } else if (option.cuisine == "All") {
          return item.neighborhood == option.neighborhood;
        } else if (option.neighborhood == "All") {
          return item.cuisine_type == option.cuisine;
        } else {
          return item.cuisine_type == option.cuisine &&
            item.neighborhood == option.neighborhood;
        }
      });
    }
  },
  created() {
    const url = "http://localhost:1337/restaurants";
    this.getRestaurants(url);
  }
};
</script>



<template>
<div>
  <map-container :restaurants="restaurants" ></map-container>
  <filter-option :restaurants="restaurants" @filtered="filterSelected" > </filter-option>
  <restaurant-list  :restaurants="restaurants"> </restaurant-list>

  <button class="get-favorite-button" v-on:click="getfav" v-bind:class="{ isShownFav: isShownFav }" >  ❤  </button>
 </div>
</template>

<style>
.isShownFav {
  color: red;
}
.get-favorite-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 4rem;
  background-color: transparent;
  border: 0;
}
</style>
