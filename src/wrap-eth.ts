import { ethers } from "ethers";
import { parseEther } from "viem";
import { optimism} from "viem/chains";
import { Framework } from "@superfluid-finance/sdk-core";
import { SUPERFLUID_RESOLVER_ADDRESS } from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const amount = parseEther("0.02").toString();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL,
    optimism.id
  );
  const sfFramework = await Framework.create({
    chainId: optimism.id,
    resolverAddress: SUPERFLUID_RESOLVER_ADDRESS,
    provider,
  });

  const superToken = await sfFramework.loadNativeAssetSuperToken("ETHx");
  const op = superToken.upgrade({ amount });

  console.log(await op.populateTransactionPromise);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
