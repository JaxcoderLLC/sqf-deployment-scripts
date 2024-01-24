import {
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk";
import { optimismSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import dotenv from "dotenv";
dotenv.config();

const poolManagerPrivateKey =
  "0x";

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimismSepolia.id,
    rpc: process.env.RPC_URL,
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

  const deployParams = strategy.getDeployParams();
  const hash = await walletClient.deployContract({
    account,
    abi: deployParams.abi,
    bytecode: deployParams.bytecode as `0x${string}`,
    args: [],
  });

  console.log(hash);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
