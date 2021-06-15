const { authenticateCurrentUserByToken, myWishlist: { getCurrentUserPostById } } = require('../../_helpers')

const pagesMyPostShow = async function(req, res) {
  const { locals: { currentPost } } = res
  res.render('pages/my-post/show', { post: currentPost })
}

module.exports = [authenticateCurrentUserByToken('html'), getCurrentUserPostById('html'), pagesMyPostShow]