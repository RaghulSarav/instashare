import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/post/:id" element={<Blog />} />
          <Route path="/posts" element={<Blogs/>} />
          <Route path="/publish" element={<Publish/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App