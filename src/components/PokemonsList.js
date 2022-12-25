import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import PokemonDetails from './PokemonDetails'

const POKEDEX_BASE_URL = 'http://pokeapi.co/api/v2/pokemon/';
const rowGutter = [16, { xs: 8, sm: 16, md: 24, lg: 32 }];
const MIN_RESIZE_WIDTH = 760;

const PokemonsList = () => {
  const [pokeData, setPokeData] = useState([]);
  const [displaySize, setdisplaySize] = useState(false);
  const [nextUrl, setnextUrl] = useState(null);
  const [previousUrl, setpreviousUrl] = useState(null);

  const resize = () => {
    setdisplaySize(window.innerWidth <= MIN_RESIZE_WIDTH);
  }

  useEffect(() => {
    fetch(POKEDEX_BASE_URL)
      .then(res => res.json())
      .then((data) => {
        console.log('init-data', data);
        setPokeData(data.results);
        setnextUrl(data.next);
        setpreviousUrl(data.previous);
      });
    window.addEventListener('resize', resize.bind(this));
    resize();
  }, [])

  // Fetching next 20 pokemons data
  const onClickNext = () => {
    fetch(nextUrl)
      .then(res => res.json())
      .then((data) => {
        // console.log('next-data', data);
        setPokeData(data.results);
        setnextUrl(data.next);
        setpreviousUrl(data.previous);
      });
  };

  // Fetching previous 20 pokemons data
  const onClickPrevious = () => {
    fetch(previousUrl)
      .then(res => res.json())
      .then((data) => {
        // console.log('data', data);
        setPokeData(data.results);
        setnextUrl(data.next);
        setpreviousUrl(data.previous);
      });
  };

  return (
    <div>
      {
        pokeData && pokeData.length ?
          <div>
            <Row
              gutter={rowGutter}
              justify='center'
              style={{
                display: 'flex', flexDirection: displaySize ? 'column' : ''
              }} >
              {
                pokeData.map((pokemon) => {
                  return (
                    <Col span={6}>
                      <PokemonDetails pokemonDetails={pokemon} />
                    </Col>
                  );
                })
              }
            </Row>
            <div className='navigation-buttons'>
              <Button type="primary" onClick={onClickPrevious}>Previous</Button>
              <Button type="primary" onClick={onClickNext}>Next</Button>
            </div>
          </div>
          :
          null
      }
    </div>
  )
};

export default PokemonsList;