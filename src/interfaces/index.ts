interface IEpisode {
  id: 28;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  image?: string;
  created: Date;
}

interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: unknown;
  residents: string[];
  url: string;
  image?: string;
  created: Date;
}

type TType = 'character' | 'location' | 'episode';

type TInfo = {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
};

export type { IEpisode, ICharacter, ILocation, TType, TInfo };
