import {
  parseEther,
  encodeFunctionData,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk/dist";
import { optimism } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { registryAbi } from "./lib/abi/registry";
import {
  PASSPORT_DECODER_ADDRESS,
  SUPERFLUID_HOST_ADDRESS,
  DAIX_ADDRESS,
  ETHX_ADDRESS,
  ZERO_ADDRESS,
  SQF_STRATEGY_ADDRESS,
  ALLO_POOL_ID,
  POOL_MANAGER_PROFILE_ID,
} from "./lib/constants";
import { metadataPointers } from "./lib/metadataPointers";
import dotenv from "dotenv";
dotenv.config();

/*
 * NOTE: registryAnchor should be the registry anchor address of
 * the recipient profile if useRegistryAnchor is true else the zero address
 */
const recipients = [
  {
    registryAnchor: "0xCD02e651ea605670CdDF166187D00376B55eEBDc" as Address,
    recipientAddress: "0xE9222B92790cB72ec31A96Df3eeDf3fE8Da5EB10" as Address,
    metadata: { protocol: BigInt(1), pointer: metadataPointers[0] },
  },
];

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimism.id,
    rpc: process.env.RPC_URL,
    address: SQF_STRATEGY_ADDRESS,
    poolId: BigInt(ALLO_POOL_ID),
  });

  for (let i in recipients) {
    const { registryAnchor, recipientAddress, metadata } = recipients[i];
    const registerRecipientData = strategy.getRegisterRecipientData({
      registryAnchor,
      recipientAddress,
      metadata,
    });

    console.log(registerRecipientData);
  }
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
