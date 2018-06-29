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
      post: {
        restaurant_id: "",
        name: "",
        rating: 5,
        comments: "",
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON(),
      },
      idbComments: {},
    };
  },
  methods: {
    submitForm() {
      const url = "http://localhost:1337/reviews/";

      this.post.restaurant_id = this.$route.params.id;

      fetch(url, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify(this.post)
      })
        .then(res => res.json())
        .then(res => {
          this.comments.push(res);
          this.idbComments.add(res);
          console.log("hey this is from fetch that synced")
          this.clearForm();
        });
    },
    clearForm() {
      let post = this.post;

      post.name = "";
      post.rating = 5;
      post.comments = "";
    }
  }, 
  created() {
    this.idbComments = new IdbCRUD("commentsDB", 1, "comments", "id");
  }
};
</script>

<template>
  <section class="review-form-container" >
    <form @submit.prevent="submitForm" class="review-form">
      <fieldset class="review-form__fieldset">
        <legend class="review-form__legend">Write a Review</legend>
        <input class="review-form__name-input" type="text" v-model="post.name" name="name" placeholder="Enter your name" required >
        <star-rating class="review-form__rating"  v-model="post.rating" :star-size="30" :show-rating="false" > </star-rating>
        <textarea class="review-form__text-area" v-model="post.comments" placeholder="Write your review here" required ></textarea>
        <button type="submit" class="review-form__button">Send</button>
    </fieldset>
    </form>
    
  </section>
</template>


<style  scoped>
.review-form-container {
  margin: 0 auto;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #fff;
  padding: 20px 30px;
  max-width: 800px;
  width: 100%;
}

.review-form__fieldset {
  padding: 2rem;
  display: flex;
}
.review-form {
  max-width: 600px;
  width: 100%;
}

.review-form__legend {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.review-form__name-label {
  font-size: 1.6rem;
}
.review-form__name-input {
  font-size: 1.6rem;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
}

.review-form__rating {
  margin-bottom: 1rem;
}

.review-form__text-area {
  font-size: 1.6rem;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  height: 10rem;
  resize: none;
}

.review-form__button {
  margin: 0 auto;
  font-size: 1.6rem;
  display: inline-block;
  height: 48px;
  min-width: 88px;
  padding: 6px 16px;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: 0;
  border-radius: 2px;
  background: #2196f3;
  color: #fff;
  outline: 0;
}
.review-form__button:focus {
  background: #0b76cc;
}
</style>

