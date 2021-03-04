const fs = require('fs')

export class Lecteur{
    path: String
    constructor(path: String){
        this.path = path
    }

    public getFichier(): Promise<String>{        
        return new Promise(resolve => {
            
            fs.readFile(this.path, 'UTF8', function (err, data){
                if (err){
                    console.log("Erreur lecture fichier")
                    throw err
                }        
                resolve(data)
            }) 
        });
    }
      
}