import { FC, useContext } from "react";
import { metaData } from "./metaData";
import { SideBarNav } from "components/navigation/sideBarNavigation";
import { AuthContext } from "pages_los/auth";
import "./icons";
import { NavBarMetaDataType, NavItemType } from "components/navigation";

export const MySideBar: FC<{
  handleDrawerOpen: Function;
  open: boolean;
  basePath: string;
}> = ({ handleDrawerOpen, open, basePath }) => {
  const { authState } = useContext(AuthContext);

  let filteredMetaData = transformMetaDataAsPerRole(
    metaData,
    Number(authState.role)
  );

  return (
    <SideBarNav
      metaData={filteredMetaData}
      handleDrawerOpen={handleDrawerOpen}
      drawerOpen={open}
      basePath={basePath}
    />
  );
};

const transformMetaDataAsPerRole = (
  metaData: NavBarMetaDataType,
  role: number
) => {
  let navItems = filterMetaData(metaData.navItems, role);
  return {
    config: metaData.config,
    navItems: navItems,
  };
};

const filterMetaData = (
  navItems: NavItemType[],
  role: number
): NavItemType[] => {
  let newNavItems: NavItemType[] = [];
  for (let i = 0; i < navItems.length; i++) {
    if (Array.isArray(navItems[i].visibleToRoles)) {
      //@ts-ignore
      if (navItems[i].visibleToRoles?.indexOf(Number(role)) >= 0) {
        let { children, ...newItem } = navItems[i];
        if (Array.isArray(children) && children.length > 0) {
          let newChildren = filterMetaData(children, role);
          if (newChildren.length > 0) {
            newNavItems.push({ ...newItem, children: newChildren });
          }
        } else {
          newNavItems.push({ ...newItem });
        }
      }
    } else {
      let { children, ...newItem } = navItems[i];
      if (Array.isArray(children) && children.length > 0) {
        let newChildren = filterMetaData(children, role);
        if (newChildren.length > 0) {
          newNavItems.push({ ...newItem, children: newChildren });
        }
      } else {
        newNavItems.push({ ...newItem });
      }
    }
  }
  return newNavItems;
};
