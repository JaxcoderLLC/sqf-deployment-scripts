"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var viem_1 = require("viem");
var dist_1 = require("@allo-team/allo-v2-sdk/dist");
var chains_1 = require("viem/chains");
var constants_1 = require("./lib/constants");
var dotenv = require("dotenv");
var accounts_1 = require("viem/accounts");
dotenv.config();
// pool admin profile id 0x5c98d8f8f09192c3b2f8ae590a9a1ff9d64dd21960f5eba6d26aca945cf9f906
var poolManagerAddress = "0x3f15B8c6F9939879Cb030D6dd935348E57109637";
var now = (Date.now() / 1000) | 0;
var params = {
    useRegistryAnchor: false,
    metadataRequired: true,
    passportDecoder: constants_1.PASSPORT_DECODER_ADDRESS,
    superfluidHost: constants_1.SUPERFLUID_HOST_ADDRESS,
    allocationSuperToken: constants_1.DAIX_ADDRESS,
    recipientSuperAppFactory: constants_1.RECIPIENT_SUPERAPP_FACTORY,
    registrationStartTime: BigInt(now + 600),
    registrationEndTime: BigInt(now + 1200),
    allocationStartTime: BigInt(1708448426),
    allocationEndTime: BigInt(1713743999),
    minPassportScore: BigInt(30000),
    initialSuperAppBalance: (0, viem_1.parseEther)("0.00000001"),
};
var metadata = { protocol: BigInt(1), pointer: "ipfs://" };
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var strategy, allo, initData, tx, walletClient, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    strategy = new dist_1.SQFSuperFluidStrategy({
                        chain: chains_1.optimismSepolia.id,
                        rpc: process.env.RPC_URL,
                    });
                    return [4 /*yield*/, strategy.getAllo()];
                case 1:
                    allo = _a.sent();
                    initData = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)("bool, bool, address, address, address, address, uint64, uint64, uint64, uint64, uint256, uint256"), [
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
                    ]);
                    tx = allo.createPoolWithCustomStrategy({
                        profileId: constants_1.POOL_MANAGER_PROFILE_ID,
                        strategy: constants_1.SQF_STRATEGY_ADDRESS,
                        initStrategyData: initData,
                        token: constants_1.ETHX_ADDRESS,
                        amount: (0, viem_1.parseEther)("0"),
                        metadata: metadata,
                        managers: [poolManagerAddress],
                    });
                    console.log(tx);
                    walletClient = (0, viem_1.createWalletClient)({
                        chain: chains_1.optimismSepolia,
                        transport: (0, viem_1.http)(process.env.RPC_URL),
                        account: (0, accounts_1.privateKeyToAccount)(process.env.DEPLOYER_PRIVATE_KEY),
                    });
                    return [4 /*yield*/, walletClient.sendTransaction({
                            to: tx.to,
                            data: tx.data,
                        })];
                case 2:
                    receipt = _a.sent();
                    console.log(receipt);
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return process.exit(); })
    .catch(function (err) { return console.error(err); });
