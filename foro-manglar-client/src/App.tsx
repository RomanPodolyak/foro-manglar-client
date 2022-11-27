import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Drawer from './components/Drawer';
import ListComments from './components/ListComments';
import ListThemes from './components/ListThemes';
import ListThemesPosts from './components/ListThemesPosts';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='login'
          element={<SignIn />}
        />
        <Route
          path='register'
          element={<SignUp />}
        />
        <Route
          path='/'
          element={<Drawer />}
        >
          <Route
            path='/'
            element={<ListThemes />}
          />
          <Route
            path='themes/:themeId'
            element={<ListThemesPosts />}
          />
          <Route
            path='posts/:postId'
            element={<ListComments />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
