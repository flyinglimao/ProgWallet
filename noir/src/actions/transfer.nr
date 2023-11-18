// 20 bytes for address and 32 bytes for uint256
// work for both erc20 and erc721
// I guess it's mainly for erc721
fn check_transfer_eq(callData: [u8; 52], limit: [u8; 32]) -> bool {
    false
}

// we don't need to gt because it doesn't make sense (no reason to check it doesn't spend too less)
// we use lt because it's more efficient? maybe (I guess lte will require lt + eq check)
fn check_transfer_lt(callData: [u8; 52], limit: [u8; 32]) -> bool {
    false
}

fn check_transfer_dest(callData: [u8; 52], dest: [u8; 20]) -> bool {
    false
}