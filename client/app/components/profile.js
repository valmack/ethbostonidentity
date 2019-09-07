import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  torusLogin: service(),
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
  }),
  init() {
    this._super(...arguments);
    this.torusLogin
  }
});
