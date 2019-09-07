extern crate enigma_identity;
use enigma_identity::IdentityStorage;

fn main() {
    let mut identity_storage = IdentityStorage::new();
    let address = String::from("eth_address");
    identity_storage.add_identity(String::from(&address), 25);
    let meets_age_requirement = identity_storage.is_age_at_least(String::from(&address), 30);
    println!("Does user '{}' meet {} requirement? {}", String::from(&address), "age", meets_age_requirement)
}
