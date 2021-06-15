const { Wishlist } = require('../../../models')

module.exports = async function (req, res, next) {
  const { params: { id } } = req
  const post = await Post.findOne({
    where: { id: Number(id) || 0 },
    include: [
      {
        association: Post.PostItems
      }, {
        association: Post.User
      }
    ],
    order: [['PostItems', 'createdAt', 'DESC']]
  })
  if (!post) return res.status(404).render('pages/not-found', { message: `post with ID: ${id} is not found` })

  res.locals.currentPost = post

  next()
}