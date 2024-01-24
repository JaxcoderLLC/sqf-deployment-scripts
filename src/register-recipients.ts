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
import { registryAbi } from "./lib/abi/registry";
import {
  ZERO_ADDRESS,
  SQF_STRATEGY_ADDRESS,
  ALLO_POOL_ID,
} from "./lib/constants";
import { metadataPointers } from "./lib/metadataPointers";
import dotenv from "dotenv";
dotenv.config();

const signerPrivateKey = "0x";
/*
 * NOTE: registryAnchor should be the registry anchor address of
 * the recipient profile if useRegistryAnchor is true else the zero address
 */
const recipients = [
  {
    registryAnchor: ZERO_ADDRESS as Address,
    recipientAddress: "0x" as Address,
    metadata: { protocol: BigInt(1), pointer: metadataPointers[0] },
  },
];
const recipientPrivateKeys = ["0x"];

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
  const useRegistryAnchor = await strategy.useRegistryAnchor();

  for (let i in recipients) {
    const { registryAnchor, recipientAddress, metadata } = recipients[i];
    const registerRecipientData = strategy.getRegisterRecipientData({
      registryAnchor,
      recipientAddress,
      metadata,
    });
    const account = privateKeyToAccount(
      useRegistryAnchor
        ? (signerPrivateKey as Address)
        : (recipientPrivateKeys[i] as Address)
    );
    const hash = await walletClient.sendTransaction({
      account,
      data: registerRecipientData.data,
      to: registerRecipientData.to as Address,
      value: BigInt(registerRecipientData.value),
    });
    await publicClient.waitForTransactionReceipt({ hash });

    console.log(hash);
  }
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
