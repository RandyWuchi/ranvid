import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Like from "../common/like";
import Table from "../common/table";
import { getCurrentUser } from "../services/authService";

const MoviesTable = ({ movies, onLike, onDelete, sortColumn, onSort }) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
  ];

  useEffect(() => {
    showDeleteButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDeleteButton = () => {
    const user = getCurrentUser();
    if (user && user.isAdmin)
      columns.push({
        key: "delete",
        content: (movie) => (
          <button
            onClick={() => onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
      });
  };

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={movies}
    />
  );
};

export default MoviesTable;
