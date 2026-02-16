import type { GridColDef, GridColTypeDef } from "@mui/x-data-grid";
import EmployeeActions from "./EmployeeActions";

const actions: GridColTypeDef = {
  renderCell: (params) => {
    return <EmployeeActions id={params.row.id} name={params.row.name} />;
  },
};

export const columns: GridColDef[] = [
  { field: "id", headerName: "#", width: 200 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "actions", headerName: "Actions", ...actions, width: 100 },
];
