const { post: { getPostById } } = require('../../_helpers')

const pagesPostShow = async function(req, res) {
  const { locals: { currentPost } } = res
  res.render('pages/post/show', { wishlist: currentPost })
}

module.exports = [getPosttById, pagesPostShow]