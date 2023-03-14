export { geocode, filterComponents };

import _ from 'lodash';

/**
 * Extract the first instance of component type
 * from google maps complex components.
 *
 * E.g. with country:
 * [{...}, {...}] => ["FR", "FR", "FR"] => "FR"
 */
function filterComponents(results, type) {
  return _(results).map(result => {
    return result.address_components
      .filter(component => {
        return _.includes(component.types, type);
      })
      .map(component => {
        return component.short_name;
      });
  })
  .flatten()
  .first();
}

function geocode (location) {
  var geocoder = new google.maps.Geocoder;

  var promise = new Promise(function(resolve, reject) {
    geocoder.geocode({
      location: location,
    }, function(results, status) {
      if (status === 'OK') {
        resolve(results);
      } else {
        console.log('Geocoder failed due to: ' + status);
        reject();
      }
    });
  });

  return promise;
}
