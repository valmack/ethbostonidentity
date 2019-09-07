import Service from '@ember/service';
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";



export default Service.extend({
	web3: null,
	pubKey: '',
	privKey: '',
	async init() {
		this._super(...arguments)
		const torus = new Torus();
		await torus.init();
		await torus.login(); // await torus.ethereum.enable()
		const web3 = new Web3(torus.provider);
		this.set('web3', web3)
		let pubKey = await web3.eth.getAccounts();
		this.set('pubKey', pubKey)
	}
});
