import * as M from "mathjs";
import {Injectable} from "@angular/core";
import {Point} from "./drawer.service";


interface Transformation {
  matrix?: M.Matrix;
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class EuclidService {

  constructor() {
  }

  private static degToRadian(angle: number) {
    return Math.PI / 180 * angle
  } ;

  public translate = (startPoint: Point, delta: Point): Transformation => {
    const m1 = M.matrix([startPoint.x, startPoint.y, 1]);
    const m2 = M.matrix([
      [1, 0, delta.x],
      [0, 1, delta.y],
      [0, 0, 1],
    ]);
    const matrix = M.multiply(m2, m1);

    return {
      matrix,
      x: matrix.get([0]),
      y: matrix.get([1]),
    };
  };

  public rotate = (point: Point, m: number, n: number, angle: number) => {
    const randianAngle = EuclidService.degToRadian(angle);

    return {
      x:
        point.x * Math.cos(randianAngle) +
        point.y * -Math.sin(randianAngle) -
        m * (Math.cos(randianAngle) - 1) +
        n * Math.sin(randianAngle),
      y:
        point.x * Math.sin(randianAngle) +
        point.y * Math.cos(randianAngle) -
        n * (Math.cos(randianAngle) - 1) -
        m * Math.sin(randianAngle),
    };
  };

  public euclidTransformations = (
    points: Point[],
    rotation: { x: number; y: number; angle: number },
    translation: Point,
  ) => {
    const rotatedPoints = rotation
      ? points.map(point => this.rotate({x: point.x, y: point.y}, rotation.x, rotation.y, rotation.angle))
      : [...points];
    return translation
      ? rotatedPoints.map(point =>
        this.translate({x: point.x, y: point.y}, {x: translation.x, y: translation.y}),
      )
      : [...rotatedPoints];
  };
}
