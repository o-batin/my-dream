import {Injectable} from '@angular/core';
import * as M from 'mathjs';
import {Point} from "./drawer.service";

export interface Basis {
  e1: number[];
  e2: number[];
}

@Injectable({
  providedIn: 'root'
})
export class AffineService {

  constructor() {
  }

  transformation(basis: Basis, point: Point): Point {
    const [e11, e12, e13] = basis.e1;
    const [e21, e22, e23] = basis.e2;

    const affineMatrix = M.matrix([
      [e11, e12, e13],
      [e21, e22, e23],
      [0, 0, 1],
    ]);
    const pointMatrix = M.matrix([point.x, point.y, 1]);
    const matrix = M.multiply(affineMatrix, pointMatrix);

    return {
      x: matrix.get([0]),
      y: matrix.get([1]),
    };
  }

}
