import {
  encodeFunctionData,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { CreateProfileArgs, Registry, SQFSuperFluidStrategy, TransactionData } from "@allo-team/allo-v2-sdk";
import { base, optimism } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { registryAbi } from "./lib/abi/registry";
import { ALLO_REGISTRY_ADDRESS } from "./lib/constants";
import * as dotenv from "dotenv";
import { sendTransaction } from "viem/_types/actions/wallet/sendTransaction";
import { commonConfig } from "./common";
import { publicClient } from "./wagmi";
// import { getEventValues } from "./lib/utils";

dotenv.config();

const registry = new Registry({
  chain: base.id,
  rpc: process.env.RPC_URL as string,
});

async function main() {
  const walletClient = createWalletClient({
    chain: base,
    transport: http(process.env.RPC_URL),
    account: privateKeyToAccount(
      process.env.DEPLOYER_PRIVATE_KEY as `0x${string}`,
    ),
  });

  const createProfileArgs: CreateProfileArgs = {
    nonce: BigInt(commonConfig.nonce),
    name: commonConfig.profileName,
    metadata: commonConfig.metadata,
    owner: commonConfig.ownerAddress,
    members: commonConfig.members,
  };

  console.log("Creating profile with args: ", createProfileArgs);

  // create the transaction with the arguments -> type comes from SDK
  // todo: snippet => createProfileTx
  const txData: TransactionData = await registry.createProfile(
    createProfileArgs
  );

  const txHash = await sendTransaction(walletClient, {
    account: walletClient.account,
    to: ALLO_REGISTRY_ADDRESS,
    data: txData.data,
  });

  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
    confirmations: 2,
  });

  console.log(receipt);

  // const profileId =
  //   getEventValues(receipt, registryAbi, "ProfileCreated").profileId || "0x";

  // if (profileId === "0x") {
  //   throw new Error("Profile creation failed");
  // }
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
