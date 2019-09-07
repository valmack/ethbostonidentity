import Service from '@ember/service';
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";



export default Service.extend({
	web3: null,

	async init() {
		const torus = new Torus();
		await torus.init();
		await torus.login(); // await torus.ethereum.enable()
		const web3 = new Web3(torus.provider);
		this.set('web3', web3)
		return this._super(...arguments)
	}
});
