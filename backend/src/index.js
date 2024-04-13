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
var express = require("express");
var app = express();
var cors = require("cors");
var client_1 = require("@prisma/client");
app.use(cors());
var prisma = new client_1.PrismaClient();
exports.handler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, frequency, startDate, endDate, queryResult, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, frequency = _a.frequency, startDate = _a.startDate, endDate = _a.endDate;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 12, , 13]);
                queryResult = void 0;
                _b = frequency;
                switch (_b) {
                    case "daily": return [3 /*break*/, 2];
                    case "weekly": return [3 /*break*/, 4];
                    case "monthly": return [3 /*break*/, 6];
                    case "yearly": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2: return [4 /*yield*/, dailyMiles(startDate, endDate)];
            case 3:
                queryResult = _c.sent();
                return [3 /*break*/, 11];
            case 4: return [4 /*yield*/, weeklyMiles(startDate, endDate)];
            case 5:
                queryResult = _c.sent();
                return [3 /*break*/, 11];
            case 6: return [4 /*yield*/, monthlyMiles(startDate, endDate)];
            case 7:
                queryResult = _c.sent();
                return [3 /*break*/, 11];
            case 8: return [4 /*yield*/, yearlyMiles(startDate, endDate)];
            case 9:
                queryResult = _c.sent();
                return [3 /*break*/, 11];
            case 10: return [2 /*return*/, res.status(400).json({ message: "Invalid frequency" })];
            case 11:
                res.status(200).json(queryResult);
                return [3 /*break*/, 13];
            case 12:
                error_1 = _c.sent();
                console.error(error_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
function dailyMiles(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.ev_data.groupBy({
                        by: ["Date"],
                        where: {
                            Date: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                        _sum: {
                            Miles_Driven: true,
                        },
                    })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.map(function (item) { return ({
                            date: item.Date.toISOString().slice(0, 10),
                            value: item._sum.Miles_Driven,
                        }); })];
            }
        });
    });
}
function weeklyMiles(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "\n    SELECT \n      date_trunc('week', \"Date\") AS week_start,\n      SUM(Miles_Driven) AS value\n    FROM ev_data\n    WHERE \"Date\" >= $1 AND \"Date\" < $2\n    GROUP BY week_start\n    ORDER BY week_start ASC;\n  ";
                    return [4 /*yield*/, prisma.$queryRawUnsafe(sql, [startDate, endDate])];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.map(function (item) { return ({
                            date: item.week_start.toISOString().slice(0, 10),
                            value: item.value,
                        }); })];
            }
        });
    });
}
function monthlyMiles(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "\n    SELECT \n      EXTRACT(YEAR FROM \"Date\") AS year,\n      EXTRACT(MONTH FROM \"Date\") AS month,\n      SUM(Miles_Driven) AS value\n    FROM ev_data\n    WHERE \"Date\" >= $1 AND \"Date\" < $2\n    GROUP BY year, month\n    ORDER BY year ASC, month ASC;\n  ";
                    return [4 /*yield*/, prisma.$queryRawUnsafe(sql, [startDate, endDate])];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.map(function (item) { return ({
                            date: item.month,
                            value: item.value,
                        }); })];
            }
        });
    });
}
function yearlyMiles(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "\n    SELECT \n      EXTRACT(YEAR FROM \"Date\") AS year,\n      SUM(Miles_Driven) AS value\n    FROM ev_data\n    WHERE \"Date\" >= $1 AND \"Date\" < $2\n    GROUP BY year\n    ORDER BY year ASC;\n  ";
                    return [4 /*yield*/, prisma.$queryRawUnsafe(sql, [startDate, endDate])];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.map(function (item) { return ({
                            date: item.year,
                            value: item.value,
                        }); })];
            }
        });
    });
}
app.listen(3000);
