import { type ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Headword } from './components/Headword/Headword.tsx';
import { Home } from './components/Home/Home.tsx';

function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/headwords/:id" element={<Headword />} />
    </Routes>
  );
}

export default App;
