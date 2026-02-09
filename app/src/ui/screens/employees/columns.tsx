"use client";

import type { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "#", width: 200 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
];
