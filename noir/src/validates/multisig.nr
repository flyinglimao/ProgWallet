fn check_signatures_threshold(hashed_message : [u8;32], pub_key_xs : [[u8;32]], pub_key_ys : [[u8;32]], signatures: [[u8;64]], threshold: Field) -> bool {
    let mut pass = true;

    for i in 0..threshold {
        pass &= std::ecdsa_secp256k1::verify_signature(pub_key_xs[i], pub_key_ys[i], signatures[i], hashed_message);
    };

    pass
}
