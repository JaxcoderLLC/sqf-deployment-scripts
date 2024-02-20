import {
  parseEther,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk";
import { optimism } from "viem/chains";
import { registryAbi } from "./lib/abi/registry";
import { ALLO_REGISTRY_ADDRESS, SQF_STRATEGY_ADDRESS } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const profileIds = [
  "0x10163dca94346e8f7a87d7c8cf3321190411bd158fcbead91167f7c4c69caed0",
  "0x53f63a3bd3228d5918563af22222b665a1052583b9d57b067a4c26e94799f825",
  "0x540df8582e3c0fd84b3a249972d5372332af40dd2f8b6e2a8538e42c31864667",
  "0x6e0f758120a7b503713abcee8bc76221b8659451a69b665f13ebc8ca99de06cd",
  "0x83e95f5fe7bbd4db447fc52ff2029328eaaa1a292dc0b7a99216b1a89859b15e",
  "0xe8a3c1c50c3e287d0e74861c0f99d9e612c2ffcb608e8a89953968b4f7687e73",
];
const recipientIds = [
  "0xCD02e651ea605670CdDF166187D00376B55eEBDc" as Address,
  "0x728CfC897BF7Ad35fc461f5E063e6285B8f40626" as Address,
  "0x84c898b4ecfdE1E6914c04d0Af8a8bdA5C900F68" as Address,
  "0x16D1590f0cb87c37E752dDbcD8D71917d8A7eEFD" as Address,
  "0xf1701B621750bde3F586fE8fC8f985FadD0e4477" as Address,
  "0x362C639D7674FAF65901c5E9126772f965dcF38d" as Address,
];

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimism.id,
    rpc: process.env.RPC_URL,
  });
  const publicClient = createPublicClient({
    chain: optimism,
    transport: http(process.env.RPC_URL),
  });

  for (const i in profileIds) {
    const profile = await publicClient.readContract({
      address: ALLO_REGISTRY_ADDRESS,
      abi: registryAbi,
      functionName: "getProfileByAnchor",
      args: [recipientIds[i] as `0x${string}`],
      //functionName: "getProfileById",
      //args: [profileId as `0x${string}`],
    });

    console.log(profile);
  }
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
