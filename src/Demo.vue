<template>
  <div class="wrapper">
    <h1>Vue Google Maps Zipcode Input</h1>
    <div>
      <!-- <p>Locations are logged to console once selected</p> -->
      <br>
      <Zipcode @selected="zipcodeSelected" country="FR">
        <input v-model="zipcode" type="text" ref="autocomplete" placeholder="zipcode">
      </Zipcode>
      <p>{{ location }}</p>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.wrapper
  font-family sans-serif
  width 80vw
  margin auto
  margin-top 20px
</style>

<script>
import Zipcode from './Zipcode.vue';

export default {
  data() {
    return {
      zipcode: '',
      location: '',
    }
  },
  methods: {
    zipcodeSelected(location) {
      this.$set(this.$data, 'zipcode', '');
      this.$set(this.$data, 'location', JSON.stringify({
        city: location.city,
        zipcode: location.zipcode,
        country: location.country,
      }));

      console.log(location);
    },
  },
  components: {
    Zipcode,
  }
}
</script>


