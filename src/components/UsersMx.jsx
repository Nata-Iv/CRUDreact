import React, { useEffect } from "react";
import usersStore from "./store/usersStore";
import { observer } from "mobx-react-lite";
import { NavLink, Route, Routes } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";

const UsersMx = observer(() => {
  const [page, setPage] = useQueryParam(
    "page",
    withDefault(NumberParam, usersStore.page)
  );

  useEffect(() => {
    usersStore.fetchUsers(page);
    return () => usersStore.resetUserId();
  }, []);

  const onChangePaginationHandle = (e, num) => {
    usersStore.onChange(num);
    setPage(num);
    console.log("hello");
  };

  return (
    <div>
      <div className="allCard">
        <h4>Users with MobX</h4>
        <button type="button" id="btn-add">
          <NavLink to={`new`}>Add user</NavLink>
        </button>
        {usersStore.users.map((u) => (
          <div className="oneCard" key={u.id}>
            <div className="placeUser">
              <h1>{u.name}</h1>
              <p>{u.email}</p>
              <p>{u.phone}</p>
              <p>{u.gender}</p>
              <p>{u.age}</p>
              <button>
                <NavLink to={`${u.id}?page=${page}`}>edit</NavLink>
              </button>
              <button onClick={() => usersStore.handleDeleteClick(u, u.id)}>
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Stack spacing={2}>
        {!!usersStore.pageCount && (
          <Pagination
            shape="rounded"
            size="large"
            count={usersStore.pageCount}
            page={page}
            onChange={onChangePaginationHandle}
            sx={{ marginY: 5, mx: "auto" }}
          />
        )}
      </Stack>
      <Routes>
        <Route path="" element={<p>This page for mobx</p>} />
      </Routes>
    </div>
  );
});

export default UsersMx;
