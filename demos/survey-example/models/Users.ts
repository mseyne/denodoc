export class User {
    public id:string
    public name:string
    public email:string
    public password:string

    constructor ({id='',name='',email='',password=''}) {
        this.id = id
        this.name = name
        this.email = email 
        this.password = password
    }

    async find_from_mail (db:any) {
        const result = await db.queryObject("SELECT * FROM users WHERE email = $1", this.email)
        const length:number = result.rows.length
        if (length !== 0) {
            return false
        }
        return true 
    }

    async get_id (db:any) {
        const query = {
            text: "SELECT id FROM users WHERE email = $1",
            args: [this.email]
        }
        const result = await db.queryObject(query)
        return result.rows[0].id
    }

    async get_crypt_password (db:any) {
        const query = {
            text: "SELECT password FROM users WHERE email = $1",
            args: [this.email]
        }
        const result = await db.queryObject(query)
        return result.rows[0].password
    }

    async save (db:any) {
        const querySQL = "INSERT INTO users(name, email, password) VALUES($1,$2,$3)"
        const result = await db.queryArray(
            querySQL,
            this.name,
            this.email,
            this.password
        )
    }
}
