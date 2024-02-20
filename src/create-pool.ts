import {
  parseEther,
  createWalletClient,
  createPublicClient,
  http,
  Address,
  parseAbiParameters,
  encodeAbiParameters
} from "viem";
import { SQFSuperFluidStrategy } from "@allo-team/allo-v2-sdk";
import { optimism } from "viem/chains";
import {
  PASSPORT_DECODER_ADDRESS,
  SUPERFLUID_HOST_ADDRESS,
  DAIX_ADDRESS,
  ETHX_ADDRESS,
  SQF_STRATEGY_ADDRESS,
  POOL_MANAGER_PROFILE_ID,
  RECIPIENT_SUPERAPP_FACTORY,
} from "./lib/constants";
import dotenv from "dotenv";
dotenv.config();

const poolManagerAddress = "0x8FC4308da9310479dF48ef77142Eef05c363e099"
const now = (Date.now() / 1000) | 0;
const params = {
  useRegistryAnchor: true,
  metadataRequired: true,
  passportDecoder: PASSPORT_DECODER_ADDRESS as Address,
  superfluidHost: SUPERFLUID_HOST_ADDRESS as Address,
  allocationSuperToken: DAIX_ADDRESS as Address,
  recipientSuperAppFactory: RECIPIENT_SUPERAPP_FACTORY as Address,
  registrationStartTime: BigInt(now + 600),
  registrationEndTime: BigInt(now + 1200),
  allocationStartTime: BigInt(1708448426),
  allocationEndTime: BigInt(1713743999),
  minPassportScore: BigInt(30000),
  initialSuperAppBalance: parseEther("0.00000001"),
};
const metadata = { protocol: BigInt(1), pointer: "ipfs://" };

async function main() {
  const strategy = new SQFSuperFluidStrategy({
    chain: optimism.id,
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
}

main()
  .then(() => process.exit())
  .catch((err) => console.error(err));
