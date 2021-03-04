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
var Lecteur_1 = require("../Lecteur");
var Module_1 = require("./Module");
var ical = require('node-ical');
var EDT = /** @class */ (function (_super) {
    __extends(EDT, _super);
    function EDT(paramètres) {
        var _this = _super.call(this, paramètres) || this;
        _this.groupe = paramètres[0];
        _this.lienEDT = "./liensEDT.txt";
        return _this;
    }
    //@override
    EDT.prototype.getRéponse = function () {
        var _this = this;
        var me = this;
        var réponse = "";
        return new Promise(function (resolveFin) {
            new Lecteur_1.Lecteur(_this.lienEDT).getFichier().then(function (fichier) {
                return _this.parse(fichier); // url du fichier ics à dl
            })
                .then(function (urlEDT) {
                return new Promise(function (resolve) {
                    ical.fromURL(urlEDT, {}, function (err, data) {
                        if (err)
                            throw (err);
                        var cours = me.getCours(me.getEvents(data), me.getDate());
                        resolve(cours);
                    });
                });
            })
                .then(function (listeCours) {
                return new Promise(function (resolve) {
                    resolveFin((me.formatter(listeCours)));
                });
            })["catch"](function (err) {
                resolveFin(":x: " + err);
                console.log("Erreur : " + err);
            });
        });
    };
    EDT.prototype.getDate = function () {
        var motsDemain = ["dm", "demain"];
        var motsJours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "diamnche"];
        if (motsDemain.includes(this.paramètres[1])) { // [dm | demain]
            return this.getDateDemain();
        }
        else if (motsJours.includes(this.paramètres[1])) { // [jour de la semaine]
            return this.getNextDate(this.paramètres[1]);
        }
        else if (this.nbParamètres > 1 && this.paramètres[1].includes("/")) { // [01/01/2019]
            // si l'année n'est pas précisé, on prend l'année current par défaut sinon on prend l'année envoyé
            var année = new Date().getFullYear();
            var splited = this.paramètres[1].split("/");
            if (splited.length == 3)
                année = parseInt(splited[2]);
            // ISO 8601
            var date = année.toString() + "-" + splited[1] + "-" + splited[0];
            return new Date(date);
        }
        else { // par défaut
            return new Date();
        }
    };
    EDT.prototype.getNextDate = function (jour) {
        var date = new Date();
        var motsJours = ["diamnche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        if (!motsJours.includes(jour.toLowerCase())) {
            throw ("Erreur : jour invalide");
        }
        for (var i = 0; i < 7; i++) {
            if (motsJours[date.getDay()] == jour.toLowerCase()) {
                return date;
            }
            date.setDate(date.getDate() + 1);
        }
        console.log("Erreur getNextDate, jour : " + jour);
    };
    EDT.prototype.getDateDemain = function () {
        return new Date(new Date().setDate(new Date().getDate() + 1));
    };
    EDT.prototype.getEDT = function (groupe) {
    };
    /*
    * Retourne le lien de l'edt du groupe
    */
    EDT.prototype.parse = function (data) {
        var lignes = data.split("\n");
        for (var i = 0; i < lignes.length; i++) {
            var ligne = lignes[i].split(";");
            var lienEDT = ligne[1];
            var groupe = ligne[0];
            if (this.groupe == groupe)
                return lienEDT;
        }
        throw "Groupe inconnu";
    };
    EDT.prototype.formatter = function (cours) {
        if (cours.length == 0)
            return "```Aucun cours de prévu ! ```";
        cours.sort(function (a, b) {
            // tri par date croissante
            return new Date(a.debut) > new Date(b.debut);
        });
        var jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        var message = "    ```";
        message += jours[cours[0].debut.getDay()] + " " + cours[0].debut.getDate();
        message += " - " + this.groupe;
        message += "\n";
        cours.forEach(function (cours) {
            message += cours;
        });
        message += "```";
        return message;
    };
    EDT.prototype.getCours = function (events, date) {
        var coursArr = [];
        events.forEach(function (cours) {
            cours = new Cours(cours);
            if (cours.debut.getDate() == date.getDate() &&
                cours.debut.getMonth() == date.getMonth()) {
                coursArr.push(cours);
            }
        });
        return coursArr;
    };
    EDT.prototype.getEvents = function (ics) {
        var events = [];
        for (var k in ics) {
            if (ics.hasOwnProperty(k)) {
                var ev = ics[k];
                if (ics[k].type == 'VEVENT') {
                    events.push(ics[k]);
                }
            }
        }
        return events;
    };
    return EDT;
}(Module_1.ModuleDiscord));
exports.EDT = EDT;
var Cours = function (vevent) {
    this.salle = vevent.location;
    this.matiere = vevent.summary;
    this.description = vevent.description;
    this.debut = vevent.start;
    this.fin = vevent.end;
    this.toString = function () {
        var str = "";
        str += toHHMM(this.debut) + " -> " + toHHMM(this.fin) + "   ";
        str += this.matiere + "  ";
        str += this.salle + "   ";
        str += "\n";
        return str;
    };
};
function toHHMM(date) {
    date = date.toTimeString().split(' ')[0].split(":");
    date = date[0] + ":" + date[1];
    return date;
}
