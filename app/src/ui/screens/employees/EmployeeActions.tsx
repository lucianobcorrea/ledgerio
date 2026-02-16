import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "@/api/employee/delete";
import { useState } from "react";

export default function EmployeeActions({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return (
    <div className="flex items-center gap-2 h-full">
      <Link to={`/employees/${id}/edit`}>
        <Pencil size="20px" />
      </Link>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="transparent">
            <Trash2 className="text-red-500 size-5" />
          </Button>
        </DialogTrigger>
        <form>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete employee {name}</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this employee? This actions
                cannot be reversed.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <Button
                variant={"destructive"}
                disabled={isPending}
                onClick={() => mutate(id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
