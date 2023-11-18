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

export type Never = {
  type: "never";
};

export type Always = {
  type: "always";
};

export type Guard =
  | Multisig
  | Sha256Preimage
  | IntersectionLogic
  | UnionLogic
  | Never
  | Always;

export type NamedAction = {
  type: string;
};

export type TokenTransfer = NamedAction & {
  type: "tokenTransfer";
  rules: {
    lt?: number; // lt and eq should not be set at the same time
    eq?: number;
    target?: string[];
    guard: Guard;
  }[];
  fallback: Guard;
};

export type SendValue = NamedAction & {
  type: "sendValue";
  rules: {
    lt?: number; // lt and eq should not be set at the same time
    eq?: number;
    target?: string[];
    guard: Guard;
  }[];
  fallback: Guard;
};

export type Action = TokenTransfer | SendValue;

export type Destination = {
  address: string;
  actions: Action[];
  default: Guard; // if no action matches, should we accept or reject?
};

export type Rule = {
  destincations: Destination[];
  metamorphoseGuard: Guard;
  default: Guard; // if no action matches, should we accept or reject?
};
