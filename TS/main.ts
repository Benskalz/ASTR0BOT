import { ModuleFactory } from "./ModuleDiscord/ModuleFactory";
import { cpus } from "os";


const Discord = require('discord.js')
const bot = new Discord.Client()

const signeCommande = "!"

var key = ""
var keyAstro = ""
bot.login(keyAstro)


bot.on('message', message => {
    if (message.content.charAt(0) == signeCommande){
        var commande = message.content.slice(1)
        try {
            var module: IModule = new ModuleFactory(commande).getModule()
            module.getRéponse().then(réponse => {
                message.channel.send(réponse);
            }).catch(err => {
                console.log("Erreur main() : " + err)
            })
        }
        catch(err){
            console.log(err)
        }
    }
})
