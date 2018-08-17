module.exports = {
/**
 *@api {post} /post
 *@apiGroup Post 
 * @apiName CreatePost
 * @apiSuccess {Object} Post A newly created post element
 * @apiExample {curl} Example usage:
 * curl -i http://localhost:8080/post
 * @apiDescription LoggedIn user can create a new post
 * @apiHeader {String} Authorization  JWT Authorization header
 * @apiHeaderExample {json} Request Authorization Header
 * {
 *  "authorization" : "dfjjfdla98826830271"
 * }
 * @apiParam {String} [post_img] At present format=  img src='http://localhost:8080/img/maine.jpg'
 * @apiParam {String} [post_title] This is the post title
 * @apiParam {String} [post_text] This is the larger section of text withint the post
 * @apiParam {String} [list_group1] This is the first list group item beneath the post-text
 * @apiParam {String} [list_group2] This is the 2nd, might not be needed
 * @apiParam {String} [list_group3] This is the 3rd
 */

  async create(ctx){
    try {
      ctx.body = await ctx.db.Posts.create({
        post_img: ctx.request.body.post_img,
        post_title: ctx.request.body.post_title,
        post_text: ctx.request.body.post_text,
        list_group1: ctx.request.body.list_group1,
        list_group2: ctx.request.body.list_group2,
        list_group3: ctx.request.body.list_group3,
        mood: ctx.request.body.mood
      })
    } catch (error) {
        ctx.throw(500, error);
    }
  },

  /**
   * @api {get} /posts
   * @apiGroup Post
   *  @apiName GetPosts
   *  @apiSuccess {Object[]} Post List of Author's Posts
   *  @apiExample {curl} Example usage:
   *  curl -i http://localhost:8080/posts
   *  @apiDescription Any User Can Return a View of all Product Cards
   * 
   */

  async find(ctx){
    try {
      ctx.body = await ctx.db.Posts.findAll({});
    } catch (error) {
      ctx.throw(500, err);
    }
  },

/**
     *@api {get} /post/:id
     *@apiGroup Post
     * @apiName GetPost
     * @apiSuccess {Object} Post A single Post by Id
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:8080/post/:id
     * @apiDescription LoggedIn user can get single post by id
     * @apiHeader {String} Authorization  JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization" : "jkahdkjashdk324324342"
     * }
     */
    //id: ctx.params.id within findOne
    async findOne(ctx){
      try {

          const post = await ctx.db.Posts.findOne({ 
              where: {
                id: ctx.params.id 
              }
          });
          if (!post) {
              ctx.throw(404, 'card id is invalid');
          }
          ctx.body = post;
      }
      catch (err) {
          ctx.throw(500, err)
      }
  },

  /**
   *@api {delete} /card/:id
   *@apiGroup Cards
   * @apiName deleteCard
   * @apiSuccess {Object} Card is deleted successfully
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:8080/card/:id
   * @apiDescription LoggedIn user can delete the card by id
   * @apiHeader {String} Authorization  JWT Authorization header
   * @apiHeaderExample {json} Request Authorization Header
   * {
   *  "authorization" : "jkahdkjashdk324324342"
   * }
   */
  async destroy(ctx){
      try {

          const results = await ctx.db.Posts.destroy({
              where: {
                  id: ctx.params.id
              }
          });

          results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `Post is deleted with id ${ctx.params.id}`;

      }
      catch (err) {
          ctx.throw(500, err)
      }
  },
  /**
   *@api {put} /post/:id
   *@apiGroup Post
   * @apiName UpdatePost
   * @apiSuccess {Object} Post is updated successfully
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:8080/post/:id
   * @apiDescription LoggedIn user can get single post by id
   * @apiHeader {String} Authorization  JWT Authorization header
   * @apiHeaderExample {json} Request Authorization Header
   * {
   *  "authorization" : "jkahdkjashdk324324342"
   * }
   */
  async update(ctx){
      try {

          const results = await ctx.db.Posts.update({
            post_img: ctx.request.body.post_img,
            post_title: ctx.request.body.post_title,
            post_text: ctx.request.body.post_text,
            list_group1: ctx.request.body.list_group1,
            list_group2: ctx.request.body.list_group2,
            list_group3: ctx.request.body.list_group3,
            mood: ctx.request.body.mood
          }, {
              where: {
                  id: ctx.params.id
              }
          });

          results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `Post is updated with id ${ctx.params.id}`;

      }
      catch (err) {
          ctx.throw(500, err)
      }
  }
};