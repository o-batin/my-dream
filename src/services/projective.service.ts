import {Injectable} from '@angular/core';

import * as M from 'mathjs';
import {Point} from "./drawer.service";
import {Basis} from "./affine.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectiveService {

  constructor() {
  }

  transformation(basis: Basis, point: Point) {
    const [e11, e12, e13, w1] = basis.e1;
    const [e21, e22, e23, w2] = basis.e2;
    const affineMatrix = M.matrix([
      [e11, e12, e13],
      [e21, e22, e23],
      [w1, w2, 1],
    ]);
    const pointMatrix = M.matrix([point.x, point.y, 1]);
    const matrix = M.multiply(affineMatrix, pointMatrix);

    return {
      x: matrix.get([0]) / matrix.get([2]),
      y: matrix.get([1]) / matrix.get([2]),
    };
  }
}
