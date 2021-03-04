export abstract class ModuleDiscord implements IModule{

    paramètres: Array<string>
    nbParamètres: number

    constructor(commandes: Array<string>) {
        this.nbParamètres = commandes.length
        this.paramètres = commandes             
    }

    abstract getRéponse(): Promise<String>
    
    getRéponseFormatée(): Promise<String> {
    return new Promise(resolve => {
        this.getRéponse().then(réponse => {
            resolve(this.formatter(réponse))
        })

    })
    }

    formatter(data: String): String {
        return data;
    }

}