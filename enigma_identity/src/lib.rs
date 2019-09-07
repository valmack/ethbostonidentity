extern crate eng_wasm;
extern crate eng_wasm_derive;
use eng_wasm::*;
use eng_wasm_derive::*;

pub struct PrivateIdentity {
    address: String,
    age: u64,
    // TODO: Add more fields here and allow fields to be mutable.
}

pub struct IdentityStorage {
   identities: Vec<PrivateIdentity>,
}

impl IdentityStorage {
    pub fn new() -> IdentityStorage {
        IdentityStorage {
            identities: Vec::new(),
        }
    }

    pub fn add_identity(&mut self, address: String, age: u64) {
        let identity = PrivateIdentity {
            address,
            age,
        };
        self.identities.push(identity);
    }
}
