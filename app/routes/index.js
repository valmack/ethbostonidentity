import Route from '@ember/routing/route';
import Web3 from 'web3';

export default Route.extend({
 model() {
  const web3 = new Web3('http://localhost:3000')
  console.log('yo')
 }
});
