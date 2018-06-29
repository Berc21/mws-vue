<script>
import TopHeader from "@/components/TopHeader.vue";
import Home from "@/pages/Home.vue";
import BottomFooter from "@/components/BottomFooter.vue";
import OfflineIndicator from "@/components/OfflineIndicator.vue"; 

export default {
  name: "app",
  components: {
    Home,
    TopHeader,
    BottomFooter,
    OfflineIndicator
  }
};
</script>

<template>
  <div id="app">
        <top-header/>
        <router-view />
        <bottom-footer/>
        <offline-indicator/>
  </div>
</template>

<style>
@charset "utf-8";
/* CSS Document */
* {
  padding: 0;
  margin: 0;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  height: 100%;
  box-sizing: border-box;
  font-size: 62.5%;
  /* it means 1rem 10px, very easy to calculate rem */
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.5;
  color: #333;
  background-color: #f3f3f3;
  position: relative;
}

:focus {
  outline: 0.2rem dotted #f44336;
}

ul,
li {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.6rem;
  color: #333;
}

a {
  color: orange;
  text-decoration: none;
}

a:hover,
a:focus {
  color: #3397db;
  text-decoration: none;
}

a img {
  border: none 0 #fff;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 0 2rem;
}

article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
</style>
