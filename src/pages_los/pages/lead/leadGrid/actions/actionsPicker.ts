import { actions } from "./actions";

export const actionPicker = (currentRole, currentScreen) => {
  let newActions: any = [];
  for (const action of actions) {
    let allow = true;
    const { __VISIBLE_FOR_ROLES__, __VISIBLE_GRID_CODE__, ...others } = action;
    if (
      Array.isArray(__VISIBLE_GRID_CODE__) &&
      __VISIBLE_GRID_CODE__.indexOf(currentScreen) < 0
    ) {
      allow = false;
    }
    if (
      Array.isArray(__VISIBLE_FOR_ROLES__) &&
      __VISIBLE_FOR_ROLES__.indexOf(currentRole) < 0
    ) {
      allow = false;
    }
    if (allow) {
      newActions.push(others);
    }
  }
  return newActions;
};
