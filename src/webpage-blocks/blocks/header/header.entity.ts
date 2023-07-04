import { Entity } from 'typeorm';
import { BaseBlockEntity } from '../base-block.entity';

@Entity({ name: 'webpage_header_block' })
export class HeaderBlock extends BaseBlockEntity {}
