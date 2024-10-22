// exports.search = async function (req, res) {
//   try {
//     const posts = await Post.search(req.body.searchTerm)
//     res.json(posts)
//   } catch (errors) {
//     res.json([])
//   }
// }

exports.search = function (req, res) {
  Post.search(req.body.searchTerm)
    .then(posts => {
      res.json(posts)
    })
    .catch(() => {
      res.json([])
    })
}
