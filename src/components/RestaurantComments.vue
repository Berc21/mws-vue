<script>
import StarRating from "vue-star-rating";

import IdbCRUD from "idbcrud";

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
  data() {
    return {
      isEditing: false,
      elIndex: null,
      post: {
        name: null,
        rating: 5,
        comments: "",
      },
      idbComments: {},
    };
  },
  created() {
    this.idbComments = new IdbCRUD("commentsDB", 1, "comments", "id");

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
          this.idbComments.delete(id);
        });
    },
    showEdit(index, rating, name, comments) {
      this.isEditing = !this.isEditing;
      this.elIndex = index;

      this.post.name = name;
      this.post.rating = rating;
      this.post.comments = comments;
    },
    updateComment(id, index) {
      let url = `http://localhost:1337/reviews/${id}`;

      fetch(url, {
        method: "PUT",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify(this.post)
      })
        .then(res => res.json())
        .then(res => {
          this.comments.splice(index, 1);
          this.comments.splice(index, 0, res);
          this.idbComments.add(res);
          this.isEditing = false;
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

      let dateFormat = `${day} - ${month} - ${year}`;

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

       
      <div v-if="isEditing && comment.id == elIndex" >
      <form @submit.prevent="updateComment(comment.id, index)" >
      <input class="reviews-list__edit-name" type="text" v-model="post.name" required > <br>
        <star-rating style="margin: 1rem 0;" :star-size="30" :show-rating="false" :rating="comment.rating | numberize" v-model="post.rating" ></star-rating>
       <textarea class="reviews-list__edit-comment" v-model="post.comments" required ></textarea>
        <button class="reviews-list__update-button" type="submit" >Update</button>
        <button class="reviews-list__cancel-button" @click="showEdit()">Cancel</button>
        </form>
      </div>

      <div v-else>
      <p>{{comment.name}}</p>
      
       <p v-if="comment.updatedAt == comment.createdAt">{{comment.createdAt | beautifyDate }}</p>
       <p v-else>{{comment.updatedAt | beautifyDate }} - Edited</p>

       
       <p><star-rating :star-size="30" :show-rating="false" :read-only="true" :rating="comment.rating | numberize"  ></star-rating> </p>
       <p>{{comment.comments}}</p>
       <button class="reviews-list__edit-button" @click="showEdit(comment.id, comment.rating, comment.name, comment.comments)">Edit</button>
       <button class="reviews-list__delete-button" @click="deleteComment(comment.id, index)"> Delete</button>
      </div>
    
       </li>
      
    </transition-group >
  </ul>

  
      <p class="no-comment" v-if="comments.length < 1">
          No reviews written yet.
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
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.reviews-list__edit-name {
  padding: 1rem;
  border-radius: 0.2rem;
}
.reviews-list__edit-comment {
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  width: 100%;
  min-height: 100px;
  resize: none;
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

.reviews-list__update-button {
  background: transparent;
  border: 1px solid #4caf50;
  border-radius: 2em;
  color: #4caf50;
  display: inline-block;
  font-size: 12px;
  height: 20px;
  line-height: 2px;
  margin: 0 0 8px;
  padding: 0.5rem 1rem;
  text-align: center;
  min-width: 20px;
}

.reviews-list__cancel-button {
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
}
.reviews-list__edit-button {
  background: transparent;
  border: 1px solid #008cba;
  border-radius: 2em;
  color: #008cba;
  display: inline-block;
  font-size: 12px;
  height: 20px;
  line-height: 2px;
  margin: 0 0 8px;
  padding: 0.5rem 1rem;
  text-align: center;
  min-width: 20px;
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
