import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Posts from './components/Posts'
import Post from './components/Post'
import NewPost from './components/NewPost'
import Comments from './components/Comments'
import NoPage from './components/NoPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NoPage />} />
        <Route path='/' element={<Home />} />
        <Route path='new' element={<NewPost />} />
        <Route path=':postId' element={<Post />}>
        <Route path='posts' element={<Posts />}>
            {/* <Route index element={<PostIndex />} /> */}
            <Route path='comments' element={<Comments />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
