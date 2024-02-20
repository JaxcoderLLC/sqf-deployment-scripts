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
import { strategyAbi } from "./lib/abi/strategy";
import {
  SQF_STRATEGY_ADDRESS,
  ALLO_CONTRACT_ADDRESS,
  ALLO_POOL_ID,
} from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const amount = parseEther("0.000000007610350076"); // per second flow rate

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimism.id,
    rpc: process.env.RPC_URL,
    address: SQF_STRATEGY_ADDRESS,
    poolId: ALLO_POOL_ID,
  });

  const distributeData = strategy.getDistributeData(amount);

  console.log("TO: ", ALLO_CONTRACT_ADDRESS);
  console.log(distributeData.data);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
