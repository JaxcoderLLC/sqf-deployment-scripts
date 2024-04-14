import {
  parseEther,
  createWalletClient,
  createPublicClient,
  http,
  Address,
  parseAbiParameters,
  encodeAbiParameters,
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk/dist";
import { optimismSepolia } from "viem/chains";
import {
  PASSPORT_DECODER_ADDRESS,
  SUPERFLUID_HOST_ADDRESS,
  DAIX_ADDRESS,
  ETHX_ADDRESS,
  SQF_STRATEGY_ADDRESS,
  POOL_MANAGER_PROFILE_ID,
  RECIPIENT_SUPERAPP_FACTORY,
} from "./lib/constants";
import * as dotenv from "dotenv";
import { privateKeyToAccount } from "viem/accounts";
dotenv.config();

// pool admin profile id 0x5c98d8f8f09192c3b2f8ae590a9a1ff9d64dd21960f5eba6d26aca945cf9f906
const poolManagerAddress = "0x3f15B8c6F9939879Cb030D6dd935348E57109637";
const now = (Date.now() / 1000) | 0;
const params = {
  useRegistryAnchor: false,
  metadataRequired: true,
  passportDecoder: PASSPORT_DECODER_ADDRESS as Address,
  superfluidHost: SUPERFLUID_HOST_ADDRESS as Address,
  allocationSuperToken: DAIX_ADDRESS as Address,
  recipientSuperAppFactory: RECIPIENT_SUPERAPP_FACTORY as Address,
  registrationStartTime: BigInt(now + 600),
  registrationEndTime: BigInt(now + 1200),
  allocationStartTime: BigInt(new Date().getTime() / 1000 + 1200),
  allocationEndTime: BigInt(new Date().getTime() / 1000 + 18000),
  minPassportScore: BigInt(0),
  initialSuperAppBalance: parseEther("0.00000001"),
};
const metadata = { protocol: BigInt(1), pointer: "ipfs://" };

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimismSepolia.id,
    rpc: process.env.RPC_URL,
  });
  const allo = await strategy.getAllo();
  const initData: `0x${string}` = encodeAbiParameters(
    parseAbiParameters(
      "bool, bool, address, address, address, address, uint64, uint64, uint64, uint64, uint256, uint256",
    ),
    [
      params.useRegistryAnchor,
      params.metadataRequired,
      params.passportDecoder,
      params.superfluidHost,
      params.allocationSuperToken,
      params.recipientSuperAppFactory,
      params.registrationStartTime,
      params.registrationEndTime,
      params.allocationStartTime,
      params.allocationEndTime,
      params.minPassportScore,
      params.initialSuperAppBalance,
    ],
  );
  const tx = allo.createPoolWithCustomStrategy({
    profileId: POOL_MANAGER_PROFILE_ID,
    strategy: SQF_STRATEGY_ADDRESS,
    initStrategyData: initData,
    token: ETHX_ADDRESS,
    amount: parseEther("0"),
    metadata,
    managers: [poolManagerAddress],
  });

  console.log(tx);

  const walletClient = createWalletClient({
    chain: optimismSepolia,
    transport: http(process.env.RPC_URL),
    account: privateKeyToAccount(
      process.env.DEPLOYER_PRIVATE_KEY as `0x${string}`,
    ),
  });

  const receipt = await walletClient.sendTransaction({
    to: tx.to,
    data: tx.data,
    value: BigInt(tx.value),
  });

  console.log(receipt);
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
