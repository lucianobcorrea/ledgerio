import { list } from "@/api/employee/list";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import Loading from "@/ui/components/loading/Loading";
import Layout from "@/ui/components/layout/Layout";
import { useState } from "react";
import CustomToolbar from "@/ui/components/customToolbar/CustomToolbar";
import LinkButton from "@/ui/components/linkButton/LinkButton";

export default function ListEmployees() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees", page, pageSize],
    queryFn: () => list({ page: page + 1, perPage: pageSize }),
  });

  return isLoading ? (
    <Loading />
  ) : (
    <Layout>
      <div className="flex justify-between mb-5 items-center">
        <h1 className="font-bold">Employees</h1>
        <LinkButton route="/employees/create">Create</LinkButton>
      </div>
      <DataGrid
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
