import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { Avatar, Typography } from "@material-ui/core";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import "./SideDrawer.css";
import { useHistory } from "react-router-dom";
import NavList from "./NavList/NavList";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { selectUser, removeUser } from "../../../features/user/userSlice";

export default function SwipeableTemporaryDrawer({ open, openIt, closeIt }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const signedInuser = useSelector(selectUser);
  const handleAuthentication = () => {
    if (signedInuser) {
      dispatch(removeUser());
      auth.signOut();
    } else {
      history.push("/login");
    }
    closeIt();
  };

  return (
    <div className="sidedrawer">
      <Drawer variant="temporary" open={open} onClose={closeIt} onOpen={openIt}>
        <div style={{ width: "260px" }}>
          <div className="sidedrawer__top" onClick={handleAuthentication}>
            <Avatar>
              {!signedInuser?.displayName ? (
                <PermIdentityOutlinedIcon />
              ) : (
                signedInuser.displayName[0].toUpperCase()
              )}
            </Avatar>
            <div className="sidedrawer__topRight">
              <Typography variant="body2">
                Hello {!signedInuser ? "Guset" : signedInuser.displayName}
              </Typography>
              <Typography variant="body2">
                {!signedInuser ? "Sign In" : "Sign Out"}
              </Typography>
            </div>
          </div>
          <NavList />
        </div>
      </Drawer>
    </div>
  );
}
