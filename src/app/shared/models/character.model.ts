
export interface Character {
  id: number;
  descriptions: string;
  modified: Date;
  name: string;
  resourceURI: string;
  // TODO criar models para cada um dos itens abaixo.
  comics: any;
  events: any;
  series: any;
  stories: any;
  thumbnail: any;
  urls: any;
}
