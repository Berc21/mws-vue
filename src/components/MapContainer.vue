<script  >
export default {
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      lng: "",
      myMap: {},
      myPlacemark: {},
    };
  },
  methods: {
    clicked() {
      console.log(this.name);
    }
  },
  created() {
    setTimeout(() => {
      let routeName = this.$route.name;

      if (routeName === "Home") {
        this.myMap = new ymaps.Map("map", {
          center: [40.722216, -73.987501],
          zoom: 12
        });

        this.restaurants.map(restaurant => {
          let lat = restaurant.latlng.lat;
          let lng = restaurant.latlng.lng;
          let name = restaurant.name;

          this.myPlacemark = new ymaps.Placemark([lat, lng], {
            hintContent: name,
            balloonContent: name
          });

          this.myMap.geoObjects.add(this.myPlacemark);
        });
      }

      if (routeName === "Single") {
        let restaurant;

        [restaurant] = this.restaurants.filter(
          restaurant => restaurant.id == this.$route.params.id
        );

        let lat = restaurant.latlng.lat;
        let lng = restaurant.latlng.lng;
        let name = restaurant.name;

        this.myMap = new ymaps.Map("map", {
          center: [lat, lng],
          zoom: 12
        });

        this.myPlacemark = new ymaps.Placemark([lat, lng], {
          hintContent: name,
          balloonContent: name
        });

        this.myMap.geoObjects.add(this.myPlacemark);
      }
    }, 500);
  },
  watch: {
    restaurants(restaurants) {
         if (this.myMap.geoObjects) this.myMap.geoObjects.removeAll();

          restaurants.map(restaurant => {
          let lat = restaurant.latlng.lat;
          let lng = restaurant.latlng.lng;
          let name = restaurant.name;

          this.myPlacemark = new ymaps.Placemark([lat, lng], {
            hintContent: name,
            balloonContent: name
          });
          if (this.myMap.geoObjects) this.myMap.geoObjects.add(this.myPlacemark);
        });
       
    }
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

