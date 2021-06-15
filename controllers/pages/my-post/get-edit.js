const { authenticateCurrentUserByToken , myWishlist: { getCurrentUserPostById } } = require('../../_helpers')

const pagesMyPostEdit = async function(req, res) {
  const { locals: { currentPost } } = res
  res.render('pages/my-post/edit', { post: currentPost })
}

module.exports = [authenticateCurrentUserByToken('html'), getCurrentUserWishlistById('html'), pagesMyPostEdit]