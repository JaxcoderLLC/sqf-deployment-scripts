import { ethers } from "ethers";
import { parseEther } from "viem";
import { optimismSepolia } from "viem/chains";
import { Framework } from "@superfluid-finance/sdk-core";
import { SUPERFLUID_RESOLVER_ADDRESS, DAIX_ADDRESS } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const amount = parseEther("0.1").toString();
const signerPrivateKey = "0x";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL,
    optimismSepolia.id
  );
  const wallet = new ethers.Wallet(signerPrivateKey, provider);
  const sfFramework = await Framework.create({
    chainId: optimismSepolia.id,
    resolverAddress: SUPERFLUID_RESOLVER_ADDRESS,
    provider,
  });

  const superToken = await sfFramework.loadWrapperSuperToken(DAIX_ADDRESS);
  const op = superToken.upgrade({ amount });
  const tx = await op.exec(wallet);

  console.log(tx.hash);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
