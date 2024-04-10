import { useEffect, useState } from "react";
import axios from "axios";
import { FixedSizeList as List } from "react-window";
import "./searchPage.scss";

const apiKey = "617a0515a0mshb41613ed6b5bee4p1ffa32jsnf691fdeb59da";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("x/upcoming");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setErrorMessage(null); // Clear any previous error message

      try {
        const searchUrl = `https://moviesdatabase.p.rapidapi.com/titles/${searchTerm}`;
        const options = {
          method: "GET",
          url: searchUrl,
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        setMovies(response.data.results); // Assuming results are in response.data.results
      } catch (error) {
        setErrorMessage("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchMovies();
    } else {
      setMovies([]); // Clear movies if search term is empty
    }
  }, [searchTerm]);

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section id="searchPage">
      <div className="container">
        <div className="searchPage">
          <div className="header">
            <input
              type="text"
              placeholder="Search for a movie..."
              onChange={onChange}
            />
            <h1>Aaj Dikhaunga Tehellka Movies LLC.com</h1>
          </div>

          {isLoading && <p>Loading...</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {console.log(movies, "checking the movies values")}
          {movies.length > 0 && (
            <ul className="movieContainer">
              {movies.map((movie) => (
                <li className="movieCard" key={movie.id}>
                  <div className="movieCard2">
                    <div className="mImage">
                      <img
                        src={movie.primaryImage?.url}
                        alt="img not found"
                        loading="lazy"
                      />
                    </div>

                    <div className="lower">
                      <div className="mName">
                        Movie Name: {movie.originalTitleText.text}
                      </div>
                      <div className="id">Movie Id: {movie.id}</div>
                      <div className="relese">
                        Release Date:
                        {`${movie.releaseDate.day}/${movie.releaseDate.month}/${movie.releaseDate.year}`}
                      </div>
                      <div className="titleText">{movie.title}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {movies.length === 0 && searchTerm && <p>No movies found.</p>}
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
