import { Link } from "react-router-dom";
export interface blogcardtype{
    title:string,
    authorName:string,
    publishedDate:string,
    content:string,
    id:number
}
export const BlogCard=({authorName,title,publishedDate,content ,id}:blogcardtype)=>{
    return <Link to={`/post/${id}`}>
        <div className="pb-4">
    <div className="border-b border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer ">
        <div className="flex">
            <div className="flex justify-center flex-col ">
                <Avatar name={authorName} size="small"/>
            </div> 
            <div className="font-extralight pl-2 text-sm">{authorName}</div>
            <div className="flex justify-center flex-col pl-2"><Circle/></div>
            <div className="font-thin pl-2 text-slate-500 text-sm">{publishedDate}</div> 
            </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+ "..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minute(s)`}
        </div>
       
    </div>
    </div>
    </Link>
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-400"></div>
}

 export function Avatar({name,size="small"}:{name:string,size:"small"|"big"}){
    return <div className={`relative inline-flex items-center justify-center ${size=="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-500 rounded-full dark:bg-gray-600`}>
    <span className={` text-gray-200 ${size=="small"?"text-xs":"text-md"} dark:text-gray-100`}>{name[0]}</span>
</div>

}