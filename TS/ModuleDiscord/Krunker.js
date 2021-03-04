"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Module_1 = require("./Module");
var _a = require("@fasetto/krunker.io"), Api = _a.Krunker, OrderBy = _a.OrderBy, UserNotFoundError = _a.UserNotFoundError;
var Krunker = /** @class */ (function (_super) {
    __extends(Krunker, _super);
    function Krunker(commandes) {
        var _this = _super.call(this, commandes) || this;
        _this.KrunkerAPI = new Api();
        return _this;
    }
    Krunker.prototype.getRéponse = function () {
        var me = this;
        return new Promise(function (resolveFin) {
            console.log("Call API getProfile de " + me.paramètres[0]);
            me.KrunkerAPI.GetProfile(me.paramètres[0]).then(function (user) {
                var réponse = "```INFO " + me.paramètres[0] + "\n";
                réponse += "Level: " + user.level + "\n";
                réponse += "Temps de jeu : " + user.playTime + "\n";
                réponse += "Nb de games: " + user.totalGamesPlayed + "\n";
                réponse += "Nb de wins: " + user.wins + "\n";
                réponse += "Nb de wins: " + user.wins + "\n";
                réponse += "KDR: " + user.kdr + "\n";
                réponse += "Kills : " + user.kills + "\n";
                réponse += "Morts : " + user.deaths + "\n";
                réponse += "Nukes : " + user.nukes + "\n";
                console.log(user);
                réponse += "```";
                resolveFin(réponse);
            })["catch"](function (err) {
                resolveFin(":x: Erreur : joueur inconnu");
                console.log("Erreur getProfile Krunker : " + err);
            });
        });
    };
    Krunker.prototype.formatter = function (user) {
        return user;
    };
    return Krunker;
}(Module_1.ModuleDiscord));
exports.Krunker = Krunker;
var User = /** @class */ (function () {
    function User(name, level, kdr, totalGamesPlayed, win, loses) {
        this.name = name;
        this.level = level;
        this.kdr = kdr;
        this.totalGamesPlayed = totalGamesPlayed;
        this.win = win;
        this.loses = loses;
    }
    return User;
}());
