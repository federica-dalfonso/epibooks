import { Container, Navbar, Nav, Form } from "react-bootstrap";
import "./MyNav.css";
import logoDark from './EPIBOOKS_mint.png';
import logoLight from './EPIBOOKS_black.png';
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import ThemeButton from './ThemeButton';
import { useLocation } from "react-router-dom";


export default function MyNav ({ text, onSearchChange}) {

  //tema e bottone
  const { theme, setTheme } = useContext(ThemeContext);
    const changeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

  //tema background navbar
  const navTheme = theme === "light" ? "bg-light" : "bg-dark";

  //tema logo
  const logoTheme = theme === "dark" ? logoDark : logoLight;

  //tema links
  const linkTheme = theme === "dark" ? "color-dark color-hover-dark" : "color-light color-hover-light";

  //useLocation per un controllo di rendering su alcuni componenti che nel Route Details
  // non devono essere visualizzati: 
  const where = useLocation();

  //se la Nav si trova in homepage renderizzo anche l'input field e il button theme, 
  // altrimenti no:
  if (where.pathname === "/") {
    return (
      <Navbar className={navTheme}>
        <Container className="justify-content-start">

          <Navbar.Brand href="#">
            <img src={logoTheme} alt="epibooks_Logo" style={{width: '8em'}}/>
          </Navbar.Brand>

          <Nav className="pe-2">
            <Nav.Link href="/" className={linkTheme}>Home</Nav.Link>
            <Nav.Link href="#" className={linkTheme}>About</Nav.Link>
            <Nav.Link href="#" className={linkTheme}>Browse</Nav.Link>
          </Nav>

          <Form.Control className='search-field-style'
            type="text" id="inputSearch"
            placeholder="Cerca un titolo..."
            aria-describedby='searchBooks'
            value={text}
            onChange={onSearchChange}
          />  
          <ThemeButton changeTheme={changeTheme}/> 
        </Container>         
      </Navbar>
    )
  } else {
    return (
      <Navbar className={navTheme}>
      <Container className="justify-content-start">
          <Navbar.Brand href="#">
            <img src={logoTheme} alt="epibooks_Logo" style={{width: '8em'}}/>
          </Navbar.Brand>

          <Nav className="pe-2">
            <Nav.Link href="/" className={linkTheme}>Home</Nav.Link>
            <Nav.Link href="#" className={linkTheme}>About</Nav.Link>
            <Nav.Link href="#" className={linkTheme}>Browse</Nav.Link>
          </Nav>

          <ThemeButton changeTheme={changeTheme}/> 
      </Container>         
    </Navbar>
    )
  }

}