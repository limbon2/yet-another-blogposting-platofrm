import { ClientOptions } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createElasticsearchOptions(): ClientOptions {
    return {
      node: this.configService.getOrThrow('elastic.nodeUrl'),
    };
  }
}
