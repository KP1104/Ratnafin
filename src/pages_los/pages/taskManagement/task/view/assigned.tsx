import { Task } from "../task";
import { ActionTypes } from "components/dataTable";

export const AssignedTask = ({}) => {
  const actions: ActionTypes[] = [
    {
      actionName: "addTask",
      actionLabel: "Add Task",
      multiple: undefined,
      rowDoubleClick: false,
      alwaysAvailable: true,
    },
    {
      actionName: "taskHistory",
      actionLabel: "History",
      multiple: false,
      rowDoubleClick: true,
    },
  ];
  return <Task gridCode="TRN/008" actions={actions} />;
};
