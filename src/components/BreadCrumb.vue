<script>
export default {
    props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  
}
</script>

<template>
  <ul id="breadcrumb">
      <li><a href="/">Home</a> </li> 
      <li>{{restaurant.name}}</li>
  </ul>
</template>



<style scoped>

#breadcrumb {
  padding: 1rem 4rem 1.6rem;
  list-style: none;
  background-color: #eee;
  font-size: 1.7rem;
  margin: 0;
  width: 100%;
}

/* Display list items side by side */

#breadcrumb li {
  display: inline;
}

/* Add a slash symbol (/) before/behind each list item */

#breadcrumb li+li:before {
  padding: 0.8rem;
  color: black;
  content: "/\00a0";
}

/* Add a color to all links inside the list */

#breadcrumb li a {
  color: #01579B;
  text-decoration: none;
}

/* Add a color on mouse-over */

#breadcrumb li a:hover {
  color: #009688;
  text-decoration: underline;
}

</style>

