module.exports = {
  MulterParser: require('./MulterParser'),
  getUserByToken: require('./get-user-by-token'),
  authenticateCurrentUserByToken: require('./authenticate-current-user-by-token'),
  checkValidation: require('./check-validation'),
  post: {
    getPostById: require('./post/get-post-by-id')
  },
  mypost: {
    getCurrentUserPostById: require('./my-post/get-current-user-post-by-id')
  }
}
