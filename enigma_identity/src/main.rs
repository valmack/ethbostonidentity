extern crate enigma_identity;
use enigma_identity::IdentityStorage;

fn main() {
    let mut identity_storage = IdentityStorage::new();
    let address = String::from("eth_address");
    identity_storage.add_identity(address, 25);
}
