export type UnionLogic = {
  type: "union";
  rules: Guard[];
};

export type IntersectionLogic = {
  type: "intersection";
  rules: Guard[];
};

export type Multisig = {
  type: "multisig";
  group: string[];
  threshold: number;
};

export type Sha256Preimage = {
  type: "sha256Preimage";
  hash: string;
  length: number; // because noir doesn't support dynamic input, we need to use a static length (with padding)
};

export type Guard = Multisig | Sha256Preimage | IntersectionLogic | UnionLogic;

export type NamedAction = {
  type: string;
  guard: Guard;
};

export type TokenTransferEq = NamedAction & {
  type: "tokenTransferEq";
  limit: number;
};

export type TokenTransferLt = NamedAction & {
  type: "tokenTransferEq";
  limit: number;
};

export type TokenTransferTarget = NamedAction & {
  type: "tokenTransferEq";
  limit: number;
};

export type ValueLe = NamedAction & {
  type: "valueLe";
  limit: number;
};

export type Metamorphose = NamedAction & {
  type: "metamorphose";
};

export type Action =
  | TokenTransferEq
  | TokenTransferLt
  | TokenTransferTarget
  | ValueLe
  | Metamorphose;

export interface Destination {
  address: string;
  actions: Action[];
  default: "reject" | "accept"; // if no action matches, should we accept or reject?
}

export interface Rule {
  destincations: Destination[];
  default: "reject" | "accept"; // if no action matches, should we accept or reject?
}
