import './App.css';
import MultiStepForm from './components/customers/MultiStepForm';
import Admin from './components/admins/Admin';
import Login from './components/auths/Login';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from './components/admins/ProductDetail';
import LayoutAdmin from './components/layouts/LayoutAdmin';
import LayoutPublic from './components/layouts/LayoutPublic';
import NotFoundPage from './components/errors/NotFoundPage';


const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        {/* Routes for Admin */}
        <Route path="/admin/*" element={<LayoutAdmin />}>
          <Route index element={<Admin />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Routes for public */}
        <Route path="/*" element={<LayoutPublic />}>
          <Route index element={<MultiStepForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
