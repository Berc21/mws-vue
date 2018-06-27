
<script>
import FilterOption from "@/components/FilterOption.vue";
import RestaurantList from "@/components/RestaurantList.vue";
import MapContainer from "@/components/MapContainer.vue";

import IdbCRUD from "idbcrud";

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
      beforeFiltered: [],
      favs: [],
      idbRestaurants: {},
      idbFavss: {}
    };
  },
  methods: {
    getRestaurants(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.idbRestaurants.addAll(res);

          // this.restaurants = res;
          this.restaurants = res;
          this.beforeFiltered = res;
        })
        .catch(err => {
          console.log("This is from indexeddb");
          this.idbRestaurants.getAll().then(data => {
            this.restaurants = data;
          });
        });
    },
    getFav(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.idbFavs.addAll(res);
          this.favs = res;
        }).catch(err => {
          this.idbFavs.getAll().then(data => {
            this.favs = data;
          });
        });
    },
    addFav() {
      if (this.isShownFav) {
        this.restaurants = this.beforeFiltered;
        this.isShownFav = false;
      } else {
         this.restaurants = this.favs;
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
          return (
            item.cuisine_type == option.cuisine &&
            item.neighborhood == option.neighborhood
          );
        }
      });
    }
  },
  created() {
    this.idbRestaurants = new IdbCRUD("restaurantsDB", 1, "restaurants", "id");
    const restaurantsUrl = "http://localhost:1337/restaurants";

    this.getRestaurants(restaurantsUrl);

    this.idbFavs = new IdbCRUD("favsDB", 1, "favs", "id");
   

    const favUrl = "http://localhost:1337/restaurants/?is_favorite=true";

    this.getFav(favUrl);
  }
};
</script>



<template>
<div>
  <map-container :restaurants="restaurants" ></map-container>
  <filter-option :restaurants="restaurants" @filtered="filterSelected" > </filter-option>
  <restaurant-list  :restaurants="restaurants"> </restaurant-list>

  <button class="get-favorite-button" @click="addFav" v-bind:class="{ isShownFav: isShownFav }" >  ❤  </button>
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
