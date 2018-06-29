<script>
import StarRating from "vue-star-rating";
import IdbCRUD from "idbcrud";

export default {
  components: {
    StarRating
  },
  props: {
    restaurant: {
      type: Object,
      required: true
    },
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      totalRating: 0,
      idbFavs: {},
    };
  },
  created() {
    this.idbFavs = new IdbCRUD("favsDB", 1, "favs", "id");
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
    },

    calcTotalRating() {
      let totalComments = this.comments.length;
      let total = 0;

      this.comments.map(item => (total += Number(item.rating)));

      this.totalRating = total / totalComments;
      return this.totalRating;
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
        .then(res => {

          fav ? this.idbFavs.add(res) :  this.idbFavs.delete(res.id);

          this.restaurant.is_favorite = res.is_favorite;
        });
    }
  }
};
</script>

<template>
   <section id="restaurant-container">
      <h1 id="restaurant-name" > {{ restaurant.name }}</h1>
      <img v-if="restaurant.photograph" id="restaurant-img" class="restaurant-img" :src="`../static/${restaurant.photograph}.jpg`">
      <img v-else class="restaurant-img" :src="`../static/10.jpg`">
      <p id="restaurant-cuisine">{{restaurant.cuisine}}</p>
      <p id="restaurant-address">{{restaurant.address}}</p>
      <table id="restaurant-hours">
        <tr v-for="(value, key) in restaurant.operating_hours" :key="key" >
           <strong>  {{ key }}: </strong> {{ value }}
        </tr> 
      </table>
      <transition name="fade">
      <div  v-if="calcTotalRating" class="average">
      <star-rating class="average__star" :star-size="30" :show-rating="true" :read-only="true" :rating="totalRating" :increment="0.1" ></star-rating> 
        <p class="average__text">Average Rating</p>
      </div>
      </transition>
      <button @click="handleLike" class="fav-button" v-bind:class="{ isFav: isFav }" > ❤ </button>
    </section>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#restaurant-name {
  color: #f44336;
  font-family: Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0;
  margin: 1.5rem 0 3rem;
  text-transform: uppercase;
  line-height: 1.1;
}

#restaurant-img {
  max-width: 100%;
}

#restaurant-address {
  font-size: 2rem;
  margin: 10px 0px;
}

#restaurant-cuisine {
  background-color: #333;
  color: #ddd;
  font-size: 1.6rem;
  font-weight: 300;
  letter-spacing: 1rem;
  margin: 0 0 2rem;
  padding: 2px 0;
  text-align: center;
  text-transform: uppercase;
  width: 90%;
}
#restaurant-hours {
  background: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
}
#restaurant-hours tr {
  color: #666;
  font-size: 1.6rem;
}

#restaurant-container {
  margin: 0 auto;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #fff;
  padding: 4rem 3rem;
  width: 50%;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.average {
  position: absolute;
  bottom: 18%;
  right: 10rem;
  background: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
}
.average__star {
  font-size: 1.6rem;
}
.average__text {

  font-size: 1.6rem;
}

.isFav {
  color: red;
}
.fav-button {
  font-size: 4rem;
  position: absolute;
  background-color: transparent;
  border: 0;
  bottom: 5rem;
  right: 10rem;
}

@media only screen and (max-width: 60rem) {
  #restaurant-container {
    width: 100%;
  }

  .average {
    position: static;
    margin-top: 1rem;
  }


  .fav-button {
    bottom: 5rem;
    right: 5rem;
  }
}
</style>
