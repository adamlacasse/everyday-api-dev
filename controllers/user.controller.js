const UtilService = require('../services/util.service');
const JwtService = require('../services/jwt.service');


module.exports = {
/**
 *@api {post} /signup
 *@apiGroup User 
 * @apiName UserCard
 * @apiSuccess {Object} User A newly signed up cms user
 * @apiExample {curl} Example usage:
 * curl -i http://localhost:8080/signup
 * @apiDescription A user can signup to become a cms user
 * @apiParam {String} [username]
 * @apiParam {String} [email]
 * @apiParam {String} [password]
 */

  async create(ctx){
    try {
      ctx.body = await ctx.db.User.create({
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        password: ctx.request.body.password
      })
    } catch (error) {
        ctx.throw(500, err);
    }
  },
    /**
     *@api {post} /login
     *@apiGroup User
     * @apiName loginUser
     * @apiParam {String} [username] user must need to provide username
     * @apiParam {String} [password] user must need to provide password
     * @apiParamExample {String} Request Params :
     * {
     *  "username"  : "testuser",
     *  "password" : "password12"
     * }
     * @apiSuccess {Object} Token - JSON Web Token (JWT) to acces proceted routes
     * @apiSuccessExample {json} Login Response:
     * {
     *  "token" : "XZADJHASGDJHASGDJHAGSDJAGSJDH"
     * }
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:8080/login
     * @apiDescription User can login to the system
     */
  async login(ctx){
    try {
      let {username, password} = ctx.request.body;

      if(!username) {
        ctx.throw(400, 'please provide username')
      }
      if(!password) {
        ctx.throw(400, 'please provide password')
      }

      const user = await ctx.db.User.findOne({
        where: {
          username
        }
      })

      if(!user) {
        ctx.throw(500, 'unable to proces request');
      }
      const matched = UtilService.comparedPassword(password, user.password);
      if (matched) {

          //create a json webtoken for the user
          const token = JwtService.issue({
              payload:{
                  user: user.id
              }
          },'1 day');

          ctx.body = {token};

      } else {
          ctx.throw(500, 'invalid password');
      }


  }
  catch (err) {
      ctx.throw(500, err);
  }
}
};