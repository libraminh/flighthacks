<template>
  <div class="section--mapbox position-relative">
    <div class="crop crop--fit crop--16:9">
      <div id="map" class="crop__content" />
    </div>

    <div class="overlay">
      <button id="replay">Replay</button>
    </div>
  </div>
</template>

<script>
  import mapboxMixin from './mixin';

  export default {
    name: 'MapBox',
    data() {
      return {
        accessToken: 'pk.eyJ1IjoibWluaGxlIiwiYSI6ImNrNG10M3V2bTJvdGYzbHJ2b3g4MGFpangifQ.zyO59nbqhzVWBBMI-TfZJA',
        mapStyle: 'mapbox://styles/mapbox/streets-v11',
        center: [-96, 37.8],
        zoom: 3
      }
    },
    mixins: [mapboxMixin],
  };
</script>

<style lang="scss">
  #map, .section--mapbox {
    width: 100%;
    // height: 435px;
  }

  .section--mapbox {
    .overlay {
      position: absolute;
      top: 10px;
      left: 10px;
      opacity: 1;
    }
      
    .overlay button {
      font: 600 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
      background-color: #3386c0;
      color: #fff;
      display: inline-block;
      margin: 0;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      border-radius: 3px;
    }
    
    .overlay button:hover {
      background-color: #4ea0da;
    }
  }
</style>