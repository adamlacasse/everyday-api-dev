module.exports = {
/**
 *@api {post} /card
 *@apiGroup Card 
 * @apiName CreateCard
 * @apiSuccess {Object} Card A newly created card element
 * @apiExample {curl} Example usage:
 * curl -i http://localhost:8080/card
 * @apiDescription LoggedIn user can create a new card
 * @apiHeader {String} Authorization  JWT Authorization header
 * @apiHeaderExample {json} Request Authorization Header
 * {
 *  "authorization" : "dfjjfdla98826830271"
 * }
 * @apiParam {String} [card_img_top] At present format=  img src='http://localhost:8080/img/maine.jpg'
 * @apiParam {String} [card_title] This is the card title
 * @apiParam {String} [card_text] This is the larger section of text withint the card
 * @apiParam {String} [list_group1] This is the first list group item beneath the card-text
 * @apiParam {String} [list_group2] This is the 2nd, might not be needed
 * @apiParam {String} [list_group3] This is the 3rd
 */

  async create(ctx){
    try {
      ctx.body = await ctx.db.Card.create({
        card_img_top: ctx.request.body.card_img_top,
        card_title: ctx.request.body.card_title,
        card_text: ctx.request.body.card_text,
        list_group1: ctx.request.body.list_group1,
        list_group2: ctx.request.body.list_group2,
        list_group3: ctx.request.body.list_group3
      })
    } catch (error) {
        ctx.throw(500, err);
    }
  },

  /**
   * @api {get} /cards
   * @apiGroup Card
   *  @apiName GetCards
   *  @apiSuccess {Object[]} Card List of Product Cards
   *  @apiExample {curl} Example usage:
   *  curl -i http://localhost:8080/cards
   *  @apiDescription Any User Can Return a View of all Product Cards
   * 
   */

  async find(ctx){
    try {
      ctx.body = await ctx.db.Card.findAll({});
    } catch (error) {
      ctx.throw(500, err);
    }
  },

/**
     *@api {get} /card/:id
     *@apiGroup Card
     * @apiName GetCard
     * @apiSuccess {Object} Card A single Card by Id
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:8080/card/:id
     * @apiDescription LoggedIn user can get single card by id
     * @apiHeader {String} Authorization  JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization" : "jkahdkjashdk324324342"
     * }
     */
    async findOne(ctx){
      try {

          const card = await ctx.db.Card.findOne({
              id: ctx.params.id
          });
          if (!card) {
              ctx.throw(404, 'card id is invalid');
          }
          ctx.body = card;
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

          const results = await ctx.db.Card.destroy({
              where: {
                  id: ctx.params.id
              }
          });

          results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `card is deleted with id ${ctx.params.id}`;

      }
      catch (err) {
          ctx.throw(500, err)
      }
  },
  /**
   *@api {put} /card/:id
   *@apiGroup Card
   * @apiName UpdateCard
   * @apiSuccess {Object} Card is updated successfully
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:8080/card/:id
   * @apiDescription LoggedIn user can get single card by id
   * @apiHeader {String} Authorization  JWT Authorization header
   * @apiHeaderExample {json} Request Authorization Header
   * {
   *  "authorization" : "jkahdkjashdk324324342"
   * }
   */
  async update(ctx){
      try {

          const results = await ctx.db.Card.update({
            card_img_top: ctx.request.body.card_img_top,
            card_title: ctx.request.body.card_title,
            card_text: ctx.request.body.card_text,
            list_group1: ctx.request.body.list_group1,
            list_group2: ctx.request.body.list_group2,
            list_group3: ctx.request.body.list_group3
          }, {
              where: {
                  id: ctx.params.id
              }
          });

          results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `card is updated with id ${ctx.params.id}`;

      }
      catch (err) {
          ctx.throw(500, err)
      }
  }
};