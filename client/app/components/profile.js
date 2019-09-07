import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  size: '',
  isFittedShirt: false,
  isVegan: false,
  isVegetarian: false,
  isGlutenFree: false,
  otherDietary: '',
  firstName: '',
  lastName: '',
  identity: 'http://example.com',
  nickname: computed('firstName', 'lastName', function() {
    if (!this.firstName || !this.lastName) {
      return ''
    } else {
      let lastInitial = this.lastName.slice(0, 1)
      return `${this.firstName} ${lastInitial}.`
    }
  })
});
