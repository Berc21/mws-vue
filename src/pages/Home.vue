
<script>
import FilterOption from "@/components/FilterOption.vue";
import RestaurantList from "@/components/RestaurantList.vue";
import MapContainer from "@/components/MapContainer.vue";

import IdbCRUD from "idbcrud";
import { Google } from "vue-loading-spinner";

export default {
  components: {
    RestaurantList,
    FilterOption,
    MapContainer,
    Google
  },
  data() {
    return {
      restaurants: [],
      isShownFav: false,
      beforeFiltered: [],
      favs: [],
      idbRestaurants: {},
      idbFavs: {},
      restaurantLoading: true
    };
  },
  methods: {
    getRestaurants(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          if (!("indexedDB" in window)) {
            console.log(
              "This browser doesn't support IndexedDB, data will fetch directly from api"
            );
            this.restaurants = res;
            this.beforeFiltered = res;
          } else {
            this.idbRestaurants.addAll(res);

            this.idbRestaurants.getAll().then(data => {
              this.restaurants = data;
              this.beforeFiltered = data;
            });
          }
        })
        .catch(err => {
          if (err.message == "Failed to fetch");
          {
            console.log(
              err,
              "comments Failed to fetch. data will be shown from indexedDB"
            );

            this.idbRestaurants.getAll().then(data => {
              this.restaurants = data;
              this.beforeFiltered = data;
            });
          }
        })
        .then(() => {
          this.restaurantLoading = false;
        });
    },
    getFav(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          if (!("indexedDB" in window)) {
            console.log(
              "This browser doesn't support IndexedDB, data will fetch directly from api"
            );
            this.favs = res;
          } else {
            this.idbFavs.addAll(res);
            this.idbFavs.getAll().then(data => {
              this.favs = data;
            });
          }
        })
        .catch(err => {
          if (err.message == "Failed to fetch");
          {
            console.log(
              err,
              "comments Failed to fetch. data will be shown from indexedDB"
            );
            this.idbFavs.getAll().then(data => {
              this.favs = data;
            });
          }
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

   <div  v-show="restaurantLoading" class="spinner-container" >
    <google> </google>
     <p class="spinner-text">Loading...</p>
  </div>

  <button class="get-favorite-button" @click="addFav" v-bind:class="{ isShownFav: isShownFav }" >  ❤  </button>
 </div>
</template>

<style scoped >
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

.spinner-container {
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 3;
}
.spinner-text {
  font-size: 1.2rem;
  font-size: bold;
}
</style>
