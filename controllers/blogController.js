import blogData from '../models/blogposts.json' with {type: "json"}

const blogDB = {
    blog: blogData,

    setBlogDB: function (newDB) {
        this.blog = newDB
    }
}

const allPosts = (req, res) => {
    res.json(blogDB.blog)
}

const postById = (req, res) => {
    const id = req.params.id

    const post = blogDB.blog.find(post => post.id == id)

    res.json(post)
}

const newBlogPost = (req, res) => {

    try {
        if(!req.body || !req.body.title || !req.body.text) return res.json({error: "Title and text must be specified"})

        
        const {title, text} = req.body
        const  id = blogDB.blog[blogDB.blog.length - 1].id + 1
        
        const conflict = blogDB.blog.find(post => post.title == title)
        if(conflict) return res.status(409).json({error: "Post already exists "})

        const newPost = {
            "id": id,
            "title": title,
            "text": text
        }

        blogDB.setBlogDB([...blogDB.blog, newPost])

        res.status(201).json(newPost)
        
    } catch (error) {
        res.status(500).json({"error": error.message })
    }
}

const deleteBlogPost = (req, res) => {
    const id = parseInt(req.params.id, 10);

    const target = blogDB.blog.findIndex(post => post.id === id)

    if (target === -1) return res.status(404).json({ error: "Post not found" })

    const blogCopy = [...blogDB.blog]; // Copy original blog array
    const deletedPost = blogCopy.splice(target, 1)[0]; // Remove post at target index
    blogDB.setBlogDB(blogCopy);
    res.status(200).json({ message: "Post deleted", deletedPost })
}

const updateBlogPost = (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    const target = blogDB.blog.findIndex(post => post.id === id)

    if (target === -1) return res.status(404).send({error: "Post doesn't exist"})
    const blogCopy = [...blogDB.blog];

    if(!req.body) return res.json({error: "Title or text must be specified"})
    const {title, text} = req.body

    const conflict = blogDB.blog.find(post => post.title == title && post.id !== id)
    if(conflict) return res.status(409).json({error: "Post title is associated with an existing post "})
    
    if (req.body.title) blogCopy[target].title = title
    if (req.body.text) blogCopy[target].text = text

    blogDB.setBlogDB(blogCopy)
    const updatedPost = blogDB.blog[target]

    res.status(200).send({message: "Post update successful", updatedPost})

}

export {allPosts, postById, newBlogPost, deleteBlogPost, updateBlogPost}