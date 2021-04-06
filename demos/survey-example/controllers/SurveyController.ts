import { RouterContext } from "../deps.ts"
import db from "../db.ts"
import Survey from "../models/Survey.ts"
import BaseController from "./BaseController.ts"

class SurveyController extends BaseController {
    async getAllForUser(ctx: RouterContext) {
        try {
            await db.connect()
            //@TODO
            // Find the surveys of the current connected user
            const uid = '1'
            const surveys = await Survey.find_by_userid(uid)
            const nbsurveys = surveys.length
            console.log(surveys, nbsurveys)
            if ( nbsurveys == 0 ) {
                ctx.response.status = 404
                ctx.response.body = {
                    success: false,
                    msg: "This user does not have any survey."
                }
            } else {
                ctx.response.status = 200
                ctx.response.body = {
                    success: true,
                    msg: `${ nbsurveys } survey(s) was(were) found.`,
                    data: surveys
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

    async getSingle(ctx: RouterContext) {
        try {
            await db.connect()
            const sid = ctx.params.id!
            const survey = await this.findSurveyOrFail(sid, ctx)
            if (survey !== null) {
                ctx.response.status = 200
                ctx.response.body = {
                    success: true,
                    msg: `The survey ${sid} has been found.`,
                    data: survey
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

    async create(ctx: RouterContext) {
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
            //@TODO 
            // Get the current connected user
            // To connect to the created user
            userData.userid = '1'
            const survey = new Survey(userData)
            await survey.create()
            survey.id = await survey.get_id(db)
            ctx.response.status = 201
            ctx.response.body = {
                success: true,
                data:survey,
                msg:`Survey "${survey.name}" created with the id ${survey.id}.`
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

    async update(ctx: RouterContext) {
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
            const sid = ctx.params.id!
            const survey = await this.findSurveyOrFail(sid, ctx)
            if (survey !== null) {
                const survey = new Survey(userData)
                survey.id = sid
                await survey.update()
                ctx.response.status = 200
                ctx.response.body = {
                    success: true,
                    msg: `The survey ${sid} has been updated.`,
                    data: survey
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

    async delete(ctx: RouterContext) {
        try {
            await db.connect()
            const sid = ctx.params.id!
            const survey = await Survey.find_by_id(sid)
            const slen = survey.length
            if ( slen == 0 ) {
                ctx.response.status = 404
                ctx.response.body = {
                    success: false,
                    msg: `The survey ${sid} does not exist.`
                }
            } else {
                //@TODO : delete here
                ctx.response.status = 204
                ctx.response.body = {
                    success: true,
                    msg: `The survey ${sid} has been deleted.`,
                    data: survey
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

const surveyController = new SurveyController()
export default surveyController
