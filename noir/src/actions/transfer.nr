// 20 bytes for address and 32 bytes for uint256
// work for both erc20 and erc721
// I guess it's mainly for erc721
pub fn check_transfer_eq(callData: [u8; 456], limit: [u8; 32]) -> bool {
    false
}

pub fn check_transfer_ne(callData: [u8; 456], limit: [u8; 32]) -> bool {
    false
}

// we don't need to gt because it doesn't make sense (no reason to check it doesn't spend too less)
// we use lt because it's more efficient? maybe (I guess lte will require lt + eq check)
pub fn check_transfer_lt(callData: [u8; 456], limit: [u8; 32]) -> bool {
    false
}

pub fn check_transfer_gt(callData: [u8; 456], limit: [u8; 32]) -> bool {
    false
}

pub fn check_transfer_dest(callData: [u8; 456], dest: [[u8; 20]]) -> bool {
    false
}