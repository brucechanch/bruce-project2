const { Post } = require('../../../models')

module.exports = function(format) {
  return async function (req, res, next) {
    const { locals: { currentUser } } = res
    const { params: { id } } = req
    const post = await Post.findOne({
      where: {
        id: Number(id) || 0,
        UserId: currentUser.id
      },
      include: [
        {
          association: Post.PostItems
        }, {
          association: Post.User
        }
      ],
      order: [['PostItems', 'createdAt', 'DESC']]
    })

    if (!post) {
      if (format === 'html') {
        return res.status(404).render('pages/not-found', { message: `Post with ID: ${id} is not found` })
      }

      if (format === 'json') {
        return res.status(404).json({ message: `Post of ID ${id} not found!` })
      }
    }

    res.locals.currentPost = post

    next()
  }
}