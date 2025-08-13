/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPokemons = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0");
      const data = await response.json();
      setPokemon(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemons()
  }, []);
  return (
    <div className={`app`}>
      <header>
        <div className="header-content">
          <h1 className="title">Pokédex</h1>
        </div>
        <div className="subtitle">Desliza para explorar</div>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando Pokémon...</p>
        </div>
      ) : (
        <div className="swiper-container">
          <Swiper
            direction={window.innerWidth <= 768 ? "vertical" : "horizontal"}
            slidesPerView={window.innerWidth <= 768 ? 1 : 3}
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode]}
            className="pokemon-swiper"
          >
            {pokemon.map((pokemon, index) => (
              <SwiperSlide key={index}>
                <div className="pokemon-card">
                  <div className="pokemon-number">#{index + 1}</div>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 65}.png`}
                    alt={pokemon.name}
                    className="pokemon-image"
                    loading="lazy"
                  />
                  <h2 className="pokemon-name">
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default App;