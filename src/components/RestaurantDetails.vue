<script>
export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
   computed: {
     
     isFav() {
       let fav;
        if (this.restaurant.is_favorite === "true") {
        fav = true;
      } else {
        fav = false;
      }
      return fav;

     }
 
  },
  methods: {
    handleLike() {
      let id = this.restaurant.id;

      let fav = !this.isFav;

      fetch(`http://localhost:1337/restaurants/${id}/?is_favorite=${fav}`, {
        method: "PUT"
      })
        .then(res => res.json())
        .then(res => (this.restaurant.is_favorite = res.is_favorite));
    }
  },
};
</script>

<template>
   <section id="restaurant-container">
      <h1 id="restaurant-name" > {{ restaurant.name }}</h1>
      <img id="restaurant-img" class="restaurant-img" :src="`../static/${restaurant.photograph}.jpg`">
      <p id="restaurant-cuisine">{{restaurant.cuisine}}</p>
      <p id="restaurant-address">{{restaurant.address}}</p>
      <table id="restaurant-hours">

        <tr v-for="(value, key) in restaurant.operating_hours" :key="key" >
            {{ key }}: {{ value }}
        </tr> 
      </table>

      <button @click="handleLike"  v-bind:class="{ isFav: isFav }" > ❤ </button>
    </section>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.isFav {
  color: red;
}
#restaurant-name {
  color: #f18200;
  font-family: Arial, sans-serif;
  font-size: 20pt;
  font-weight: 200;
  letter-spacing: 0;
  margin: 15px 0 30px;
  text-transform: uppercase;
  line-height: 1.1;
}
#restaurant-img {
  width: 90%;
}
#restaurant-address {
  font-size: 12pt;
  margin: 10px 0px;
}
#restaurant-cuisine {
  background-color: #333;
  color: #ddd;
  font-size: 12pt;
  font-weight: 300;
  letter-spacing: 10px;
  margin: 0 0 20px;
  padding: 2px 0;
  text-align: center;
  text-transform: uppercase;
  width: 90%;
}

#restaurant-container {
  margin: 0 auto;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #fff;
  padding: 40px 30px;
  width: 50%;
}
</style>
