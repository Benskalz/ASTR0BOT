"use strict";
exports.__esModule = true;
var ModuleDiscord = /** @class */ (function () {
    function ModuleDiscord(commandes) {
        this.nbParamètres = commandes.length;
        this.paramètres = commandes;
    }
    ModuleDiscord.prototype.getRéponseFormatée = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getRéponse().then(function (réponse) {
                resolve(_this.formatter(réponse));
            });
        });
    };
    ModuleDiscord.prototype.formatter = function (data) {
        return data;
    };
    return ModuleDiscord;
}());
exports.ModuleDiscord = ModuleDiscord;
