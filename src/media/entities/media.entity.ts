import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { AutoMap } from '@automapper/classes';
import { ThumbnailDto } from 'src/shared/thumbnail.dto';
import { MediaStatistics } from '../dto';

@Entity({ name: 'media' })
export class Media extends BaseEntity {
  @Column({ name: 'webpage_id' })
  @AutoMap()
  webpageId: string;

  @Column()
  @AutoMap()
  title: string;

  @Column()
  @AutoMap()
  description: string;

  @Column({ name: 'media_type' })
  @AutoMap()
  mediaType: string; // video,podcast,playlist,youtube_short

  @Column({ type: 'json', default: {} })
  @AutoMap()
  thumbnails: ThumbnailDto;

  @Column({ nullable: true, name: 'post_id' })
  @AutoMap()
  postId?: string;

  @Column({ type: 'interval' })
  @AutoMap()
  duration: any;

  @Column({ type: 'json', default: {} })
  @AutoMap()
  statistics: MediaStatistics;

  @Column({ name: 'media_provider' })
  @AutoMap()
  mediaProvider: string; // youtube,tiktok,spotify,audible

  @AutoMap()
  @Column({ type: 'timestamptz', precision: 3, name: 'published_at' })
  publishedAt: Date;

  @Column({ name: 'provider_media_id' })
  @AutoMap()
  providerMediaId: string;

  @Column({ default: 0 })
  @AutoMap()
  order: number;
}
