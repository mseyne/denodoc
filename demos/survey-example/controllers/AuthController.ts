import { RouterContext, db, hash, compare, create, verify, decode, getNumericDate } from "../deps.ts"
import { User } from "../models/Users.ts"

class AuthController {
    // Login : Get email and password from json, check if 
    // email is in database and if password match
    // if yes then create a connexion token for the current user
    async login(ctx: RouterContext) {
        try {
            const userData = await ctx.request.body().value
            if (userData === undefined) {
                ctx.response.status = 400
                ctx.response.body = {
                    success: false,
                    msg: 'No data'
                }
                return
            } else if (userData.email === undefined ||
                       userData.password == undefined) {
                ctx.response.status = 422
                ctx.response.body = {
                    success: false,
                    msg: 'Please provide an email and a password.'
                }
                return
            }
            await db.connect()
            const user = new User(userData)
            const test = await user.find_from_mail(db)
            if (test) {
                ctx.response.status = 422
                ctx.response.body = {
                    success: false,
                    msg: 'This email have not been registered.'
                }
                return
            } else {
                const test = await user.get_crypt_password(db)
                const check = await compare(user.password, test)
                if (check) {
                    const payload = { 
                        user: user.email,
                        exp: getNumericDate(60*5)
                    }
                    const key = "XXxxxxX" // pass it to ENV
                    const token = await create(
                        { alg:"HS512", typ:"JWT" },
                        payload,
                        key
                    )
                    let result = decode(token)
                    user.id = await user.get_id(db)
                    ctx.response.status = 200
                    ctx.response.body = {
                        success: true,
                        msg: 'Good password.',
                        data: user,
                        token: result
                    }
                } else {
                    ctx.response.status = 422
                    ctx.response.body = {
                        success: false,
                        msg: 'Wrong password.'
                    }
                }
            }
        } catch (err) {
            ctx.response.status = 500
            ctx.response.body = {
                success: false,
                msg: err.toString()
            }
        } finally {
            await db.end()
        }
    }

    // Register : Get name, email and password from json
    // check if email not registered, if not, hash password
    // and add to database a new user
    async register(ctx: RouterContext) {
        try {
            const userData = await ctx.request.body().value
            if (userData === undefined) {
                ctx.response.status = 400
                ctx.response.body = {
                    success: false,
                    msg: 'No data'
                }
                return
            }
            await db.connect()
            userData.password = await hash(userData.password)
            const user = new User(userData)
            const test = await user.find_from_mail(db)
            if (!test) {
                ctx.response.status = 422
                ctx.response.body = { 
                    success: false,
                    msg: "Email is already used."
                }
                return
            } else {
                await user.save(db)
                user.id = await user.get_id(db)
                console.log(`User "${user.name}" created with the id ${user.id}.`)
                ctx.response.status = 201
                ctx.response.body = {
                    success: true,
                    data: user
                }
            }
        } catch (err) {
            ctx.response.status = 500
            ctx.response.body = {
                success: false,
                msg: err.toString()
            }
        } finally {
            await db.end()
        }
    }
}

const authController = new AuthController()
export default authController
