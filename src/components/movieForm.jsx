import React, { useEffect, useState } from "react";
import { Form, FormInput, FormSelect, SubmitButton } from "../common/Form";
import * as Yup from "yup";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

const MovieForm = ({ history, match }) => {
  const [genres, setGenres] = useState([]);
  const [initialValues, setInitialValues] = useState({
    _id: "",
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  const populateGenres = async () => {
    const { data: genres } = await getGenres();
    setGenres(genres);
  };

  const populateMovie = async () => {
    try {
      const movieId = match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);

      setInitialValues(mapToViewModel(movie));
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        history.replace("/not-found");
    }
  };

  useEffect(() => {
    populateGenres();

    populateMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const validationSchema = Yup.object().shape({
    _id: Yup.string(),
    title: Yup.string().required().label("Title"),
    genreId: Yup.string().required().label("Genre"),
    numberInStock: Yup.number().min(0).max(100).required().label("Stock"),
    dailyRentalRate: Yup.number().min(0).max(10).required().label("Rate"),
  });

  const handleSubmit = async (values) => {
    // Call server
    await saveMovie(values);

    // Redirect to movies
    history.push("/movies");
  };

  return (
    <div>
      <h1>Movie Form</h1>
      <Form
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <FormInput name="title" label="Title" type="text" autoFocus />
        <FormSelect
          name="genreId"
          options={genres}
          label="Genre"
          instruction="Select a genre..."
        />
        <FormInput name="numberInStock" label="Stock" type="number" />
        <FormInput name="dailyRentalRate" label="Rate" type="number" />
        <SubmitButton title="Save" />
      </Form>
    </div>
  );
};

export default MovieForm;
