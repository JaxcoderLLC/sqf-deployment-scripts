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
exports.getEventValues = exports.extractLogByEventName = exports.getStrategyTypeFromStrategyName = exports.NATIVE = exports.formatDateDifference = exports.copy = exports.convertAddressToShortString = exports.convertBytesToShortString = exports.pollUntilMetadataIsAvailable = exports.ethereumHashRegExp = exports.ethereumAddressRegExp = exports.prettyTimestamp = exports.isPoolActive = exports.humanReadableAmount = exports.classNames = void 0;
var ipfs_1 = require("./ipfs");
var viem_1 = require("viem");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
exports.classNames = classNames;
function humanReadableAmount(amount, decimals) {
    var amountInUnits = Number((0, viem_1.formatUnits)(BigInt(amount), decimals || 18));
    for (var i = 5; i <= 15; i++) {
        var formattedValue = amountInUnits.toFixed(i);
        if (Number(formattedValue) !== 0) {
            return formattedValue.replace(/\.?0+$/, ""); // Remove trailing zeros
        }
    }
    return 0;
}
exports.humanReadableAmount = humanReadableAmount;
function isPoolActive(allocationStartTime, allocationEndTime) {
    var now = Date.now() / 1000;
    return now >= allocationStartTime && now <= allocationEndTime;
}
exports.isPoolActive = isPoolActive;
var prettyTimestamp = function (timestamp) {
    var date = new Date(timestamp * 1000);
    return "".concat(date.toLocaleDateString());
};
exports.prettyTimestamp = prettyTimestamp;
exports.ethereumAddressRegExp = /^(0x)?[0-9a-fA-F]{40}$/;
exports.ethereumHashRegExp = /^(0x)?[0-9a-fA-F]{64}$/;
var pollUntilMetadataIsAvailable = function (pointer) { return __awaiter(void 0, void 0, void 0, function () {
    var ipfsClient, counter, fetchMetadata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ipfsClient = (0, ipfs_1.getIPFSClient)();
                counter = 0;
                fetchMetadata = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var metadata;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ipfsClient.fetchJson(pointer)];
                            case 1:
                                metadata = _a.sent();
                                console.log("metadata", metadata);
                                console.log("counter", counter);
                                if (!metadata) return [3 /*break*/, 2];
                                console.log("metadata true");
                                return [2 /*return*/, true];
                            case 2:
                                console.log("metadata false");
                                counter++;
                                if (counter > 20)
                                    return [2 /*return*/, false];
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); }).then(fetchMetadata)];
                            case 3: 
                            // Corrected: Return the result of the recursive call
                            return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                return [4 /*yield*/, fetchMetadata()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.pollUntilMetadataIsAvailable = pollUntilMetadataIsAvailable;
var convertBytesToShortString = function (address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
};
exports.convertBytesToShortString = convertBytesToShortString;
var convertAddressToShortString = function (address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
};
exports.convertAddressToShortString = convertAddressToShortString;
var copy = function (data) {
    navigator.clipboard.writeText(data);
};
exports.copy = copy;
var formatDateDifference = function (dateString) {
    var currentDate = new Date();
    var inputDate = new Date(dateString);
    var timeDifference = currentDate.getTime() - inputDate.getTime();
    var secondsDifference = Math.floor(timeDifference / 1000);
    var minutesDifference = Math.floor(secondsDifference / 60);
    var hoursDifference = Math.floor(minutesDifference / 60);
    var daysDifference = Math.floor(hoursDifference / 24);
    if (secondsDifference < 60) {
        return "now";
    }
    else if (minutesDifference < 60) {
        return "".concat(minutesDifference, "m ago");
    }
    else if (hoursDifference < 24) {
        return "".concat(hoursDifference, "h ago");
    }
    else {
        return "".concat(daysDifference, "d ago");
    }
};
exports.formatDateDifference = formatDateDifference;
exports.NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();
var getStrategyTypeFromStrategyName = function (strategyName) {
    if (strategyName === "allov2.MicroGrantsStrategy")
        return "Manual";
    if (strategyName === "allov2.MicroGrantsGovStrategy")
        return "Governance";
    if (strategyName === "allov2.MicroGrantsHatsStrategy")
        return "Hats";
    return "N/A";
};
exports.getStrategyTypeFromStrategyName = getStrategyTypeFromStrategyName;
var extractLogByEventName = function (logs, eventName) {
    return logs.find(function (log) { return log.eventName === eventName; });
};
exports.extractLogByEventName = extractLogByEventName;
var getEventValues = function (receipt, abi, eventName) {
    var logs = receipt.logs;
    var event = abi.filter(function (item) { return item.type === "event" && item.name === eventName; })[0];
    console.log("event", event);
    var eventTopic = getEventTopic(event);
    var log = logs.find(function (log) { var _a; return ((_a = log.topics[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === eventTopic.toLowerCase(); });
    var _a = log, topics = _a.topics, data = _a.data;
    var d = (0, viem_1.decodeEventLog)({
        abi: [event],
        data: data,
        topics: topics,
    });
    return d;
};
exports.getEventValues = getEventValues;
function getEventTopic(event) {
    var inputTypesString = getInputTypeString(event);
    var eventString = "".concat(event.name, "(").concat(inputTypesString, ")");
    var eventTopic = (0, viem_1.keccak256)((0, viem_1.stringToBytes)(eventString));
    return eventTopic;
}
function getInputTypeString(event) {
    var inputTypes = event.inputs ? flattenInputTypes(event.inputs) : [];
    return inputTypes.join(",");
}
function flattenInputTypes(inputs) {
    var result = [];
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        if (input.components) {
            var componentsString = flattenInputTypes(input.components).join(",");
            result.push("(".concat(componentsString, ")"));
        }
        else {
            result.push(input.type);
        }
    }
    return result;
}
