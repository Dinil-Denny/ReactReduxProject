import { Navbar, Nav, Container, NavDropdown, Badge, Image } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import {clearCredentials} from '../slices/authSlice.js';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {userInfo} = useSelector((state)=>state.auth);

  console.log("userInfo: ",userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async() => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  // const imageBaseURL = 'http://localhost:5000/uploads/'
  // console.log(`${imageBaseURL}${userInfo.profileImage}`);

  return (
    <header>
      <Navbar bg="warning" variant="warning" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand style={{fontWeight:500}}>React Redux App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={
                    <span>
                      {/* {userInfo.profileImage ? (
                        <Image 
                          src={`${imageBaseURL}${userInfo.profileImage}`}
                          roundedCircle
                          //alt="profileImg"
                          style={{width:'40px', height:'40px',objectFit:'cover'}}
                        ></Image>
                      ) : (
                        <Image
                          src="http://localhost:5000/uploads/dummyProfileImg.jpg"
                          roundedCircle
                          //alt="profileImg"
                          style={{ width: '40px', height: '40px', objectFit: 'cover'}}
                        ></Image>
                      )}  */}
                      <span className="ms-2">{userInfo.name}</span>
                    </span>
                  } id="username">
                    <LinkContainer to={'/profile'}>
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                <LinkContainer to={'/login'}>
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                {/* <Nav.Link href="/register">
                  <FaSignOutAlt /> Sign Up
                </Nav.Link> */}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
