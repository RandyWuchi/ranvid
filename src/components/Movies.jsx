/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";
import Button from "../common/button";
import SearchBox from "../common/searchBox";

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  const populateGenre = async () => {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genre" }, ...data];
    setGenres(genres);
    setSelectedGenre(genres[0]);
  };

  const populateMovie = async () => {
    const { data: movies } = await getMovies();
    setMovies(movies);
  };

  useEffect(() => {
    populateGenre();
    populateMovie();
  }, []);

  const handleDelete = async (movie) => {
    const originalMovies = movies;

    const newMovies = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      setMovies(originalMovies);
    }
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
    setSearchQuery("");
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = movies;
    if (searchQuery)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else
      filtered =
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
        {user && <Button path="/movies/new" title="New Movie" />}
        <p>Showing {totalCount} movies in the database </p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
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
