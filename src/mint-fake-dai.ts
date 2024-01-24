import {
  parseEther,
  encodeFunctionData,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { optimismSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { erc20Abi } from "./lib/abi/erc20";
import { DAI_ADDRESS, SQF_STRATEGY_ADDRESS } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const signerPrivateKey =
  "0x";
const amount = parseEther("10");

async function main() {
  const walletClient = createWalletClient({
    chain: optimismSepolia,
    transport: http(process.env.RPC_URL),
  });
  const publicClient = createPublicClient({
    chain: optimismSepolia,
    transport: http(process.env.RPC_URL),
  });
  const account = privateKeyToAccount(signerPrivateKey as Address);

  const data = encodeFunctionData({
    abi: erc20Abi,
    functionName: "mint",
    args: [account.address, amount],
  });
  const hash = await walletClient.sendTransaction({
    account,
    data,
    to: DAI_ADDRESS as Address,
  });

  console.log(hash);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
