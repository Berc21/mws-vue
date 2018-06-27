<script>
import MapContainer from "@/components/MapContainer.vue";
import RestaurantDetails from "@/components/RestaurantDetails.vue";
import RestaurantComments from "@/components/RestaurantComments.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import CommentForm from "@/components/CommentForm.vue";

import IdbCRUD from "idbcrud";

export default {
  components: {
    MapContainer,
    RestaurantDetails,
    RestaurantComments,
    BreadCrumb,
    CommentForm
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
  data() {
    return {
      restaurants: [],
      restaurant: {},
      comments: [],
      idbRestaurants: {},
      idbComments: {}
    };
  },
  methods: {
    getRestaurant(url) {
      let restaurant;
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.restaurants = res;
          [restaurant] = res.filter(item => item.id == this.$route.params.id);
          this.restaurant = restaurant;
        })
        .catch(err => {
          this.idbRestaurants.getAll().then(data => {
            this.restaurants = data;
            [restaurant] = data.filter(
              item => item.id == this.$route.params.id
            );
            this.restaurant = restaurant;
           
          });
        });
    },
    getComments(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.idbComments.addAll(res);
          this.comments = res;
        })
        .catch(err => {
          console.log(err);
          this.idbComments.getAll().then(data => {
          this.comments = data.filter(item => item.restaurant_id == this.$route.params.id);
          });
        });
    }
  }
};
</script>


<template>
<div>

  

 <bread-crumb :restaurant="restaurant" />
 <map-container :restaurants="restaurants" > </map-container>
 <restaurant-details :restaurant="restaurant" :comments="comments" />
 <restaurant-comments :comments="comments" />
 <comment-form :comments="comments" ></comment-form>

 </div>
</template>