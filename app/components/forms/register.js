import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
 torusLogin: service(),
 init() {
  this.torusLogin() // initialize service
  return this._super(...arguments)
 }
});
