import {Injectable} from '@angular/core';

export interface Point {
  x: number,
  y: number
}

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() {
  }

  degToRad(val) {
    return Math.PI / 180 * val;
  }

  createCircle(radius: number, start: number, end: number) {
    const points: Point[] = [];
    for (let angle = start; angle <= end; angle++) {
      const px = Math.sin(this.degToRad(angle)) * radius;
      const py = -(Math.cos(this.degToRad(angle)) * radius);
      points.push({x: px, y: py})
    }
    return points;
  }

  getCirclePoint(radius: number, angle: number): Point {
    const px = Math.sin(this.degToRad(angle)) * radius;
    const py = -(Math.cos(this.degToRad(angle)) * radius);
    return {x: px, y: py};
  }

}
