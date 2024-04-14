"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getIPFSClient = void 0;
var getIPFSClient = function () {
    var jwt = process.env.NEXT_PUBLIC_PINATA_JWT;
    var readGateway = process.env.NEXT_PUBLIC_IPFS_READ_GATEWAY;
    var writeGateway = process.env.NEXT_PUBLIC_IPFS_WRITE_GATEWAY;
    if (!jwt || !readGateway || !writeGateway) {
        throw new Error("Missing IPFS configuration");
    }
    return new IPFSClient({
        jwt: jwt,
        readGateway: readGateway,
        writeGateway: writeGateway,
    });
};
exports.getIPFSClient = getIPFSClient;
var IPFSClient = /** @class */ (function () {
    function IPFSClient(config) {
        this.jwt = config.jwt;
        this.readGateway = config.readGateway;
        this.writeGateway = config.writeGateway;
        this.pinJSONToIPFSUrl = "".concat(this.writeGateway, "pinning/pinJSONToIPFS");
        this.pinFileToIPFSUrl = "".concat(this.writeGateway, "pinning/pinFileToIPFS");
    }
    IPFSClient.prototype.fileUrl = function (cid) {
        return "".concat(this.readGateway, "ipfs/").concat(cid);
    };
    IPFSClient.prototype.fetchText = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            var url, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.fileUrl(cid);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.text()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IPFSClient.prototype.fetchJson = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            var url, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.fileUrl(cid);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IPFSClient.prototype.baseRequestData = function (name) {
        return {
            pinataOptions: {
                cidVersion: 1,
            },
            pinataMetadata: {
                name: name,
                keyvalues: {
                    app: "debate-demo",
                },
            },
        };
    };
    IPFSClient.prototype.pinJSON = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            var data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = __assign(__assign({}, this.baseRequestData("debate-demo")), { pinataContent: object });
                        return [4 /*yield*/, fetch(this.pinJSONToIPFSUrl, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(this.jwt),
                                },
                                body: JSON.stringify(data),
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.ok) {
                            return [2 /*return*/, resp.json()];
                        }
                        return [4 /*yield*/, Promise.reject(resp)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IPFSClient.prototype.pinFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var fd, requestData, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fd = new FormData();
                        requestData = this.baseRequestData("project-image");
                        fd.append("file", file);
                        fd.append("pinataOptions", JSON.stringify(requestData.pinataOptions));
                        fd.append("pinataMetadata", JSON.stringify(requestData.pinataMetadata));
                        return [4 /*yield*/, fetch(this.pinFileToIPFSUrl, {
                                method: "POST",
                                headers: {
                                    Authorization: "Bearer ".concat(this.jwt),
                                },
                                body: fd,
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.ok) {
                            return [2 /*return*/, resp.json()];
                        }
                        return [4 /*yield*/, Promise.reject(resp)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return IPFSClient;
}());
exports.default = IPFSClient;
