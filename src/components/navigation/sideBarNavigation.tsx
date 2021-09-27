import { FC } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavItemType, SideBarRendererType } from "./types";
import { useStylesSideBar } from "./style";
import ScrollBar from "react-perfect-scrollbar";

export const SideBarNav: FC<SideBarRendererType> = ({
  metaData,
  handleDrawerOpen,
  drawerOpen,
  basePath,
}) => {
  const classes = useStylesSideBar();
  let result: JSX.Element[] | null = null;
  if (Array.isArray(metaData.navItems)) {
    result = metaData.navItems.map((one) => {
      if (Array.isArray(one.children)) {
        return (
          <NestedListItem
            key={one.label}
            item={one}
            classes={classes}
            level={0}
            handleDrawerOpen={handleDrawerOpen}
            drawerOpen={drawerOpen}
            basePath={basePath}
          />
        );
      } else {
        return (
          <SingleListItem
            key={one.label}
            item={one}
            classes={classes}
            level={0}
            basePath={basePath}
          />
        );
      }
    });
  }
  return (
    <List component="nav" disablePadding className={classes.navLinks}>
      <ScrollBar>{result}</ScrollBar>
    </List>
  );
};

const SingleListItem: FC<{
  item: NavItemType;
  classes: ReturnType<typeof useStylesSideBar>;
  level: number;
  basePath: string;
}> = ({ item, classes, level, basePath }) => {
  const navigate = useNavigate();

  const icon = item.icon ? (
    <ListItemIcon className={classes.listIcon}>
      <FontAwesomeIcon icon={["fas", item.icon]} />
    </ListItemIcon>
  ) : null;
  const levelClassName =
    level === 1
      ? classes.nestedMenuLevel1
      : level === 2
      ? classes.nestedMenuLevel2
      : false;
  return (
    <ListItem
      button
      disableGutters
      className={clsx(classes.item, levelClassName)}
      onClick={(e) => {
        e.preventDefault();
        if (item.isRouterLink) {
          let path = item.href;
          path =
            item.href?.substr(0, 1) === "/" ? item.href.substr(1) : item.href;
          if (item.passNavigationPropsAsURLParmas) {
            let urlParms = new URLSearchParams(item?.navigationProps);
            navigate(`${basePath}/${path}?${urlParms.toString()}`);
          } else {
            navigate(`${basePath}/${path}` as string, {
              state: { ...item?.navigationProps },
            });
          }
        } else if (Boolean(item.href)) {
          window.open(item.href, item.rel ?? "_newtab");
        }
      }}
    >
      {icon}
      <ListItemText
        primary={item.label}
        className={classes.link}
      ></ListItemText>
    </ListItem>
  );
};

const NestedListItem: FC<{
  item: NavItemType;
  classes: ReturnType<typeof useStylesSideBar>;
  level: number;
  handleDrawerOpen: Function;
  drawerOpen: boolean;
  basePath: string;
}> = ({ item, classes, level, handleDrawerOpen, drawerOpen, basePath }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (!drawerOpen) {
      handleDrawerOpen();
    }
    setOpen(!open);
  };
  const childrens = item.children?.map((one) => {
    if (Array.isArray(one.children)) {
      return (
        <NestedListItem
          key={one.label}
          item={one}
          classes={classes}
          level={level + 1}
          handleDrawerOpen={handleDrawerOpen}
          drawerOpen={drawerOpen}
          basePath={basePath}
        />
      );
    } else {
      return (
        <SingleListItem
          key={one.label}
          item={one}
          classes={classes}
          level={level + 1}
          basePath={basePath}
        />
      );
    }
  });

  const icon = item.icon ? (
    <ListItemIcon className={classes.listIcon}>
      <FontAwesomeIcon icon={["fas", item.icon]} />
    </ListItemIcon>
  ) : null;
  const levelClassName =
    level === 1
      ? classes.nestedMenuLevel1
      : level === 2
      ? classes.nestedMenuLevel2
      : false;
  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        disableGutters
        className={
          open
            ? clsx(classes.item, levelClassName, classes.openCurrent)
            : clsx(classes.item, levelClassName)
        }
      >
        {icon}
        <ListItemText
          primary={item.label}
          color="primary"
          className={classes.link}
        ></ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          className={open ? classes.openList : ""}
        >
          {childrens}
        </List>
      </Collapse>
    </>
  );
};
