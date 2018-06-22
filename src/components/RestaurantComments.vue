<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  methods: {}
};
</script>

<template>
<section id="reviews-container">
  
  <ul id="reviews-list" >
    <li v-for="(comment, index) in comments" :key="index" >
         <p>{{comment.name}}</p>
       <p>October 26, 2016</p>
       <p>{{comment.rating}}</p>
       <p>{{comment.comments}}</p>
       </li>
  </ul>
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
}
#reviews-list li p {
  margin: 0 0 10px;
}
#restaurant-hours td {
  color: #666;
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
