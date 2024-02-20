import {
  encodeFunctionData,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk";
import { optimism } from "viem/chains";
import { strategyAbi } from "./lib/abi/strategy";
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

enum Status {
  None,
  Pending,
  Accepted,
  Rejected,
  Appealed,
  InReview,
  Canceled,
}

const poolManagerAddress = "0x8FC4308da9310479dF48ef77142Eef05c363e099";
/*
 * NOTE: recipientId should be the registry anchor address of
 * the recipient profile if useRegistryAnchor is true else the recipient address
 */
const recipientIds = [
  "0xCD02e651ea605670CdDF166187D00376B55eEBDc" as Address,
  "0x728CfC897BF7Ad35fc461f5E063e6285B8f40626" as Address,
  "0x84c898b4ecfdE1E6914c04d0Af8a8bdA5C900F68" as Address,
  "0x16D1590f0cb87c37E752dDbcD8D71917d8A7eEFD" as Address,
  "0xf1701B621750bde3F586fE8fC8f985FadD0e4477" as Address,
  "0x362C639D7674FAF65901c5E9126772f965dcF38d" as Address,
];

async function main() {
  const data = encodeFunctionData({
    abi: strategyAbi,
    functionName: "reviewRecipients",
    args: [recipientIds, recipientIds.map(() => Status.Accepted)],
  });

  console.log("TO :", SQF_STRATEGY_ADDRESS);
  console.log(data);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
