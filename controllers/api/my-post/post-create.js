const { body } = require('express-validator')

const { authenticateCurrentUserByToken, checkValidation, MulterParser } = require('../../_helpers')
const { Post } = require('../../../models')

const permittedParams = [
  'title',
  'description',
  'PostItem.name',
  'PostItem.importance',
  'PostItem.received',
  ''
]

const validation = [
  body('title').isString().withMessage('Title must be a String').notEmpty().withMessage('Title is Required'),
  body('description').isString().withMessage('Description must be a String').notEmpty().withMessage('Description is Required'),
  body('PostItems').isArray({ min: 1}).withMessage('Post must have at least 1 Item'),
  body('PostItems.*.name').isString().withMessage('Item Name must be a String').notEmpty().withMessage('Item Name is Required'),
  body('PostItems.*.importance').toInt().isInt({ min: 0, max: 5 }).withMessage('Item Important must be Between 0 and 5'),
  body('PostItems.*.received').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
]

const apiMyPostCreate = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: postParams } = req
  const newPost = await Post.create({
    ...postParams,
  }, {
    fields: permittedParams,
    include: {
      association: Post.PostItems
    }
  })
  newPost.setUser(currentUser)

  res.status(200).json(newPost)
}

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.none(), validation, checkValidation, apiMyPostCreate]