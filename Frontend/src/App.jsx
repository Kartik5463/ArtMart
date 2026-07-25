import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import PublicRoute  from "./components/PublicRoute"
import Signup from "./pages/Signup"
import Home from "./pages/Home"




function App(){
  return(
   <Routes>

  {/* Public pages without Layout */}
  <Route 
    path="/signup" 
    element={
      <PublicRoute>
        <Signup/>
      </PublicRoute>
    } 
  />

  {/* <Route 
    path="/login" 
    element={
      <PublicRoute>
        <Login/>
      </PublicRoute>
    } 
  /> */}
   <Route 
   index element={
     
        <Home/>
   
    } 
  />


  {/* App pages with Layout */}
  <Route path="/" element={<Layout />}>

      {/* <Route
        index
        element={
          <ProtectedRoute>
            <Feed/>
          </ProtectedRoute>
        }
      /> */}

  </Route>

</Routes>
  )
}

export default App
