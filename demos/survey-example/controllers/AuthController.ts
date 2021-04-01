import {RouterContext, db} from "../deps.ts"
import User from "../models/Users.ts"

class AuthController {
    login() {
    }
    async register(ctx: RouterContext) {
        // connect to db and get the sent json data
        await db.connect()
        const user = await ctx.request.body().value
        // check if user email is already registered
        const queryUser = new User
        
        const test = await queryUser.find(db, user.email)
        console.log(test)

        if (!test) {
            ctx.response.status = 422
            ctx.response.body = { 
                success: false,
                msg: "Email is already used"
            }
            return
        } else {
            const querySQL = "INSERT INTO users(name, email, password) VALUES($1,$2,$3)"
            const result = await db.queryArray(
                querySQL,
                user.name,
                user.email,
                user.password
            )
            ctx.response.status = 201
            ctx.response.body = {
                    success: true,
                    data: user
            }
        }

        console.log(`User "${user.name}" created.`)
        await db.end()
    }
}

const authController = new AuthController()
export default authController
