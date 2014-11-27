/**
 * GET /
 * Home page.
 */

exports.getAdminIndex = function(req, res) {
  res.render('admin/index', {
    title: '管理首页'
  });
};
