import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "assets/images/logo.svg";
import { useStyles } from "./style";
import { AuthContext } from "pages_los/auth";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

export const MyAppBar = ({ handleDrawerOpen, open }) => {
  const authController = useContext(AuthContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        {open !== true ? (
          <img
            src={Logo}
            alt="Ratnaafin"
            className={classes.logo}
            onClick={(e) => {
              e.preventDefault();
              navigate("./");
            }}
          />
        ) : null}

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          LOS: Loan Origination System
          <div style={{ display: "flex", gap: "8px" }}>
            <div>
              <Typography variant="caption" display="block" color="secondary">
                Branch: {authController?.authState?.user?.branchCode ?? ""} -{" "}
                {authController?.authState?.user?.branch ?? ""}
              </Typography>
              <Typography variant="caption" display="block" color="secondary">
                Last Login:{" "}
                {checkDateAndDisplay(
                  authController?.authState?.user?.lastLogin ?? ""
                )}
              </Typography>
            </div>
          </div>
        </Typography>

        {/* <SearchBar /> */}
        {/* <IconButton color="inherit" className="ml-2">
          <Badge badgeContent={0} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}

        <div className={classes.loggedInUser}>
          {/* <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.nameClass}
          >
            <span className={classes.userName}>
              {`${authController?.authState?.user?.firstName ?? ""} ${
                authController?.authState?.user?.lastName
              }`}
            </span>
            <ArrowDropDownIcon />
          </Button> */}
          <IconButton onClick={handleClick}>
            <Avatar
              aria-label={`${
                authController?.authState?.user?.firstName ?? ""
              } ${authController?.authState?.user?.lastName}`}
              style={{ backgroundColor: "var(--theme-color1)" }}
            >
              {authController?.authState?.user?.firstName
                .substr(0, 1)
                .toUpperCase()}
            </Avatar>
          </IconButton>
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={3}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              style: { width: "240px" },
            }}
          >
            <div style={{ padding: "16px" }}>
              <Typography variant="h6" className={classes.userName}>
                {authController?.authState?.user?.firstName}{" "}
                {authController?.authState?.user?.lastName}
              </Typography>
              <Typography variant="h6" className={classes.userDesignation}>
                Role: {authController?.authState?.roleName}
              </Typography>
              <Typography variant="h6" className={classes.userDesignation}>
                User ID : {authController?.authState?.user.id}
              </Typography>
            </div>
            <Divider />
            <div style={{ padding: "16px 0px 0px" }}>
              <MenuItem
                onClick={() => {
                  navigate("/los/profile");
                  handleClose();
                }}
              >
                <AccountCircleIcon color="primary" />
                <span className={classes.vTop}>Profile</span>
              </MenuItem>
            </div>
            <div style={{ padding: "16px" }}>
              <Button
                onClick={() => {
                  authController?.logout();
                  handleClose();
                }}
                fullWidth
                variant="outlined"
              >
                Logout
              </Button>
            </div>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const checkDateAndDisplay = (dateStr: string) => {
  const dt = new Date(dateStr);
  //@ts-ignore
  if (dt instanceof Date && !isNaN(dt)) {
    return dt.toDateString();
  }
  return "N/A";
};
