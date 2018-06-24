<script>
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteComment(id, index) {
      let url = `http://localhost:1337/reviews/${id}`;

      fetch(url, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(res => {
          this.comments.splice(index, 1);
        });
    }
  },
  filters: {
    beautifyDate(value) {
      let date = new Date(value);

      let year = date.getFullYear();

      let day = date.getDate();

      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let month = months[date.getMonth()];

      let dateFormat = `${day} - ${month} - ${year} `;

      return dateFormat;
    },
    numberize(value) {
      return Number(value);
    }
  }
};
</script>

<template>
<section id="reviews-container">
  
  <ul id="reviews-list" >
    <transition-group name="fade">
    <li v-for="(comment, index) in comments" :key="index" >
         <p>{{comment.name}}</p>
       <p>{{comment.createdAt | beautifyDate }}</p>
       <p><star-rating :star-size="30" :show-rating="false" :read-only="true" :rating="comment.rating | numberize" ></star-rating> </p>
       <p>{{comment.comments}}</p>

       <button class="reviews-list__delete-button" @click="deleteComment(comment.id, index)"> Delete</button>
       </li>
    </transition-group >
  </ul>

  
      <p class="no-comment" v-if="comments.length < 1">
       No reviews found yet.
      </p>
  
</section>
     
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#reviews-container {
  margin: 0 auto;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #fff;
  padding: 140px 40px 30px;
  width: 50%;
}
#reviews-container {
  padding: 30px 40px 80px;
}
#reviews-container h2 {
  color: #f58500;
  font-size: 24pt;
  font-weight: 300;
  letter-spacing: -1px;
  padding-bottom: 1pt;
}
#reviews-list {
  margin: 0;
  padding: 0;
}
#reviews-list li {
  background-color: #fff;
  border: 2px solid #f3f3f3;
  display: block;
  list-style-type: none;
  margin: 0 0 30px;
  overflow: hidden;
  padding: 20px 20px;
  position: relative;
  width: 85%;
  position: relative;
}
#reviews-list li p {
  margin: 0 0 10px;
}
#restaurant-hours td {
  color: #666;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.reviews-list__delete-button {
  background: transparent;
  border: 1px solid #f00;
  border-radius: 2em;
  color: #f00;
  display: inline-block;
  font-size: 12px;
  height: 20px;
  line-height: 2px;
  margin: 0 0 8px;
  padding: 0.5rem 1rem;
  text-align: center;
  min-width: 20px;
  position: absolute;
  top: 2rem;
  right: 2rem;
}

.no-comment {
  text-align: center;
  font-size: 2.2rem;
  color: orangered;
}


@media only screen and (max-width: 60rem) {
  #reviews-container {
    width: 100%;
  }

  #reviews-list li {
    width: 30rem;
    max-width: 100%;
  }
}
</style>
