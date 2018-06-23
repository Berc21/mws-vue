
<script>
export default {
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  },
  computed: {}
};
</script>

<template>

<section class="restaurants-list-container">
  <ul id="restaurants-list" >
     
    <li v-for="(restaurant, index) in restaurants" :key="index" >
     
        <img v-if="restaurant.photograph" class="restaurant-img" :src="`./static/${restaurant.photograph}.jpg`">
        <img v-else class="restaurant-img" :src="`./static/10.jpg`">
        <h1>{{restaurant.title}}</h1>
        <p>{{restaurant.neighborhood}}</p>
        <p>{{restaurant.address}}</p>
        <router-link :to="`/restaurant/${restaurant.id}`"> View Details </router-link>
       
    </li>
    
    </ul>
</section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.restaurants-list-container {
  max-width: 114rem;
  margin: auto;
}

#restaurants-list {
  background-color: #f3f3f3;
  list-style: outside none none;
  margin: 0;
  padding: 3rem 1.5rem 6rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

#restaurants-list li {
  background-color: #fff;
  border: 0.2rem solid #ccc;
  font-family: Arial, sans-serif;
  margin: 1.5rem;
  max-width: 100%;
  width: 32rem;
  min-height: 38rem;
  padding: 0 3rem 2.5rem;
  text-align: left;
}

#restaurants-list .restaurant-img {
  background-color: #ccc;
  display: block;
  margin: 0;
  width: calc(100% + 6rem);
  margin-left: -3rem;
  height: auto;
}

#restaurants-list li h1 {
  color: #f44336;
  font-family: Arial, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 1.3;
  margin: 2rem 0 1rem;
  text-transform: uppercase;
}

#restaurants-list p {
  margin: 0;
  font-size: 1.6rem;
}

#restaurants-list li a {
  background-color: orange;
  border-bottom: 0.3rem solid #eee;
  color: #424242;
  display: inline-block;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 1.5rem 0 0;
  padding: 0.8rem 3rem 1rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
