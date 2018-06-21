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
    padding: 10px 40px 16px;
    list-style: none;
    background-color: #eee;
    font-size: 17px;
    margin: 0;
    width: calc(50% - 80px);
}

/* Display list items side by side */
#breadcrumb li {
    display: inline;
}

/* Add a slash symbol (/) before/behind each list item */
#breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}

/* Add a color to all links inside the list */
#breadcrumb li a {
    color: #0275d8;
    text-decoration: none;
}

/* Add a color on mouse-over */
#breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
}
</style>

