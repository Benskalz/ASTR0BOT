"use strict";
exports.__esModule = true;
var EDT_1 = require("./EDT");
var Krunker_1 = require("./Krunker");
var Groupe_1 = require("./Groupe");
var Help_1 = require("./Help");
var ModuleFactory = /** @class */ (function () {
    function ModuleFactory(commade, signeCommande) {
        if (signeCommande === void 0) { signeCommande = "!"; }
        this.commades = commade.split(" ");
        this.signeCommande = signeCommande;
    }
    ModuleFactory.prototype.getModule = function () {
        var commande = this.commades[0].toUpperCase();
        var paramètres = this.commades.slice(1);
        if (commande == "EDT") {
            return new EDT_1.EDT(paramètres);
        }
        else if (commande == "KRUNKER" || commande == "KK") {
            return new Krunker_1.Krunker(paramètres);
        }
        else if (commande == "GROUPE") {
            return new Groupe_1.Groupe(paramètres);
        }
        else if (commande == "HELP") {
            return new Help_1.Help(paramètres);
        }
        throw ("Commande inconnue");
    };
    return ModuleFactory;
}());
exports.ModuleFactory = ModuleFactory;
