import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Posts from './components/Posts'
import Post from './components/Post'
import NewPost from './components/NewPost'
import Comments from './components/Comments'
import NoPage from './components/NoPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='new' element={<NewPost />} />
        <Route path="/" element={<Posts />} />
        <Route path="/post/:postId" element={<Post />} />
        {/* <Route index element={<PostIndex />} /> */}
        <Route path='comments' element={<Comments />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
