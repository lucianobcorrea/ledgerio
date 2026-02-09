import { list } from "@/api/employee/list";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import Loading from "@/ui/components/loading/Loading";
import Layout from "@/ui/components/layout/Layout";
import { useState } from "react";
import CustomToolbar from "@/ui/components/customToolbar/CustomToolbar";

export default function EmployeesList() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees", page, pageSize],
    queryFn: () => list({ page: page + 1, perPage: pageSize }),
  });
  console.log(employees);
  return isLoading ? (
    <Loading />
  ) : (
    <Layout>
      <DataGrid``
        rows={employees.data}
        columns={columns}
        rowCount={employees.total}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        pageSizeOptions={[5, 10, 25]}
        loading={isLoading}
        showToolbar
        slots={{ toolbar: CustomToolbar }}
      />
    </Layout>
  );
}
