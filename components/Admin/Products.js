import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { mutate } from "swr";
import { onDeleteProduct } from "../../store/actions/productAction";

function Products({ products, handleId, tokenCookie }) {
  const columns = [
    {
      field: "_id",
      headerName: "ID.",
      width: 250,
      hide: true,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      sortable: false,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 280,
      sortable: false,
    },
    {
      field: "img",
      headerName: "Product image",
      sortable: false,

      width: 250,
    },
    {
      field: "categories",
      headerName: "Categories",
      sortable: false,

      width: 200,
    },
    {
      field: "size",
      headerName: "Size",
      sortable: false,

      width: 100,
    },
    {
      field: "color",
      headerName: "Color",
      sortable: false,

      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => {
        <strong>{params.row.price}$</strong>;
      },
    },
    {
      field: "",
      headerName: "Option",
      width: 200,
      disableClickEventBubbling: true,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleId(params.row._id)}
          >
            Edit
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = useCallback(
    async (id) => {
      const fetcher = () => {
        setTimeout(() => {
          products.filter((product) => product._id !== id);
        });
      };
      mutate("http://localhost:3000/api/product/all", fetcher);
      await dispatch(onDeleteProduct(id, tokenCookie));

      mutate("http://localhost:3000/api/product/all");
    },
    [dispatch, products, tokenCookie]
  );

  return (
    <div>
      <Button
        style={{ margin: "20px 0" }}
        onClick={() => router.push("/create")}
        variant="contained"
      >
        Create Product
      </Button>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row?._id}
          disableColumnSelector
        />
      </div>
    </div>
  );
}

export default React.memo(Products);
