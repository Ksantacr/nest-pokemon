import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke.response.interface';

@Injectable()
export class SeedService {
  async executeSeed() {
    // const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    // const data = await response.json();
    // return data;

    // await axios.get<PokeResponse>(
    //   'https://pokeapi.co/api/v2/pokemon?limit=100',
    // );

    const result = fetch(`https://pokeapi.co/api/v2/pokemon?limit=2`)
      .then((res) => res.json())
      .then((res: PokeResponse) => {
        //return res.results;

        res.results.forEach(({ name, url }) => {
          const segments = url.split('/');
          const no: number = +segments[segments.length - 2];
          console.log(name, no);
        });
      });
    return result;

    return 'Seed executed';
  }
}
