import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage.jsx';
import NotFound from './pages/NotFound.jsx';
import { useState, useContext } from 'react';
import jsonData from './data/fantasy.json'
import { ThemeContext } from "./context/ThemeContextProvider";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookDetails from './pages/BookDetails.jsx';

function App() {
  //stato per l'input di ricerca in MyNav:
  const [inputName, setInputName] = useState("");

  // Aggiornare lo stato in base all'input:
  const handleSearch = (event) => {
    setInputName(event.target.value);
  };

  // Filtro che restituisce i risultati:
  const searchResult = jsonData.filter((element) => {
    return element.title.toLowerCase().includes(inputName.toLowerCase());
  });

  const { theme } = useContext(ThemeContext);
  const appTheme = theme === "dark" ? "bg-dark" : "bg-light";

  return (
    <div className={appTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage results={searchResult} text={inputName} onSearchChange={handleSearch}/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
          <Route path='/details/:bookASIN' element={<BookDetails/>}></Route>
        </Routes>    
      </BrowserRouter>
    </div>
  );
}

export default App;
