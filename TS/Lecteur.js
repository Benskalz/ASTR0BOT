"use strict";
exports.__esModule = true;
var fs = require('fs');
var Lecteur = /** @class */ (function () {
    function Lecteur(path) {
        this.path = path;
    }
    Lecteur.prototype.getFichier = function () {
        var _this = this;
        return new Promise(function (resolve) {
            fs.readFile(_this.path, 'UTF8', function (err, data) {
                if (err) {
                    console.log("Erreur lecture fichier");
                    throw err;
                }
                resolve(data);
            });
        });
    };
    return Lecteur;
}());
exports.Lecteur = Lecteur;
