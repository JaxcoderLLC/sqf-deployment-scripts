import {
  encodeFunctionData,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk";
import { optimismSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { strategyAbi } from "./lib/abi/strategy";
import { SQF_STRATEGY_ADDRESS, ALLO_POOL_ID } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const poolManagerPrivateKey =
  "0x";
const now = (Date.now() / 1000) | 0;
const timestamps = {
  registrationStartTime: BigInt(now + 60),
  registrationEndTime: BigInt(now + 120),
  allocationStartTime: BigInt(now + 120),
  allocationEndTime: BigInt(now + 2592000),
};

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimismSepolia.id,
    rpc: process.env.RPC_URL,
    address: SQF_STRATEGY_ADDRESS,
    poolId: ALLO_POOL_ID,
  });
  const walletClient = createWalletClient({
    chain: optimismSepolia,
    transport: http(process.env.RPC_URL),
  });
  const publicClient = createPublicClient({
    chain: optimismSepolia,
    transport: http(process.env.RPC_URL),
  });
  const account = privateKeyToAccount(poolManagerPrivateKey as Address);
  const {
    registrationStartTime,
    registrationEndTime,
    allocationStartTime,
    allocationEndTime,
  } = timestamps;

  const updatePoolTimestamp = encodeFunctionData({
    abi: strategyAbi,
    functionName: "updatePoolTimestamps",
    args: [
      registrationStartTime,
      registrationEndTime,
      allocationStartTime,
      allocationEndTime,
    ],
  });
  const hash = await walletClient.sendTransaction({
    account,
    data: updatePoolTimestamp,
    to: SQF_STRATEGY_ADDRESS,
    value: BigInt(0),
  });

  console.log(hash);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
