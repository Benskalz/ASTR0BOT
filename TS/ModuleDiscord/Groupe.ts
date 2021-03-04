import { ModuleDiscord } from "./Module";
import { Lecteur } from "../Lecteur";

export class Groupe extends ModuleDiscord{



    getRéponse(): Promise<String> {
        return 
        throw new Error("Method not implemented.");
    }

    groupeExiste(groupe: string): Boolean{

        throw("pas implémenté")
    }

    assignerGroupe(discordId: string, groupe: string){
        if (!this.groupeExiste(groupe)){
            throw("Groupe inconnu")
        }

        throw("pas implémenté")
        //Lecteur file = new Lecteur("")
    }

}