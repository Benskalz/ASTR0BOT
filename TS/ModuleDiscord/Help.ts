import { ModuleDiscord } from "./Module";

export class Help extends ModuleDiscord{
    constructor(paramètres){
        super(paramètres)
    }
    getRéponse(): Promise<String> {
        return new Promise(resolve =>{
            var mess = "Liste des commandes : ```!krunker !kk [pseudo] \n!edt [groupe]```"
            resolve(mess)
            // if this.paramètres
        })
    }



}