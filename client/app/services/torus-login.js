import Service from '@ember/service';
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import { Enigma, utils, eeConstants } from 'enigma-js/node';


export default Service.extend({
	web3: null,
	web3enigma: null,
	pubKey: '',
	privKey: '',
	addr: '0xc9283cabdbd2f560549ce50c39d14d8b343cc9af',
	async init() {
		this._super(...arguments)
		const torus = new Torus();
		await torus.init();
		await torus.login(); // await torus.ethereum.enable()

		const web3 = new Web3(new Web3.providers.HttpProvider("http://18.217.190.250:9545"));
		// const web3 = new Web3(torus.provider);
		this.set('web3', web3)
		let pubKey = await web3.eth.getAccounts();
		this.set('pubKey', pubKey)
		this.initializeEnigmaContract()
	},
	async initializeEnigmaContract() {
		// let EnigmaContract;
		// let response = await fetch('smart_contracts/Sample.json')
		// EnigmaContract = await response.json()
		let pubKey = this.pubKey;
		let enigma = new Enigma(
      this.web3,
			this.addr,
			this.addr,
			'http://18.217.190.250:3346',
      {
        gas: 4712388,
        gasPrice: 100000000000,
        from: pubKey[0],
      }
    );
		enigma.admin();
		this.runMil(enigma)
	},
	async runMil(enigma) {
		const accounts = this.pubKey
		let taskFn = 'add_millionaire(address,uint256)';
		const contractAddr = this.addr
    let taskArgs = [
			[accounts[0], 'address'],
      [1000000, 'uint256'],
    ];
    let taskGasLimit = 500000;
    let taskGasPx = utils.toGrains(1);
		let task;
    task = await new Promise((resolve, reject) => {
      enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, accounts[0], contractAddr)
          .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
          .on(eeConstants.ERROR, (error) => reject(error));
    });

	}
});
