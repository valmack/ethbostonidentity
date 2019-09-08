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
  identity: computed('pubKey', function() {
    return this.torusLogin.pubKey[0]
  }),
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
  },
  actions: {
    copy(someKey) {
      navigator.clipboard.writeText(someKey)
    }
  }
});
