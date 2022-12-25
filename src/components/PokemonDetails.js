import React, { useState } from 'react';
import { Button, Modal, Card } from 'antd';

const { Meta } = Card;

const POKEMON_IMAGE_URL = 'https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world';

const PokemonDetails = (props) => {
  const { pokemonDetails } = props;
  const { name, url } = pokemonDetails;
  const arr = url.split('/')
  const id = arr[arr.length - 2]

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonStats, setPokemonStats] = useState([]);

  const showModal = () => {
    // Fetching single pokemon data by id
    fetch(url)
      .then(res => res.json())
      .then((stats) => {
        // console.log('single poke data', stats);
        setPokemonStats(stats);
      });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 200,
        }}
        cover={
          <img
            alt="example"
            loading="eager"
            src={`${POKEMON_IMAGE_URL}/${id}.svg`}
          />
        }
        actions={[
          <Button type="link" onClick={showModal}>Click to open</Button>
        ]}
      >
        <Meta
          title={name.toUpperCase()}
        />
      </Card>
      <Modal
        title="Pokemon Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Card
          style={{
            width: 200,
          }}
          cover={
            <img
              alt="example"
              loading="lazy"
              src={`${POKEMON_IMAGE_URL}/${id}.svg`}
            />
          }
        >
          <Meta
            title={name.toUpperCase()}
          />
          <p>Id: {pokemonStats.id}</p>
          <p>Height: {pokemonStats.height}</p>
          <p>Weight: {pokemonStats.weight}</p>
          <p>Order: {pokemonStats.order}</p>
          <p>Base experience: {pokemonStats.base_experience}</p>
        </Card>
      </Modal>
    </div>
  )
};

export default PokemonDetails;