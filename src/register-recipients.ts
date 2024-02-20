import {
  parseEther,
  encodeFunctionData,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk";
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
  {
    registryAnchor: "0x728CfC897BF7Ad35fc461f5E063e6285B8f40626" as Address,
    recipientAddress: "0x3945d766185e2264900c84fac10958b3619c2bd4" as Address,
    metadata: { protocol: BigInt(1), pointer: metadataPointers[1] },
  },
  {
    registryAnchor: "0x84c898b4ecfdE1E6914c04d0Af8a8bdA5C900F68" as Address,
    recipientAddress: "0x5bb38AE066987922b0C67aC8d2aF215EFEE8894f" as Address,
    metadata: { protocol: BigInt(1), pointer: metadataPointers[2] },
  },
  {
    registryAnchor: "0x16D1590f0cb87c37E752dDbcD8D71917d8A7eEFD" as Address,
    recipientAddress: "0x1626Cc835842C480c1689A0A69AA419B9F761a4e" as Address,
    metadata: { protocol: BigInt(1), pointer: metadataPointers[3] },
  },
  {
    registryAnchor: "0xf1701B621750bde3F586fE8fC8f985FadD0e4477" as Address,
    recipientAddress: "0xF04a7dF3CaaAdc7a38696aF934C3a8Ef2b71e207" as Address,
    metadata: { protocol: BigInt(1), pointer: metadataPointers[4] },
  },
  {
    registryAnchor: "0x362C639D7674FAF65901c5E9126772f965dcF38d" as Address,
    recipientAddress: "0x1C44478A9a1c60B4f555aaAbc9C510eAF3927071" as Address,
    metadata: { protocol: BigInt(1), pointer: metadataPointers[5] },
  },
];

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimism.id,
    rpc: process.env.RPC_URL,
    address: SQF_STRATEGY_ADDRESS,
    poolId: ALLO_POOL_ID,
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
