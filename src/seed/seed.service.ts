import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import type { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import type { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel('Pokemon')
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    // Delete all pokemons at beginning
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const insertPromisesArray = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      // [ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', "/" ]

      const nro = +segments[segments.length - 2];
      // 1 (id number from url)

      insertPromisesArray.push(this.pokemonModel.create({ name, nro }));
    });

    await Promise.all(insertPromisesArray);

    return 'Seed executed';
  }
}
