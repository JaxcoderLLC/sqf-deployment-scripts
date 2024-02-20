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

const poolManagerAddress = "0x8FC4308da9310479dF48ef77142Eef05c363e099";
const profiles = [
  {
    name: "Geo Web",
    metadata: { protocol: BigInt(1), pointer: "ipfs://" },
    members: ["0xE9222B92790cB72ec31A96Df3eeDf3fE8Da5EB10"],
  },
  {
    name: "RadicalxChange",
    metadata: { protocol: BigInt(1), pointer: "ipfs://" },
    members: ["0x3945d766185e2264900c84fac10958b3619c2bd4"],
  },
  {
    name: "Public Goods Wave Pool",
    metadata: { protocol: BigInt(1), pointer: "ipfs://" },
    members: ["0xF04a7dF3CaaAdc7a38696aF934C3a8Ef2b71e207"],
  },
  {
    name: "AW House",
    metadata: { protocol: BigInt(1), pointer: "ipfs://" },
    members: ["0x1626Cc835842C480c1689A0A69AA419B9F761a4e"],
  },
  {
    name: "Coin Center",
    metadata: { protocol: BigInt(1), pointer: "ipfs://" },
    members: ["0x5bb38AE066987922b0C67aC8d2aF215EFEE8894f"],
  },
  {
    name: "web3.js",
    metadata: { protocol: BigInt(1), pointer: "ipfs://" },
    members: ["0x1C44478A9a1c60B4f555aaAbc9C510eAF3927071"],
  },
];

async function main() {
  const publicClient = createPublicClient({
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
