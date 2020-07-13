const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (listWithOneBlog) => {
  return listWithOneBlog.reduce((partial_sum, blog) => partial_sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikeBlog = blogs.reduce((p, v) => ( p.likes > v.likes ? p : v ))
  return {
    'title': maxLikeBlog.title,
    'author': maxLikeBlog.author,
    'likes': maxLikeBlog.likes
  }
}

const mostBlogs = (blogs) => {
  const groupByBlogs = _.groupBy(blogs, 'author')
  //console.log(groupByBlogs)
  const maxBlog = _.reduce(groupByBlogs, (max, v) => {
    return (max.length > v.length ? max : v )
  })
  return {
    'author': maxBlog[0].author,
    'blogs': maxBlog.length
  }
}

const mostlike  = (blogs) => {
  const groupByBlogs = _.groupBy(blogs, 'author')
  _.forEach(groupByBlogs, function(value, key) {
    groupByBlogs[key].total_likes = _.reduce(value, (partial_sum, blog) => partial_sum + blog.likes, 0)
  })
  const maxBlog = _.reduce(groupByBlogs, (max, v) => {
    return (max.total_likes > v.total_likes ? max : v )
  })
  return {
    'author': maxBlog[0].author,
    'likes': maxBlog.total_likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostlike
}