import { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  GridRowModesModel,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import {
  Cancel as CancelIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  CopyAll as CopyIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../shared/theme";
import DropdownButton from "../../shared/components/buttons/DropdownButton";
import { deleteUrl, updateUrl } from "../../firebase/firebaseApi";
import { toast } from "react-toastify";
import { getUrlsFromUser } from "../../firebase/firebaseApi";

const AdminTable = ({ data }: { data: any }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(true);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [rows, setRows] = useState<any>(
    data || [
      {
        id: "Sample",
        name: "Sample Url",
        fullUrl: "https://google.com/",
        url: "https://google.com/",
        totalViewers: 999,
        date: "24-03-2024",
      },
    ]
  );
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };
  const processRowUpdate = (newRow: any) => {
    //@ts-ignore
    const updatedRow = { ...newRow };

    updateUrl(updatedRow)
      .then(() => {
        toast.success("URL updated successfully");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error updating row");
      });

    setRows(
      rows?.map((row: any) => (row?.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    console.log(newRowModesModel);
    setRowModesModel(newRowModesModel);
  };

  const columns: any[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "fullUrl",
      flex: 1,
      headerName: "URL",
    },
    {
      field: "url",
      flex: 1,
      editable: true,
      headerName: "To Url",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "totalViewers",
      flex: 1,
      headerName: "Total Viewers",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "left",
      align: "left",
    },
    {
      headerName: "Action",
      flex: 1,
      renderCell: ({ row, id }: { row: any; id: string }) => {
        // console.log(data);
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                padding: "0 10px",
                color: colors.greenAccent[400],
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              sx={{
                padding: "0 10px",
                color: colors.redAccent[400],
              }}
            />,
          ];
        }
        const buttons = [
          {
            text: "Edit",
            Icon: EditIcon,
            key: row?.id + "edit",
            onClick: handleEditClick(id),
          },
          {
            text: "Copy URL",
            Icon: CopyIcon,
            key: row?.id + "copy",
            onClick: () => navigator.clipboard.writeText(row?.fullUrl),
          },
          {
            text: "Delete",
            Icon: DeleteIcon,
            key: row?.id + "delete",
            onClick: () => {
              deleteUrl(row?.id)
                .then(() => {
                  toast.success("URL deleted successfully");
                  setRows(rows.filter((el: any) => el.id !== row.id));
                })
                .catch((e) => {
                  console.log(e);
                  toast.error("Error deleting row");
                });
            },
          },
        ];
        return (
          <div style={{ paddingRight: 12 }}>
            <DropdownButton
              buttonBgColor={colors.greenAccent[600]}
              renderButtons={buttons}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getUrlsFromUser()
      .then((data) => {
        if (data) {
          setRows(data);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error fetching data");
        setIsLoading(false);
      });
    return () => {};
  }, [data]);

  return (
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        color: "#333 !important",
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[600],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[600],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid
        sx={{
          padding: "0 10px",
        }}
        loading={isLoading}
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        autoHeight
        editMode="row"
        slots={{
          toolbar: GridToolbar,
        }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
};

export default AdminTable;
