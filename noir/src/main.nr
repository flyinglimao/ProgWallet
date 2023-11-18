use dep::std;

/**
 * The following arguments are static, while codegen may add other arguments
 * @param callDataHash hash of callData
 * @param callDataLength length of callData, because we let user provide a large u8 array, we need to know the length of the actual data
 * @param validUntil the block height until which the transaction is valid
 * @param validAfter the block height after which the transaction is valid
 * @param callData: function execute(address dest, uint256 value, bytes calldata func)
 */

// u64 = 8 bytes, enough for 6 bytes in validationData
// use 256 bytes for callData, is it enough?
fn main(callDataHash: pub [u8; 32], callDataLength: pub u32, validUntil: pub u64, validAfter: pub u64, callData: [u8; 8192] /*CODEGEN_ARGS*/) {
    assert(std::hash::keccak256(callData, callDataLength) == callDataHash);
    /*COCDEGEN_LOGIC*/
}

#[test]
fn test_main() {
}
