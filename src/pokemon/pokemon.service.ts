import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, type Model } from 'mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  private defaultOffset: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT');
    this.defaultOffset = this.configService.get<number>('DEFAULT_OFFSET');
  }

  // custom http codes if needed
  // @HttpCode(HttpStatus.CREATED)
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { offset = this.defaultOffset, limit = this.defaultLimit } =
      paginationDto;
    return await this.pokemonModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ nro: 1 })
      .select('-__v'); // excludes __v property
  }

  async findOne(term: string) {
    let pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ nro: term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with term "${term}" not found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      return await this.pokemonModel.findByIdAndUpdate(
        pokemon._id,
        updatePokemonDto,
        {
          new: true,
        },
      );
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // 2 db operations
    // const pokemon = await this.findOne(id);
    // await this.pokemonModel.findByIdAndDelete(id);

    // Better: only do one db operation
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);

    throw new InternalServerErrorException(
      `Can't resolve this action - check server logs`,
    );
  }
}
