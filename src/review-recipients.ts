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

const poolManagerPrivateKey = "0x";
const account = privateKeyToAccount(poolManagerPrivateKey as Address);

/*
 * NOTE: recipientId should be the registry anchor address of
 * the recipient profile if useRegistryAnchor is true else the recipient address
 */
const recipientIds = ["0x"];

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

  const data = encodeFunctionData({
    abi: strategyAbi,
    functionName: "reviewRecipients",
    args: [recipientIds, recipientIds.map(() => Status.Accepted)],
  });
  const hash = await walletClient.sendTransaction({
    account,
    data,
    to: SQF_STRATEGY_ADDRESS,
  });

  console.log(hash);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
