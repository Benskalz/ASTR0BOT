const mysql = require('mysql');
const util = require('util');
export class DB {

    connection;
    constructor() {
        var connection = mysql.createConnection({
            host: '192.168.0.33',
            user: 'astro',
            password: 'TkuuXLF0KHidpaqY',
            database: 'astrobot'
        });
        connection.connect();
        this.connection = connection;
        this.connection.query = util.promisify(connection.query);
    }
    async getGroupe(pseudo: string): Promise<string> {
        var results = await this.connection.query('SELECT groupe from utilisateurs where pseudoDiscord = ?', pseudo);
        return results[0].groupe;
    }
    setGroupe(pseudo: string, groupe: string): void {
        var results = this.connection.query('SELECT * from utilisateurs');
        return results;
    }

    pseudoExiste(id: any): Boolean {
        throw new Error("Method not implemented.");
    }

}

var gr = new DB().getGroupe("jeandidier#5555")
console.log(gr)