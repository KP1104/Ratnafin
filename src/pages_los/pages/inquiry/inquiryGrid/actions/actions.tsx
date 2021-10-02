import { ActionTypes } from "components/dataTable";
import { screens } from "../consts";
import * as roles from "pages_los/roles";

interface extendedType {
  __VISIBLE_GRID_CODE__?: any;
  __VISIBLE_FOR_ROLES__?: any;
}
type MyActionTypes = ActionTypes & extendedType;

export const actions: MyActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
    __VISIBLE_GRID_CODE__: [screens.myInquiry],
    __VISIBLE_FOR_ROLES__: [...roles.BRANCH_ROLES],
  },
  {
    actionName: "view-details-readOnly",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
    __VISIBLE_GRID_CODE__: [screens.myInquiry],
    __VISIBLE_FOR_ROLES__: [2, 3, 4],
  },
  {
    actionName: "view-status",
    actionLabel: "View Status",
    multiple: false,
    rowDoubleClick: true,
    __VISIBLE_GRID_CODE__: [screens.myCrossInquiries],
  },
  {
    actionName: "assign-branch",
    actionLabel: "Assign Branch",
    multiple: true,
    rowDoubleClick: false,
    __VISIBLE_GRID_CODE__: [
      screens.unmappedHOInquiries,
      screens.unmappedInquiries,
    ],
  },
  {
    actionName: "assign-inquiry",
    actionLabel: "Assign Inquiry",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "assign-task",
    actionLabel: "Assign Task",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "priority",
    actionLabel: "Priority",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "move-to-lead",
    actionLabel: "Move To Lead",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "document-upload",
    actionLabel: "Document Details",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "assign-task",
    actionLabel: "Assign Task",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "calculator",
    actionLabel: "Eligibility Calculator",
    multiple: false,
    rowDoubleClick: false,
    shouldExclude: (rows) => {
      let exclude = true;
      if (["12300001", "12300002"].indexOf(rows[0].data?.product_type) >= 0) {
        exclude = false;
      }
      return exclude;
    },
  },
];
