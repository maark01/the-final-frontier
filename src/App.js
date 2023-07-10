import Header from "./components/Header/Header"
import Content from "./components/Content/Content"
import Footer from "./components/Footer/Footer"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { SpaceNewsProvider } from "./contexts/SpaceNewsContext"
import { SpaceLaunchProvider } from "./contexts/SpaceLaunchContext"
import { NasaPictureProvider } from "./contexts/NasaPictureContext"
import { CommentCreateReadProvider } from "./contexts/CommentCreateReadContext"
import { PagesProvider } from "./contexts/PagesContext"
import "./App.css"

function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <SpaceNewsProvider>
          <SpaceLaunchProvider>
            <NasaPictureProvider>
              <CommentCreateReadProvider>
                <PagesProvider>
                  <Router>
                    <Header />
                    <Content />
                    <Footer />
                  </Router>
                </PagesProvider>
              </CommentCreateReadProvider>
            </NasaPictureProvider>
          </SpaceLaunchProvider>
        </SpaceNewsProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
