import { Genre } from "./genre";
import { Show } from "./show";

export interface Movie {
    idPelicula: Number;
    nombrePelicula: string;
    idGenero: Number;
    genero: Genre;
    duracionPelicula: Number;
    idioma: string;
    sinopsisPelicula: string;
    thumbnail: string;
    funciones: Show[];
}
