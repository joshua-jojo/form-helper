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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var reactivity_1 = require("@vue/reactivity");
function useForm(dataObject) {
    var dataDefault = dataObject;
    var mainObject = (0, reactivity_1.reactive)(setState(dataDefault));
    function setState(data) {
        return __assign(__assign({}, data), { errors: {}, message: null, processing: false, progress: {
                percentage: 0,
                size: 0,
            }, reset: reset, get: submitGet, post: submitPost, put: submitPut, delete: submitDelete });
    }
    function reset() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object.keys(dataDefault).forEach(function (key) {
                            mainObject[key] = null;
                        })];
                    case 1:
                        _a.sent();
                        mainObject["errors"] = {};
                        mainObject["message"] = null;
                        return [2 /*return*/];
                }
            });
        });
    }
    function getData() {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {};
                        return [4 /*yield*/, Object.keys(dataDefault).forEach(function (key) {
                                data[key] = mainObject[key];
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    }
    function optionRun(response, option) {
        var _a;
        if (response.data.status == "success") {
            option === null || option === void 0 ? void 0 : option.onSuccess(response.data);
        }
        else if (response.data.status == "error") {
            mainObject.errors = {};
            Object.keys((_a = response.data) === null || _a === void 0 ? void 0 : _a.errors).forEach(function (key) {
                mainObject.errors[key] = response.data.errors[key];
            });
            option.onError ? option.onError() : false;
        }
    }
    function submitGet(url, option) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainObject.processing = true;
                        return [4 /*yield*/, getData()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "get",
                                url: url,
                                params: data,
                            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            mainObject.processing = false;
                                            return [4 /*yield*/, optionRun(response, option)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        mainObject.processing = false;
                        return [2 /*return*/];
                }
            });
        });
    }
    function submitPost(url, option) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainObject.processing = true;
                        return [4 /*yield*/, getData()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, (0, axios_1.default)({
                                headers: {
                                    "Content-Type": 'multipart/form-data'
                                },
                                method: "post",
                                url: "".concat(url),
                                data: data,
                                onUploadProgress: function (detail) {
                                    mainObject.progress.percentage = Math.round(detail.progress * 100);
                                    var loaded = (detail.loaded / 1024 / 1000).toFixed(2);
                                    var totalUpload = (detail.total / 1024 / 1000).toFixed(2);
                                    mainObject.progress.size = "".concat(loaded, " MB / ").concat(totalUpload, " MB");
                                }
                            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            mainObject.processing = false;
                                            return [4 /*yield*/, optionRun(response, option)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        mainObject.progress.percentage = 0;
                        mainObject.progress.size = 0;
                        mainObject.processing = false;
                        return [2 /*return*/];
                }
            });
        });
    }
    function submitPut(url, option) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainObject.processing = true;
                        return [4 /*yield*/, getData()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "put",
                                url: url,
                                params: data,
                                onUploadProgress: function (detail) {
                                    mainObject.progress.percentage = Math.round(detail.progress * 100);
                                    var loaded = (detail.loaded / 1024 / 1000).toFixed(2);
                                    var totalUpload = (detail.total / 1024 / 1000).toFixed(2);
                                    mainObject.progress.size = "".concat(loaded, " MB / ").concat(totalUpload, " MB");
                                }
                            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            mainObject.processing = false;
                                            return [4 /*yield*/, optionRun(response, option)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        mainObject.progress.percentage = 0;
                        mainObject.progress.size = 0;
                        mainObject.processing = false;
                        return [2 /*return*/];
                }
            });
        });
    }
    function submitDelete(url, option) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainObject.processing = true;
                        return [4 /*yield*/, getData()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "delete",
                                url: url,
                                params: data,
                            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            mainObject.processing = false;
                                            return [4 /*yield*/, optionRun(response, option)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        mainObject.processing = false;
                        return [2 /*return*/];
                }
            });
        });
    }
    return (0, reactivity_1.reactive)(mainObject);
}
exports.default = useForm;
