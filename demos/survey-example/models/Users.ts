class User {
    async find(db:any, email:string){
        const result = await db.queryObject("SELECT * FROM users WHERE email = $1", email)
        const length:number = result.rows.length
        if (length !== 0) {
            return false
        }
        return true 
    }
}

export default User
