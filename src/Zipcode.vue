<template>
  <div>
    <slot>
      <input v-model="zipcode" ref="autocomplete" type="text" v-bind:placeholder="placeholder">
    </slot>
  </div>
</template>

<script>
import { geocode, filterComponents } from './geocode.js';

export default {
  props: {
    country: {type: String},
    placeholder: {type: String, default: 'zipcode'},
  },
  data: function() {
    return {
      zipcode: '',
    };
  },
  methods: {

  },
  mounted() {
    var element = this.$scopedSlots.default()[0].context.$refs.autocomplete;

    var options = {
      types: ['(regions)'],
    };

    if (this.country) {
      options.componentRestrictions = {
        country: this.country,
      };
    }

    this.autocomplete = new google
      .maps.places.Autocomplete(element, options);

    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();

      var latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      geocode(latlng).then(results => {
        var zipcode = filterComponents(results, 'postal_code');
        var city = filterComponents(results, 'locality');
        var country = filterComponents(results, 'country');

        var location = {
          place,
          latlng,
          city,
          zipcode,
          country,
        };

        this.$emit('selected', location);
      });

      this.$set(this.$data, 'zipcode', '');
    });
  },
}
</script>

