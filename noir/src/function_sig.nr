pub fn is_transfer(callData: [u8; 4]) -> bool {
    callData == [169, 5, 156, 187]
}

pub fn is_metamorphose(callData: [u8; 4]) -> bool {
    callData == [79, 213, 57, 33]
}
