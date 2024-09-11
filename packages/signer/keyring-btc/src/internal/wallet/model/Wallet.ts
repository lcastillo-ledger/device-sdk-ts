import { MerkleTree } from "@internal/merkle-tree/model/MerkleTree";

export class Wallet {
  constructor(
    public name: string,
    public descriptorTemplate: string,
    public keys: string[],
    public hmac: Uint8Array,
    public keysTree: MerkleTree,
    public descriptorBuffer: Uint8Array,
  ) {}
}
