import * as request from './request';

export const baseUrl = {
    getImage: (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    getGif: (id) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
};

export const pokeApi = {
    loadPokemon: (limit) => {
        const url = `/pokemon?offset=0&limit=${limit}`;
        return request.get(url);
    },
    detailPokemon: (id) => {
        const url = `/pokemon/${id}`;
        return request.get(url);
    },
    entriesPokemon: (id) => {
        const url = `/pokemon-species/${id}`;
        return request.get(url);
    },
    type: (id) => {
        const url = `type/${id}`;
        return request.get(url);
    },
};
