import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
export const Appbar=()=>{
    return <div className="pt-2 border-b flex justify-between px-10">
        <Link to={"/posts"}>
        <div className="pt-1 flex-col flex justify-center font-semibold cursor-pointer">
            InstaShare
        </div>
        </Link>

        <div className="flex">
        <Link to={"/publish"}>
        <button type="button" className="text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add +</button>
        </Link>
        <div>
            <Avatar name="Raghul" size="big"/>
        </div>
        </div>
    </div>
}