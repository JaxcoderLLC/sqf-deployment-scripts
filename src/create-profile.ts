import {
  encodeFunctionData,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk";
import { optimism } from "viem/chains";
import { registryAbi } from "./lib/abi/registry";
import { ALLO_REGISTRY_ADDRESS } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const poolManagerAddress = "0x3f15B8c6F9939879Cb030D6dd935348E57109637";
const profiles = [
  {
    name: "Geo Web",
    metadata: { protocol: BigInt(1), pointer: "ipfs://" },
    members: ["0xE9222B92790cB72ec31A96Df3eeDf3fE8Da5EB10"],
  },
];

async function main() {
  const walletClient = createWalletClient({
    chain: optimism,
    transport: http(process.env.RPC_URL),
  });

  console.log("TO: ", ALLO_REGISTRY_ADDRESS);

  let nonce = 2;

  for (const profile of profiles) {
    const { name, metadata, members } = profile;

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
    nonce++;

    console.log(name, data);
    console.log("------------------------------------------------------------");

    
  }
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
