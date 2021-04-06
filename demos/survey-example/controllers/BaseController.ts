import { RouterContext } from "../deps.ts"
import Survey from "../models/Survey.ts"

export default class BaseController {
    
    async findUserOrFail(){}

    async findSurveyOrFail(id:string, ctx:RouterContext) {
        const survey = await Survey.find_by_id(id)
        const slen = survey.length
        if ( slen == 0 ) {
            ctx.response.status = 404
            ctx.response.body = {
                success: false,
                msg: `The survey ${id} does not exist.`
            }
            return null
        } 
        return survey
    }
}
