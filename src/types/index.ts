export interface CharacterType {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: LocationChar;
    location: LocationChar;
    image: string;
    episode: string[];
    url: string;
    created: Date;
    typeOfFav?: string
}

export interface LocationChar {
    name: string;
    url: string;
}

export interface UserType {
  email?: string
  password?: string
  id: string
  user_id: string
  favorites:  (CharacterType | LocationType)[]
}

export interface LoginProps {
  email?: string
  password?: string
}

export interface Doc {
  characters?: (CharacterType | LocationType)[]
  user_id?: string
}

export interface DocType extends Doc {
  id: string
}

export interface LocationType {
  id:        number;
  name:      string;
  type:      string;
  dimension: string;
  residents: string[];
  url:       string;
  created:   Date;
  typeOfFav?: string
}

export interface FavoriteButtonType {
  name: string
  data: CharacterType | LocationType
}

export interface UpdateDataType {
  data: { [key: string]: any };
  doc_id: string;
}