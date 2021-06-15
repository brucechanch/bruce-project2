const { body } = require('express-validator')

const { authenticateCurrentUserByToken, checkValidation, MulterParser, myPost: { getCurrentUserPostById } } = require('../../_helpers')
const { PostItem } = require('../../../models')

const permittedChangeParams = {
  Post: ['title', 'description', 'PostItem.name', 'PostItem.importance', 'PostItem.received'],
  PostItems: ['name', 'importance', 'received']
}

const validation = [
  body('title').isString().withMessage('Title must be a String').notEmpty().withMessage('Title is Required'),
  body('description').isString().withMessage('Description must be a String').notEmpty().withMessage('Description is Required'),
  body('PostItems').isArray({ min: 1}).withMessage('Post must have at least 1 Item'),
  body('PostItems.*.name').isString().withMessage('Item Name must be a String').notEmpty().withMessage('Item Name is Required'),
  body('PostItems.*.importance').toInt().isInt({ min: 0, max: 5 }).withMessage('Item Important must be Between 0 and 5'),
  body('PostItems.*.received').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
]

const apiMyPostsUpdate = async function(req, res) {
  const { body: { PostItems: itemsParams, ...postParams } } = req
  const { locals: { currentPost } } = res

  await currentPost.update(postParams, { fields: permittedChangeParams.Post })
  await currentPost.setPostItems([])
  itemsParams.forEach(async function({ id: ItemId, ...itemParams }) {
    let postItem = await PostItem.findOne({ where: { id: Number(ItemId) || 0 } })

    if (postItem) {
      await postItem.update(itemParams, { fields: permittedChangeParams.PostItems })
    } else {
      postItem = await PostItem.create(itemParams, { fields: permittedChangeParams.PostItems })
    }

    await currentPost.addPostItem(postItem)
  })
  await PostItem.destroy({ where: { PostId: null } })

  res.status(200).json(currentPost)
}

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.none(), validation, checkValidation, getCurrentUserPostById('json'), apiMyPostsUpdate]
