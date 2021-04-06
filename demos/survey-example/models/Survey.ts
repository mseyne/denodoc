import db from "../db.ts"

export default class Survey {
    public id:string = ''
    public userid:string
    public name:string
    public description:string 

    constructor ({
        userid='',
        name='',
        description=''
    }) {
        this.userid = userid
        this.name = name 
        this.description = description
    }

    static async find_by_userid (userid:string) {
        const query = {
            text: "SELECT * FROM surveys WHERE userid = $1",
            args: [userid]
        }
        const result = await db.queryObject(query)
        return result.rows
    }

    static async find_by_id (id:string) {
        const query = {
            text: "SELECT * FROM surveys WHERE id = $1",
            args: [id]
        }
        const result = await db.queryObject(query)
        return result.rows
    }

    async get_id (db:any) {
        const query = {
            text: "SELECT id FROM surveys WHERE name = $1",
            args: [this.name]
        }
        const result = await db.queryObject(query)
        return result.rows[0].id
    }

    async create () {
        const querySQL = "INSERT INTO surveys(name, description, userid) VALUES($1,$2,$3)"
        const result = await db.queryArray(
            querySQL,
            this.name,
            this.description,
            this.userid
        )
        console.log(result.rows)
    }

    async update () {
        const querySQL = "UPDATE surveys SET name=$1,description=$2, userid=$3 WHERE id=$4"   
        const result = await db.queryArray({
            text: querySQL,
            args: [
                this.name,
                this.description,
                this.userid,
                this.id
            ]
        })
        console.log(result.rows)
    }
}
