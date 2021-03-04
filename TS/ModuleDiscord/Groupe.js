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
var Groupe = /** @class */ (function (_super) {
    __extends(Groupe, _super);
    function Groupe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Groupe.prototype.getRéponse = function () {
        return;
        throw new Error("Method not implemented.");
    };
    Groupe.prototype.groupeExiste = function (groupe) {
        throw ("pas implémenté");
    };
    Groupe.prototype.assignerGroupe = function (discordId, groupe) {
        if (!this.groupeExiste(groupe)) {
            throw ("Groupe inconnu");
        }
        throw ("pas implémenté");
        //Lecteur file = new Lecteur("")
    };
    return Groupe;
}(Module_1.ModuleDiscord));
exports.Groupe = Groupe;
