const { authenticateCurrentUserByToken , myPost: { getCurrentUserPostById } } = require('../../_helpers')
const { PostItem } = require('../../../models')

const apiMyPostsDestroy = async function(req, res) {
  const { locals: { currentPost } } = res
  await currentPost.setPostItems([])
  await currentPost.destroy()
  await PostItem.destroy({ where: { PostId: null } })
  res.status(204).json()
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserPostById('json'), apiMyPostDestroy]