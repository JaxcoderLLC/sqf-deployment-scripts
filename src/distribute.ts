import {
  parseEther,
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
import {
  SQF_STRATEGY_ADDRESS,
  ALLO_CONTRACT_ADDRESS,
  ALLO_POOL_ID,
} from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const amount = parseEther("0.000000027123287671"); // per second flow rate
const poolManagerPrivateKey =
  "0x";

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

  const distributeData = strategy.getDistributeData(amount);
  const hash = await walletClient.sendTransaction({
    account,
    to: ALLO_CONTRACT_ADDRESS,
    data: distributeData.data,
  });

  console.log(hash);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
