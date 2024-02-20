import {
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
import { ALLO_REGISTRY_ADDRESS } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const poolManagerAddress = "0x8FC4308da9310479dF48ef77142Eef05c363e099"
const profile = {
  name: "Pool Manager",
  metadata: { protocol: BigInt(1), pointer: "ipfs://" },
  members: [poolManagerAddress],
};

async function main() {
  const publicClient = createPublicClient({
    chain: optimism,
    transport: http(process.env.RPC_URL),
  });

  const { name, metadata, members } = profile;

  const nonce = await publicClient.getTransactionCount({
    address: poolManagerAddress,
  });
  const data = encodeFunctionData({
    abi: registryAbi,
    functionName: "createProfile",
    args: [
      BigInt(nonce),
      name,
      metadata,
      poolManagerAddress,
      members as Address[],
    ],
  });

  console.log("TO: ", ALLO_REGISTRY_ADDRESS);
  console.log(data);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
