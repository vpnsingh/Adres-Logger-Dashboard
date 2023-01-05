import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand className='fw-bold'>Logger Dashboard</Navbar.Brand>
          <Nav className="me-auto">
              <Link to="/home" className='nav-link'>Home</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;