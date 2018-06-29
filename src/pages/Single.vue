<script>
import MapContainer from "@/components/MapContainer.vue";
import RestaurantDetails from "@/components/RestaurantDetails.vue";
import RestaurantComments from "@/components/RestaurantComments.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import CommentForm from "@/components/CommentForm.vue";

import IdbCRUD from "idbcrud";
import { Google } from "vue-loading-spinner";

export default {
  components: {
    MapContainer,
    RestaurantDetails,
    RestaurantComments,
    BreadCrumb,
    CommentForm,
    Google
  },
  data() {
    return {
      restaurants: [],
      restaurant: {},
      comments: [],
      idbRestaurants: {},
      idbComments: {},
      cachedComments: false,
      cachedRestaurants: false,
      restaurantLoading: true,
    };
  },
  created() {
    this.idbRestaurants = new IdbCRUD("restaurantsDB", 1, "restaurants", "id");

    const restaurantsUrl = "http://localhost:1337/restaurants";
    this.getRestaurant(restaurantsUrl);

    this.idbComments = new IdbCRUD("commentsDB", 1, "comments", "id");

    const commentsUrl = `http://localhost:1337/reviews/?restaurant_id=${
      this.$route.params.id
    }`;

    this.getComments(commentsUrl);
  },
  methods: {
    getRestaurant(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.restaurants = res;
          this.idbRestaurants.addAll(res);

          if (!("indexedDB" in window)) {
            console.log(
              "This browser doesn't support IndexedDB, data will fetch directly from api"
            );
            [this.restaurant] = res.filter(
              item => item.id == this.$route.params.id
            );
          } else {
            this.getRestaurantFromIDB();
          }
        })
        .catch(err => {
          if (err.message == "Failed to fetch");
          {
            console.log(
              "Restaurant failed to fetch. data will be shown from indexedDB"
            );
            this.cachedRestaurants = true;
            this.getRestaurantFromIDB();
          }
        })
        .then(() => {
          this.restaurantLoading = false;
        });
    },
    getRestaurantFromIDB() {
      this.idbRestaurants.getAll().then(data => {
        [this.restaurant] = data.filter(
          item => item.id == this.$route.params.id
        );
      });
    },
    getComments(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          if (!("indexedDB" in window)) {
            console.log(
              "This browser doesn't support IndexedDB, data will fetch directly from api"
            );
            this.comments = res;
          } else {
            this.idbComments.addAll(res);
            this.getCommentsFromIDB();
          }
        })
        .catch(err => {
          if (err.message == "Failed to fetch");
          {
            console.log(
              err,
              "comments Failed to fetch. data will be shown from indexedDB"
            );
            this.cachedComments = true;
            this.getCommentsFromIDB();
          }
        });
    },
    getCommentsFromIDB() {
      this.idbComments
        .getAll()
        .then(data => {
          this.comments = data.filter(
            item => item.restaurant_id == this.$route.params.id
          );
        })
        .catch(err =>
          console.log(
            "error happended when getting comments from idb",
            err.message
          )
        );
    }
  }
};
</script>


<template>
<div>

  <bread-crumb :restaurant="restaurant" />
  
  <map-container :restaurants="restaurants" > </map-container>

    <div  v-show="restaurantLoading" class="spinner-container" >
      <google> </google>
      <p class="spinner-text">Loading...</p>
    </div>

  <restaurant-details :restaurant="restaurant" :comments="comments" />
  <restaurant-comments :cachedComments="cachedComments" :comments="comments" />
  <comment-form :comments="comments" ></comment-form>

 </div>
</template>

<style scoped>
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
