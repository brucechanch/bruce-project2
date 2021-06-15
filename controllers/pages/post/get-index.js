const { Op } = require("sequelize")
const { Post } = require('../../../models')

const pagesPostsIndex = async function(req, res) {
  const { query } = req

  const q = query.q || ''
  const page = Number(query.page) || 1
  const limit = 10
  const offset = (page - 1) * limit
  const results = await Post.findAndCountAll({
    where: {
      title: {
        [Op.iLike]: `%${q}%`
      }
    },
    order: [['createdAt', 'DESC']],
    limit,
    offset
  })
  res.render('pages/post/index', {
    ost: results.rows,
    filters: { q, page, limit, offset, totalPages: Math.ceil(results.count / limit) }
  })
}

module.exports = [pagesPostIndex]