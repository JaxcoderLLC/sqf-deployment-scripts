import {
  parseEther,
  encodeFunctionData,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { optimism } from "viem/chains";
import { erc20Abi } from "./lib/abi/erc20";
import { DAIX_ADDRESS, SQF_STRATEGY_ADDRESS } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const amount = parseEther("0.0000001");

async function main() {
  const data = encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [SQF_STRATEGY_ADDRESS, amount],
  });

  console.log("TO: ", DAIX_ADDRESS);
  console.log(data);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
