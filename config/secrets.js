/**
 * 重要信息 * 重要信息 * 重要信息 * 重要信息 * 重要信息 * 重要信息 *
 *
 * 本文件包含你的个人隐私和财产，不要将本文件上传到网站或公开的git仓库！
 *
 * 下面的初始化信息如需用于生产环境，请务必修改后使用。
 *
 * 如需推送到公开仓库，请用下述命令移除本文件的提交:
 *
 * git rm --cached config/secrets.js
 *
 * 如果你已经将包含你的账号和密钥的本文件提交到Github上，请参考下述链接移除
 * https://help.github.com/articles/remove-sensitive-data
*/

module.exports = {

  db: process.env.MONGOLAB_URI || process.env.MONGODB || 'mongodb://localhost:27017/nodestarter',

  sessionSecret: process.env.SESSION_SECRET || 'Session Secret加密字段',
  
  mandrill: {
    user: process.env.MANDRILL_USER || 'accout',
    password: process.env.MANDRILL_PASSWORD || 'password'
  },

  sendgrid: {
    user: process.env.SENDGRID_USER || 'accout',
    password: process.env.SENDGRID_PASSWORD || 'password'
  },

  weibo: {
    clientID: 'app key'
  , clientSecret: 'app secret'
  , callbackURL: 'http://127.0.0.1:3000/auth/weibo/callback'
  , passReqToCallback: true
  //  , requireState: true // for csrf, default: true
  //  , scope: ['statuses_to_me_read'
  //          , 'follow_app_official_microblog']
  }
};
