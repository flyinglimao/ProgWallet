fn check_sha256_preimage(input: [u8], test: [u8; 32]) -> bool {
    std::hash::sha256(input) == test
}
