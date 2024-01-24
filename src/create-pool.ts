import {
  parseEther,
  createWalletClient,
  createPublicClient,
  http,
  Address,
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk";
import { optimismSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import {
  PASSPORT_DECODER_ADDRESS,
  SUPERFLUID_HOST_ADDRESS,
  DAIX_ADDRESS,
  ETHX_ADDRESS,
  SQF_STRATEGY_ADDRESS,
  POOL_MANAGER_PROFILE_ID,
} from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const poolManagerPrivateKey =
  "0x";
const now = (Date.now() / 1000) | 0;
const params = {
  useRegistryAnchor: false,
  metadataRequired: true,
  passportDecoder: PASSPORT_DECODER_ADDRESS as Address,
  superfluidHost: SUPERFLUID_HOST_ADDRESS as Address,
  allocationSuperToken: DAIX_ADDRESS as Address,
  registrationStartTime: BigInt(now + 60),
  registrationEndTime: BigInt(now + 1200),
  allocationStartTime: BigInt(now + 1200),
  allocationEndTime: BigInt(now + 31536000),
  minPassportScore: BigInt(5000),
  initialSuperAppBalance: parseEther("0.00000001"),
};
const metadata = { protocol: BigInt(1), pointer: "test" };

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimismSepolia.id,
    rpc: process.env.RPC_URL,
  });
  const walletClient = createWalletClient({
    chain: optimismSepolia,
    transport: http(process.env.RPC_URL),
  });
  const publicClient = createPublicClient({
    chain: optimismSepolia,
    transport: http(process.env.RPC_URL),
  });
  const account = privateKeyToAccount(poolManagerPrivateKey as Address);

  const allo = await strategy.getAllo();
  const initData = await strategy.getInitializeData(params);
  const tx = allo.createPoolWithCustomStrategy({
    profileId: POOL_MANAGER_PROFILE_ID,
    strategy: SQF_STRATEGY_ADDRESS,
    initStrategyData: initData,
    token: ETHX_ADDRESS,
    amount: parseEther("0"),
    metadata,
    managers: [account.address],
  });
  const hash = await walletClient.sendTransaction({
    account,
    data: tx.data,
    to: tx.to as Address,
    value: BigInt(tx.value),
  });

  console.log(hash);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
