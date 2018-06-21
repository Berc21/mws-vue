<script  >
export default {
  props: {
    restaurant: {
      type: Object,
        required: true
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

        
     
      let lat = this.restaurant.latlng.lat;
      let lng = this.restaurant.latlng.lng
      let name = this.restaurant.name

      let myMap = new ymaps.Map("map", {
                center: [lat, lng],
                zoom: 18
        });


     let myPlacemark = new ymaps.Placemark([lat, lng], { hintContent: name, balloonContent: name  });
            
            myMap.geoObjects.add(myPlacemark);



     console.log(lat)

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

