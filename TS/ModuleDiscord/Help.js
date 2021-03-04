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
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help(paramètres) {
        return _super.call(this, paramètres) || this;
    }
    Help.prototype.getRéponse = function () {
        return new Promise(function (resolve) {
            var mess = "Liste des commandes : ```!krunker !kk [pseudo] \n!edt [groupe]```";
            resolve(mess);
            // if this.paramètres
        });
    };
    return Help;
}(Module_1.ModuleDiscord));
exports.Help = Help;
