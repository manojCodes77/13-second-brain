import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewContent, { action as NewPostAction } from './routes/NewContent.tsx'
import Signup, { signupAction } from './routes/Signup.tsx'
import Signin, { signinAction } from './routes/Signin.tsx'
import { ToastContainer } from 'react-toastify'
import { loader as contentLoader } from './components/ui/ContentList.tsx'
import Content from './components/ui/Content.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path:"/",
        element:<Content />,
        errorElement: <div>content Not Found</div>,
        loader: contentLoader,

      },
      {
        path: "create-content", // Path is now relative to the parent
        element: <NewContent />,
        action: NewPostAction,
      }
    ]
  }, {
    path: "/signup",
    element: <Signup />,
    errorElement: <div>Not Found</div>,
    action: signupAction
  }, {
    path: "/signin",
    element: <Signin />,
    errorElement: <div>Not Found</div>,
    action: signinAction
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <RouterProvider router={router} />
  </StrictMode>,
)
