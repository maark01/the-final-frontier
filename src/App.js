import Header from "./components/Header/Header"
import Content from "./components/Content/Content"
import Footer from "./components/Footer/Footer"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { SpaceNewsProvider } from "./contexts/SpaceNewsContext"
import { SpaceLaunchProvider } from "./contexts/SpaceLaunchContext"
import { NasaPictureProvider } from "./contexts/NasaPictureContext"
import { CommentCreateReadProvider } from "./contexts/CommentCreateReadContext"
import Home from "./pages/Home/Home"
import News from "./pages/News/News"
import Launches from "./pages/Launches/Launches"
import Comments from "./pages/Comments/Comments"
import "./App.css"
import PageNotFound from "./pages/PageNotFound/PageNotFound"

function App() {

  const pages = [
    { name: "Home", path: "/", menubar: true, element: <Home /> },
    { name: "News", path: "/news", menubar: true, element: <News /> },
    { name: "Launches", path: "/launches", menubar: true, element: <Launches /> },
    { name: "Comments", path: "/comments", menubar: true, element: <Comments /> },
    { name: "PageNotFound", path: "*", menubar: false, element: <PageNotFound/> },
  ]

  return (
    <div className="App">
      <AuthContextProvider>
        <SpaceNewsProvider>
          <SpaceLaunchProvider>
            <NasaPictureProvider>
              <CommentCreateReadProvider>
                <Router>
                  <Header menu={pages} />
                  <Content routes={pages} />
                  <Footer />
                </Router>
              </CommentCreateReadProvider>
            </NasaPictureProvider>
          </SpaceLaunchProvider>
        </SpaceNewsProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
