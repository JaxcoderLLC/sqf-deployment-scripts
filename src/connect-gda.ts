import { ethers } from "ethers";
import {
  Address,
  encodeFunctionData,
  encodeAbiParameters,
  decodeAbiParameters,
  parseAbiParameters,
} from "viem";
import { optimismSepolia } from "viem/chains";
import { Host } from "@superfluid-finance/sdk-core";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk";
import { gdaAbi } from "./lib/abi/gda";
import {
  SQF_STRATEGY_ADDRESS,
  ALLO_POOL_ID,
  SUPERFLUID_HOST_ADDRESS,
  GDA_CONTRACT_ADDRESS,
} from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const recipientsPrivateKeys = ["0x"];

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimismSepolia.id,
    rpc: process.env.RPC_URL,
    address: SQF_STRATEGY_ADDRESS,
    poolId: ALLO_POOL_ID,
  });
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL,
    optimismSepolia.id
  );
  const host = new Host(SUPERFLUID_HOST_ADDRESS);
  const gdaPoolAddress = await strategy.getGdaPool();

  for (const pk of recipientsPrivateKeys) {
    const wallet = new ethers.Wallet(pk, provider);
    const isConnectedData = encodeAbiParameters(
      parseAbiParameters("address pool, address member"),
      [gdaPoolAddress, wallet.address as Address]
    );
    const isConnectedRes = await provider.call({
      to: GDA_CONTRACT_ADDRESS,
      /* isMemberConnected(address pool, address member) */
      data: `0xc782eb9c${isConnectedData.slice(2)}`,
    });
    const isConnected = decodeAbiParameters(
      parseAbiParameters("bool isMemberConnected"),
      isConnectedRes as `0x${string}`
    )[0];

    if (isConnected) {
      continue;
    }

    const connectPoolData = encodeFunctionData({
      abi: gdaAbi,
      functionName: "connectPool",
      args: [gdaPoolAddress, "0x"],
    });
    const op = host.callAgreement(
      GDA_CONTRACT_ADDRESS,
      connectPoolData,
      "0x",
      {}
    );
    const tx = await op.exec(wallet);

    console.log(tx.hash);
  }
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
