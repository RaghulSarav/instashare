import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from 'react-router-dom';
export const Blog=()=>{
    const {id}=useParams();
    const {loading,blog}=useBlog({
        id:id||""
    });
    
    if(loading){
        return <div className="h-screen flex flex-col flex justify-center">
        <div className="flex justify-center">
            <Spinner/>
    </div>
    </div> 
    }

    return <div>
        {/* 
// @ts-ignore */}
        <FullBlog blog={blog}/>
    </div>

    
}