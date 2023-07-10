
const pages = [
    { name: "Home", path: "/", menubar: true, element: <Home /> },
    { name: "News", path: "/news", menubar: true, element: <News /> },
    { name: "Launches", path: "/launches", menubar: true, element: <Launches /> },
    { name: "Comments", path: "/comments", menubar: true, element: <Comments /> },
    { name: "PageNotFound", path: "*", menubar: false, element: <PageNotFound /> },
  ]