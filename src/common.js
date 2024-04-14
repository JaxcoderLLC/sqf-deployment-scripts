"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonConfig = exports.base64Image = void 0;
var dotenv = require("dotenv");
dotenv.config();
// NOTE: Update this with your own base64 image
exports.base64Image = "";
exports.commonConfig = {
    chainId: 8453,
    poolId: 0,
    nonce: Math.floor(Math.random() * 10000),
    rpc: process.env.NEXT_PUBLIC_RPC_URL, // arbitrum-sepolia
    ownerProfileId: "0x57132bcaad3cb1af283f89a53a438ded9329002893a3bb070b9908fb9ed4929d",
    ownerAddress: "0x3f15B8c6F9939879Cb030D6dd935348E57109637",
    anchorAddress: "0x3f15B8c6F9939879Cb030D6dd935348E57109637",
    profileName: "Allo Workshop",
    managers: [],
    application: {
        requestedAmount: BigInt(0),
        recipientAddress: "0x3f15B8c6F9939879Cb030D6dd935348E57109637",
        profileId: "0x57132bcaad3cb1af283f89a53a438ded9329002893a3bb070b9908fb9ed4929d",
        name: "Test Application",
        website: "https://docs.allo.gitcoin.co",
        profileName: "Jax Test",
        email: "test@gitcoin.co",
        description: "This is a test application",
        base64Image: exports.base64Image,
    },
    metadata: {
        protocol: BigInt(1), // NOTE: This is the pointer to the metadata on IPFS
        pointer: "bafybeia4khbew3r2mkflyn7nzlvfzcb3qpfeftz5ivpzfwn77ollj47gqi",
    },
    recipientId: "0x3f15B8c6F9939879Cb030D6dd935348E57109637",
    members: [],
    pool: {
        profileId: "0x",
        name: "Test Debate Pool",
        description: "A pool for debate demo",
        website: "https://allo.gitcoin.co",
        base64Image: exports.base64Image,
    },
};
