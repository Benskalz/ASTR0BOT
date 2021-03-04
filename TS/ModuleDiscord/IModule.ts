interface IModule{
    //constructor(commandes: Array<String>)
    getRéponseFormatée(): Promise<String>
    getRéponse(): Promise<String>
    formatter(data: String): String //'vue' des message
}