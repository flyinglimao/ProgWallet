use dep::std;
mod function_sig;
mod actions;
mod validates;

/**
 * The following arguments are static, while codegen may add other arguments
 * @param callDataHash hash of callData
 * @param callDataLength length of callData, because we let user provide a large u8 array, we need to know the length of the actual data
 * @param validUntil the block height until which the transaction is valid
 * @param validAfter the block height after which the transaction is valid
 * @param callData: function execute(address dest, uint256 value, bytes calldata func)
 */

// u64 = 8 bytes, enough for 6 bytes in validationData
// use 512 bytes for callData for demo, but it should be larger in the release
// 512 bytes: 20 bytes for dest addr, 32 bytes for value, 4 bytes for function selector, 456 bytes for function arguments
fn main(callDataHash: pub [u8; 32], callDataLength: pub u32, validUntil: pub u64, validAfter: pub u64, callData: [u8; 512] /*CODEGEN_ARGS*/) {
    assert(std::hash::keccak256(callData, callDataLength) == callDataHash);

    let mut dest: [u8; 20] = [0; 20];
    for i in 0..20 {
        dest[i] = callData[i];
    };
    let mut value: [u8; 32] = [0; 32];
    for i in 0..32 {
        value[i] = callData[i + 20];
    };
    let mut selector: [u8; 4] = [0; 4];
    for i in 0..4 {
        selector[i] = callData[i + 52];
    };
    let mut data: [u8; 456] = [0; 456];
    for i in 0..456 {
        data[i] = callData[i + 56];
    };

    /*CODEGEN_LOGIC*/

}

#[test]
fn test_main() {
}
