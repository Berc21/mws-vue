<script  >
export default {
  props: {
    restaurants: {
      type: Array,
      required: true,
    },

  },
  data() {
    return {
      lng: '',
    }
  },
  methods: {
    clicked() {
      console.log(this.name);
    }
  },
  created() {
      setTimeout(() => {

      let routeName = this.$route.name;

        if (routeName === "Home"){
           
          let myMap = new ymaps.Map("map", {
                center: [40.722216, -73.987501],
                zoom: 12
        });

           this.restaurants.map((restaurant => {
              let lat = restaurant.latlng.lat;
              let lng = restaurant.latlng.lng;
              let name = restaurant.name;

              let myPlacemark = new ymaps.Placemark([lat, lng], { hintContent: name, balloonContent: name  });
            
              myMap.geoObjects.add(myPlacemark);
      
           }));
           
        }

        if(routeName === "Single") {
         let restaurant; 

         [restaurant] = this.restaurants.filter(restaurant => restaurant.id == this.$route.params.id);
        
        let lat = restaurant.latlng.lat;
        let lng = restaurant.latlng.lng;
        let name = restaurant.name;

        let myMap = new ymaps.Map("map", {
                center: [lat, lng],
                zoom: 12
        });
        console.log(myMap);
     
        let myPlacemark = new ymaps.Placemark([lat, lng], { hintContent: name, balloonContent: name  });
            
        myMap.geoObjects.add(myPlacemark);   
        }
    }, 10)
  },

};
</script>

<template>

  <div>


  <section id="map-container">

      <div id="map"></div>
    </section>
    </div>
</template>

<style scoped>
#map {
  height: 400px;
  width: 100%;
  background-color: #ccc;
}

</style>

