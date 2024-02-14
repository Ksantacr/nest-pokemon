import { AxiosAdapter } from './../common/adapters/axios.adapter';
import { Injectable } from '@nestjs/common';
import { PokeResponse, Result } from './interfaces/poke.response.interface';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    // const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    // const data = await response.json();
    // return data;

    // await axios.get<PokeResponse>(
    //   'https://pokeapi.co/api/v2/pokemon?limit=100',
    // );

    await this.pokemonModel.deleteMany({});

    const result = await this.http
      .get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
      .then((res: PokeResponse) => {
        return res.results;
      });
    this.pokemonModel.insertMany(this.parsePokeResponse(result));

    return 'Seed executed';
  }

  private parsePokeResponse(results: Result[]) {
    return results.map(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      return { name, no };
    });
  }
}
