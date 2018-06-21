<template>
  <div id="app">
        <top-header/>
        <router-view />
        <bottom-footer/>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import Home from "@/pages/Home.vue";
import BottomFooter from "@/components/BottomFooter.vue";

export default {
  name: "app",
  components: {
    Home,
    TopHeader,
    BottomFooter,
  }
};
</script>

<style>
@charset "utf-8";
/* CSS Document */

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}



body,td,th,p{
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10pt;
	color: #333;
	line-height: 1.5;
}
body {
	background-color: #fdfdfd;
	margin: 0;
	position:relative;
}
ul, li {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10pt;
	color: #333;
}
a {
	color: orange;
	text-decoration: none;
}
a:hover, a:focus {
	color: #3397db;
	text-decoration: none;
}
a img{
	border: none 0px #fff;
}
h1, h2, h3, h4, h5, h6 {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 0 20px;
}

article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
	display: block;
}


</style>
