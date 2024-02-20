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
import { SQF_STRATEGY_ADDRESS, ALLO_POOL_ID } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const now = (Date.now() / 1000) | 0;
const timestamps = {
  registrationStartTime: BigInt(now + 300),
  registrationEndTime: BigInt(now + 600),
  allocationStartTime: BigInt(1708375444),
  allocationEndTime: BigInt(1713657599),
};

async function main() {
  const {
    registrationStartTime,
    registrationEndTime,
    allocationStartTime,
    allocationEndTime,
  } = timestamps;

  const data = encodeFunctionData({
    abi: strategyAbi,
    functionName: "updatePoolTimestamps",
    args: [
      registrationStartTime,
      registrationEndTime,
      allocationStartTime,
      allocationEndTime,
    ],
  });

  console.log("TO: ", SQF_STRATEGY_ADDRESS);
  console.log(data);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
