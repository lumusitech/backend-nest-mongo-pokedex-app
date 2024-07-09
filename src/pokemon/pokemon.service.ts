import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  // custom http codes if needed
  // @HttpCode(HttpStatus.CREATED)
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);

      throw new InternalServerErrorException(
        `Can't create pokemon - check server logs`,
      );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return updatePokemonDto;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
