import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  selected_type_addition: '',
  types: Object.freeze(['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl']),
  fit: computed('isFittedShirt', function() {
    return this.isFittedShirt ? 'Slim fit' : 'Regular fit';
  })
});
