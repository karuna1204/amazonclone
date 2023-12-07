import React, { useContext, useEffect, useState } from 'react'
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";




const Navbar = () => {
  // const classes = usestyle();

  const history = useNavigate("");

  const [text, setText] = useState("");
  // // only for search
  const { products } = useSelector(state => state.getproductsdata);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(getProducts());
  // }, [dispatch])


  // const [open, setOpen] = useState(false);
  const [liopen, setLiopen] = useState(true);
  const { account, setAccount } = useContext(LoginContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dropen, setDropen] = useState(false);
  const getdetailsvaliduser = async () => {
    const res = await fetch("https://amazon-clone1-api1.vercel.app/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": account.tokens[0].token
      },
      credentials: "include"
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("first login");
    } else {
      // console.log("cart add ho gya hain");
      setAccount(data);
    }
  }

  useEffect(() => {
    getdetailsvaliduser();
  }, []);


  // for logout
  const logoutuser = async () => {
      const res2 = await fetch("https://amazon-clone1-api1.vercel.app/logout", {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization": account.tokens[0].token
          },
          credentials: "include"
      });

  const data2 = await res2.json();
  console.log(data2);

      if (!res2.status === 201) {
          const error = new Error(res2.error);
          throw error;
      } else {
          setAccount(false);
          // setOpen(false)
          toast.success("user Logout 😃!", {
              position: "top-center"
          });

          history("/");
      }
  }

  // for drawer

  const handelopen = () => {
    setDropen(true);
  }

  const handleClosedr = () => {
    setDropen(false)
  }

  const getText = (text) => {
      setText(text)
      setLiopen(false)
  }


  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handelopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen} onClose={handleClosedr}>
            <Rightheader logclose={handleClosedr} logoutuser={logoutuser}/>
          </Drawer>
          <div className="navlogo">
            <NavLink to='/'><img src="https://www.pngmart.com/files/Amazon-Logo-PNG-Image.png" alt="amazon" /></NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text"
            onChange={(e)=>getText(e.target.value)}
            placeholder='Search' />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>


            {
              text &&
              <List className="extrasearch" hidden={liopen}>
                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                      <ListItem>
                                      <NavLink to={`https://amazon-clone1-clientss.vercel.app/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                          {product.title.longTitle}
                                      </NavLink>
                                  </ListItem>
                              ))
                  }
              </List>
            }
          </div>
        </div>
        <div className="right">
          {account ? (
            <>
              <div className="nav_btn">
                <NavLink to="/profile"></NavLink>
              </div>
              <div className="cart_btn">
                <NavLink to="/buynow">
                  <Badge
                    badgeContent={account.carts.length}
                    color="primary"
                  >
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
                <ToastContainer />
                <p>Cart</p>
              </div>
              <Avatar
                className="avtar2"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {account.fname[0].toUpperCase()}
              </Avatar>
            </>
          ) : (
            <>
              <div className="nav_btn">
                <NavLink to="/login">Signin</NavLink>
              </div>
              <div className="cart_btn">
                <NavLink to="/buynow">
                  <Badge badgeContent={0} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
                <ToastContainer />
                <p>Cart</p>
              </div>
              <Avatar
                className="avtar"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              ></Avatar>
            </>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account ? (
              <MenuItem onClick={logoutuser}>
                <LogoutIcon
                  style={{ fontSize: 16, marginRight: 3 }}
                />
                Logout
              </MenuItem>
            ) : (
              ''
            )}
          </Menu>
          
        </div>
      </nav>
    </header>
  )
}

export default Navbar
