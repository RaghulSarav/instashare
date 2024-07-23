import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Blogskeleton } from "../components/Blogskeleton";
import { useBlogs } from "../hooks/index"

export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    if(loading){
        return <div>
            <Blogskeleton/>
            <Blogskeleton/>
            <Blogskeleton/>
            <Blogskeleton/>
            <Blogskeleton/>
        </div>
    }
    return <div>
        <Appbar/>
        <div className="flex justify-center"> 
        <div className="">
            {blogs.map(blog=><BlogCard id={blog.id} authorName={blog.author.name||"Anonymous"} title={blog.title} content={blog.content} publishedDate="20 Feb 2024" />)
            }
        </div>
    </div>
    </div>

}