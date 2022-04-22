import {Routes, Route} from 'react-router-dom';

import Layout from './layout';

import Main from './pages/Main';
import WishList from './pages/WishList';
import AddBook from './pages/AddBook';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Main/>} />
          <Route path="wish-list" element={<WishList />} />
          <Route path="add-book" element={<AddBook/>} />
        </Route>
    </Routes>
  );
};

export default App;
