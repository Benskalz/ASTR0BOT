import { Lecteur } from "../Lecteur";
import {ModuleDiscord} from './Module'

const ical = require('node-ical');

export class EDT extends ModuleDiscord {
    lienEDT: String
    groupe: String
    
    constructor(paramètres: Array<string>) {
        super(paramètres)
        this.groupe = paramètres[0]        
        this.lienEDT = "./liensEDT.txt"
        
    }

    //@override
    getRéponse(): Promise<any> {
        
        var me = this
        var réponse: String = "";
        return new Promise((resolveFin) => {

            new Lecteur(this.lienEDT).getFichier().then(fichier => {
                return this.parse(fichier) // url du fichier ics à dl
            })
            .then(urlEDT => {
                return new Promise(resolve => {
                    ical.fromURL(urlEDT, {}, function(err, data) {
                        if (err) throw(err);
                        var cours: Array<string> = me.getCours(me.getEvents(data), me.getDate())
                        
                        resolve(cours)
                    })
                })
            })
            .then(listeCours => {
                return new Promise((resolve) => {
                    resolveFin((me.formatter(listeCours)))
                })
            }).catch(err => {
                resolveFin(":x: " + err)
                console.log("Erreur : " + err)
            })
              
        })

    }

    getDate(){
        var motsDemain = ["dm", "demain"]
        var motsJours = ["lundi","mardi", "mercredi", "jeudi", "vendredi", "samedi", "diamnche"]

        if (motsDemain.includes(this.paramètres[1])){ // [dm | demain]
            return this.getDateDemain()
        }
        else if (motsJours.includes(this.paramètres[1])){ // [jour de la semaine]
            return this.getNextDate(this.paramètres[1])
        }
        else if (this.nbParamètres > 1 && this.paramètres[1].includes("/")){ // [01/01/2019]
            // si l'année n'est pas précisé, on prend l'année current par défaut sinon on prend l'année envoyé
            var année = new Date().getFullYear()
            var splited = this.paramètres[1].split("/")
            if(splited.length == 3) année = parseInt(splited[2])
            // ISO 8601
            var date = année.toString() + "-" + splited[1] + "-" + splited[0]
            return new Date(date)
        }
        else{ // par défaut
            return new Date()
        }
    }
    getNextDate(jour: string) {
        var date = new Date()
        var motsJours = ["diamnche", "lundi","mardi", "mercredi", "jeudi", "vendredi", "samedi"]

        if (!motsJours.includes(jour.toLowerCase())){
            throw("Erreur : jour invalide")
        }

        for (var i = 0; i < 7; i++){
            if(motsJours[date.getDay()] == jour.toLowerCase()){
                return date;
            }
            date.setDate(date.getDate() + 1)
        }
        console.log("Erreur getNextDate, jour : " + jour)
    }

    getDateDemain(){
        return new Date(new Date().setDate(new Date().getDate()+1))
    }
    getEDT(groupe: String){

    }

    /*
    * Retourne le lien de l'edt du groupe 
    */
    public parse(data): String{
        var lignes: String = data.split("\n")

        for (let i = 0; i < lignes.length; i++) {
            var ligne: Array<String> =  lignes[i].split(";")
            var lienEDT = ligne[1];
            var groupe = ligne[0];

            if (this.groupe == groupe) return lienEDT;
        }

        throw "Groupe inconnu";
        
    }


    formatter(cours){
        if(cours.length == 0) return "```Aucun cours de prévu ! ```"
        
        cours.sort(function(a,b){
            // tri par date croissante
          return new Date(a.debut) > new Date(b.debut);
        });

        var jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
          var message = "    ```"
          message += jours[cours[0].debut.getDay()] + " " + cours[0].debut.getDate() 
          message += " - " + this.groupe
          message += "\n"
          cours.forEach(cours => {
              message += cours
          });
    
          message += "```"
    
          return message
    }

    getCours(events, date: Date): Array<string>{
        var coursArr = []
        events.forEach(cours => {
            cours = new Cours(cours)
            if (cours.debut.getDate() == date.getDate() && 
                cours.debut.getMonth() == date.getMonth()){
                    coursArr.push(cours)
            }
        });
        return coursArr;
    }

    getEvents(ics){
        var events = []
        for (let k in ics) {
            if (ics.hasOwnProperty(k)) {
                var ev = ics[k];
                if (ics[k].type == 'VEVENT') {
                    events.push(ics[k])
                }
            }
        }
        return events;
    }
    
    
}


const Cours = function(vevent){
    this.salle = vevent.location
    this.matiere = vevent.summary
    this.description = vevent.description
    this.debut = vevent.start
    this.fin = vevent.end
    this.toString = function(){
        var str = ""
        str += toHHMM(this.debut) + " -> " + toHHMM(this.fin) + "   "
        str += this.matiere + "  "
        str += this.salle + "   "
        str += "\n"
        return str;
    }

}

function toHHMM(date){
    date = date.toTimeString().split(' ')[0].split(":")
    date = date[0] + ":" + date[1]
    return date;
} 