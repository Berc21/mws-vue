<script>
import MapContainer from "@/components/MapContainer.vue";
import RestaurantDetails from "@/components/RestaurantDetails.vue";
import RestaurantComments from "@/components/RestaurantComments.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";

export default {
  components: {
    MapContainer,
    RestaurantDetails,
    RestaurantComments,
    BreadCrumb,
  },
  created() {

    const restaurantsUrl = "http://localhost:1337/restaurants";
    this.getRestaurant(restaurantsUrl);

    const commentsUrl = `http://localhost:1337/reviews/?restaurant_id=${this.$route.params.id}`;

    this.getComments(commentsUrl);


    console.log(this.restaurant.name);
  },
  data() {
    return {
      restaurants: [],
      restaurant: {},
      comments: [],
    };
  },
  methods: {
    getRestaurant(url) {
      let restaurant;
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.restaurants = res;
          [restaurant] = res.filter(
            item => item.id == this.$route.params.id
          );
          this.restaurant = restaurant;
        })
        .catch(err => console.log(err));
    },
    getComments(url) {
      fetch(url)
        .then(res => res.json())
        .then(res => this.comments = res
        )
        .catch(err => console.log(err));
    }
  }
};
</script>



<template>
<div>

 <bread-crumb :restaurant="restaurant" />
 <map-container :restaurants="restaurants" > </map-container>
 <restaurant-details :restaurant="restaurant" />
 <restaurant-comments  :comments="comments" />
 </div>
</template>