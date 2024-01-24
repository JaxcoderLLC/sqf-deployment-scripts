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
import { registryAbi } from "./lib/abi/registry";
import { ALLO_REGISTRY_ADDRESS } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const signerPrivateKey = "0x";
const profile = {
  name: "Pool Manager",
  metadata: { protocol: BigInt(1), pointer: "ipfs://" },
  members: ["0x"],
};

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
  const account = privateKeyToAccount(signerPrivateKey as Address);

  const { name, metadata, members } = profile;

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
  });
  const data = encodeFunctionData({
    abi: registryAbi,
    functionName: "createProfile",
    args: [
      BigInt(nonce),
      name,
      metadata,
      account.address,
      members as Address[],
    ],
  });
  const hash = await walletClient.sendTransaction({
    account,
    data,
    to: ALLO_REGISTRY_ADDRESS,
  });

  console.log(hash);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
