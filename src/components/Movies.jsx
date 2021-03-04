/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";

const Movies = () => {
  const [movies, setMovies] = useState(getMovies());
  const [genres, setGenres] = useState([
    { _id: "", name: "All Genre" },
    ...getGenres(),
  ]);
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const handleDelete = (movie) => {
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
  };

  const handleLike = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...newMovies[index] };
    newMovies[index].liked = !newMovies[index].liked;
    setMovies(newMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedMovies };
  };

  const { length: count } = movies;

  if (count === 0) return <p>There are no movies in the database</p>;

  const { totalCount, data } = getPagedData();

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <p>Showing {totalCount} movies in the database </p>
        <MoviesTable
          movies={data}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
