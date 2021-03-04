import { EDT } from "./EDT";
import { Krunker } from "./Krunker";
import { Groupe } from "./Groupe";
import { Help } from "./Help";

export class ModuleFactory implements IModuleFactory {
    commades: Array<string>
    signeCommande: string

    constructor(commade: string, signeCommande: string = "!"){
        this.commades = commade.split(" ")
        this.signeCommande = signeCommande
    }
    getModule(): IModule {
        var commande = this.commades[0].toUpperCase()
        var paramètres = this.commades.slice(1)
        if ( commande == "EDT"){
            return new EDT(paramètres)
        }
        else if (commande == "KRUNKER" || commande == "KK"){
            return new Krunker(paramètres)
        }
        else if(commande == "GROUPE"){
            return new Groupe(paramètres)
        }
        else if (commande == "HELP"){
            return new Help(paramètres)
        }
        throw("Commande inconnue")
    }
    
}