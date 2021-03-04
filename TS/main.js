"use strict";
exports.__esModule = true;
var ModuleFactory_1 = require("./ModuleDiscord/ModuleFactory");
var Discord = require('discord.js');
var bot = new Discord.Client();
var signeCommande = "!";
var key = "";
var keyAstro = "";
bot.login(keyAstro);
bot.on('message', function (message) {
    if (message.content.charAt(0) == signeCommande) {
        var commande = message.content.slice(1);
        try {
            var module = new ModuleFactory_1.ModuleFactory(commande).getModule();
            module.getRéponse().then(function (réponse) {
                message.channel.send(réponse);
            })["catch"](function (err) {
                console.log("Erreur main() : " + err);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
});
