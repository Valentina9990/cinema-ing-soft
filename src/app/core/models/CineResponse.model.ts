import { Cine } from "./Cine.model";

export interface CineResponse{
    rows: Cine[];
    total: number;
}
