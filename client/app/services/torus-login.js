import Service from '@ember/service';
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import { Enigma, utils, eeConstants } from 'enigma-js/node';


const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => { 
      // Modern dapp browsers...
      if (window.ethereum) {
          const provider = new Web3.providers.HttpProvider(
              "http://127.0.0.1:9545"
          );
          const web3 = new Web3(provider);
          resolve(web3);
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });


const getEnigmaInit = async () => {
    try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        const responseEnigmaContract = await fetch('enigma_contracts/EnigmaSimulation.json');
        const EnigmaContract = await responseEnigmaContract.json();

        const responseEnigmaTokenContract = await fetch('enigma_contracts/EnigmaToken.json');
        const EnigmaTokenContract = await responseEnigmaTokenContract.json();

        const enigma = new Enigma(
            web3,
            EnigmaContract.networks['4447'].address,
            EnigmaTokenContract.networks['4447'].address,
            'http://localhost:3346',
            {
                gas: 4712388,
                gasPrice: 100000000000,
                from: (await web3.eth.getAccounts())[0],
            },
        );
        enigma.admin();
        return enigma;
    } catch (error) {
        // Catch any errors for any of the above operations.
        console.log(error);
    }
};


export default Service.extend({

	web3Torus: null,
	web3Enigma: null,
	pubKey: '',
	privKey: '',
	addr: '0xc9283cabdbd2f560549ce50c39d14d8b343cc9af',
	async init() {
		this._super(...arguments)
		const torus = new Torus();
		await torus.init();
		await torus.login(); // await torus.ethereum.enable()
		const web3Torus = new Web3(torus.provider)
		const web3Enigma = new Web3(new Web3.providers.HttpProvider("http://18.217.190.250:9545"));
		this.set('web3Enigma', web3Enigma)
		this.set('web3Torus', web3Torus)
		let pubKey = await web3Torus.eth.getAccounts();
		this.set('pubKey', pubKey)
		this.set('qrAddr', pubKey[0])
		this.initializeEnigmaContract()
	},
	async initializeEnigmaContract() {
		const enigma = await getEnigmaInit();
		const accounts = await enigma.web3.eth.getAccounts();
		console.log(enigma)
		console.log(accounts)
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
