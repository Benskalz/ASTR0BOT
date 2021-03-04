import {ModuleDiscord} from './Module'

const { Krunker: Api, OrderBy, UserNotFoundError } = require("@fasetto/krunker.io")
 



import { resolve } from 'url';

export class Krunker extends ModuleDiscord{
    
    KrunkerAPI = new Api();
    constructor(commandes: Array<string>) {
        super(commandes)        
    }
 
    getRéponse(): Promise<String> {
        var me = this

        return new Promise((resolveFin) => {
          
        console.log("Call API getProfile de " + me.paramètres[0])

        me.KrunkerAPI.GetProfile(me.paramètres[0]).then(function(user){
            var réponse = "```INFO " + me.paramètres[0] + "\n" 
            réponse += "Level: " + user.level + "\n"
            réponse += "Temps de jeu : " + user.playTime + "\n"
            réponse += "Nb de games: " + user.totalGamesPlayed + "\n"
            réponse += "Nb de wins: " + user.wins +"\n"
            réponse += "Nb de wins: " + user.wins +"\n"
            
            réponse += "KDR: " + user.kdr + "\n"
            réponse += "Kills : " + user.kills + "\n"
            réponse += "Morts : " + user.deaths + "\n"           
            réponse += "Nukes : " + user.nukes + "\n"     
            console.log(user)
            
            réponse += "```"
            resolveFin(réponse);
            
        }).catch(function(err){
            resolveFin(":x: Erreur : joueur inconnu")
            console.log("Erreur getProfile Krunker : " + err)
        });



        })
    }

    formatter(user: String): String {
        return user
    }
}


class User {
    
    name: String
    level: number
    kdr: String
    totalGamesPlayed: number
    win: number
    loses: number

    constructor(name, level, kdr, totalGamesPlayed, win, loses){
        this.name = name;
        this.level = level;
        this.kdr = kdr;
        this.totalGamesPlayed = totalGamesPlayed;
        this.win = win;
        this.loses = loses;

    }



}