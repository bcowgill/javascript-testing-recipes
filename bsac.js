#!/usr/bin/env node
var util = require('util')

var BlogPost = function BlogPost (title, body)
{
	this._title = title
	this._body  = body
}

BlogPost.prototype.toString = function BlogPost$toString ()
{
	return "[object BlogPost _title: " + this._title
		+ " _body: " + this._body + "]"
}

BlogPost.prototype.wordCount = function BlogPost$wordCount ()
{
	return this._body.split(/\s+/).length
}

console.log('BlogPost typeof', typeof BlogPost)
console.log('BlogPost name', BlogPost.name)
console.log('BlogPost toString', BlogPost.toString())
console.log('BlogPost', BlogPost)
console.log('BlogPost.prototype.wordCount typeof', typeof BlogPost.prototype.wordCount)

var post = new BlogPost("Classes in JavaScript", "Technically, JS does not have classes")

console.log('post typeof', typeof post)
console.log('post name', post.name)
console.log('post toString', post.toString())
console.log('post', post)
console.log('post constructor is BlogPost', post.constructor === BlogPost)
console.log('post constructor.name', post.constructor.name)
console.log('post is BlogPost', post.constructor === BlogPost)
console.log('post instanceof Object', post instanceof Object)
console.log('post instanceof BlogPost', post instanceof BlogPost)

console.log('post wordCount', post.wordCount())
// returns 6

var TaggedBlogPost = function TaggedBlogPost (title, body, tags)
{
	BlogPost.call(this, title, body)
	this._tags = tags
}
util.inherits(TaggedBlogPost, BlogPost)

var wordCount = BlogPost.prototype.wordCount

TaggedBlogPost.prototype.toString = function TaggedBlogPost$toString ()
{
	return "[object TaggedBlogPost _tags: " + this._tags.join(', ')
		+ " isa: " + BlogPost.prototype.toString.call(this) + "]"
}

TaggedBlogPost.prototype.wordCount = function TaggedBlogPost$wordCount ()
{
	return wordCount.call(this) + this._tags.length
}

console.log('TaggedBlogPost typeof', typeof TaggedBlogPost)
console.log('TaggedBlogPost name', TaggedBlogPost.name)
console.log('TaggedBlogPost toString', TaggedBlogPost.toString())
console.log('TaggedBlogPost', TaggedBlogPost)
console.log('TaggedBlogPost.prototype.wordCount typeof', typeof TaggedBlogPost.prototype.wordCount)

var tagPost = new TaggedBlogPost("Tagged post", "Body of tagged post is here", ['public', 'news']);

console.log('tagPost typeof', typeof tagPost)
console.log('tagPost name', tagPost.name)
console.log('tagPost toString', tagPost.toString())
console.log('tagPost', tagPost)
console.log('tagPost constructor is TaggedBlogPost', tagPost.constructor === TaggedBlogPost)
console.log('tagPost constructor.name', tagPost.constructor.name)
console.log('tagPost is BlogPost', tagPost.constructor === BlogPost)
console.log('tagPost instanceof Object', tagPost instanceof Object)
console.log('tagPost instanceof BlogPost', tagPost instanceof BlogPost)
console.log('tagPost instanceof BlogPost', tagPost instanceof BlogPost)
console.log('tagPost instanceof TaggedBlogPost', tagPost instanceof TaggedBlogPost)
console.log('tagPost instanceof post.constructor', tagPost instanceof post.constructor)
console.log('post instanceof TaggedBlogPost', post instanceof TaggedBlogPost)

console.log('tagPost wordCount', tagPost.wordCount())
// returns 6+2

