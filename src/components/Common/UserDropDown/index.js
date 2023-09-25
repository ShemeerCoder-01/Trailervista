import React, { useEffect, useRef, useState } from 'react'
import { AccountCircleRounded } from '@mui/icons-material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuItem from '@mui/material/MenuItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {auth} from '../../../firebase';


function UserDropDown({anchorEl,setAnchorEl}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleLogout = async()=>{
    try{
      await auth.signOut();
      sessionStorage.removeItem('user');
      navigate('/');
    }catch(e){
      console.log("Error is :",e);
    }
    setOpen(false);
  }

  const handleClick = ()=>{
    navigate('/profile');
    setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className='dropdown'>
      <div>
        <div
          ref={anchorRef}
          id="composition-div"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <img className="avatar" src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar"/>
        </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper style={{margin:"5px 14px"}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-div"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClick}>
                      <ListItemIcon>
                       <AccountCircleRounded />
                        </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutRoundedIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Logout"/>
                     </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}

export default UserDropDown