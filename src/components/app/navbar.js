import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, NavLink } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar expand="md" className="bg-body-tertiary py-1" style={{ height: '50px' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h4>Gerenciador de Projetos</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/projetos">Meus Projetos</Nav.Link>
            <Nav.Link as={NavLink} to="/conta">Minha Conta</Nav.Link>
            <Nav.Link as={NavLink} to="/sair">Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
