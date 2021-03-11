import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AssignmentReturnOutlinedIcon from "@material-ui/icons/AssignmentReturnOutlined";
import RepeatIcon from "@material-ui/icons/Repeat";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function NavList({ isAuth }) {
  const classes = useStyles();
  const history = useHistory();

  const myOrders = () => {
    if (!isAuth) {
      history.push("/login");
    } else {
      history.push("/orders");
    }
  };
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="User Acount">
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <ListItem button onClick={myOrders}>
          <ListItemIcon>
            <AssignmentReturnOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Return &amp; Orders" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <RepeatIcon />
          </ListItemIcon>
          <ListItemText primary="Buy Again" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="Shop By Department">
        <ListItem button>
          <ListItemText primary="Electronics" />
        </ListItem>
        <ListItemLink button>
          <ListItemText primary="Computers" />
        </ListItemLink>
        <ListItemLink button>
          <ListItemText primary="Smart Home" />
        </ListItemLink>
        <ListItemLink button>
          <ListItemText primary="Arts &amp; Crafts" />
        </ListItemLink>
        <ListItemLink button>
          <ListItemText primary="Gift Cards" />
        </ListItemLink>
        <ListItemLink button>
          <ListItemText primary="Amazon Live" />
        </ListItemLink>
        <ListItemLink button>
          <ListItemText primary="International Shopping" />
        </ListItemLink>
      </List>
    </div>
  );
}
