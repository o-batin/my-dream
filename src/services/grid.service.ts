import {Injectable} from '@angular/core';
import {AffineService} from "./affine.service";
import {ProjectiveService} from "./projective.service";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private affineService: AffineService, private projectiveService: ProjectiveService) {
  }


  drawGrid({width, height}: HTMLCanvasElement, ctx: CanvasRenderingContext2D, e1, e2) {
    this.drawGridLines(
      width,
      height,
      20,
      ctx,
      {
        color: '#c5c5c5',
        width: 1
      },
      e1,
      e2
    );
    this.drawGridLines(
      width,
      height,
      100,
      ctx,
      {
        color: '#b2b2b2',
        width: 2
      },
      e1,
      e2
    )
  }

  private drawGridLines(width: number, height: number, iter: number, ctx: CanvasRenderingContext2D, settings: Styles, e1, e2) {
    ctx.beginPath();
    for (let x = 0; x < width; x += iter) {
      if (e1.length === 3 && e2.length === 3) {
        const mT = this.affineService.transformation({e1: e1, e2: e2}, {x: x, y: 0});
        const lT = this.affineService.transformation({e1: e1, e2: e2}, {x: x, y: height});
        ctx.moveTo(mT.x, mT.y);
        ctx.lineTo(lT.x, lT.y);
      } else if (e1.length === 4 && e2.length === 4) {
        const mT = this.projectiveService.transformation({e1: e1, e2: e2}, {x: x, y: 0});
        const lT = this.projectiveService.transformation({e1: e1, e2: e2}, {x: x, y: height});
        ctx.moveTo(mT.x, mT.y);
        ctx.lineTo(lT.x, lT.y);
      } else {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
    }
    for (let y = 0; y < height; y += iter) {
      if (e1.length === 3 && e2.length === 3) {
        const mT = this.affineService.transformation({e1: e1, e2: e2}, {x: 0, y: y});
        const lT = this.affineService.transformation({e1: e1, e2: e2}, {x: width, y: y});
        ctx.moveTo(mT.x, mT.y);
        ctx.lineTo(lT.x, lT.y);
      } else if (e1.length === 4 && e2.length === 4) {
        const mT = this.projectiveService.transformation({e1: e1, e2: e2}, {x: 0, y: y});
        const lT = this.projectiveService.transformation({e1: e1, e2: e2}, {x: width, y: y});
        ctx.moveTo(mT.x, mT.y);
        ctx.lineTo(lT.x, lT.y);
      } else {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
    }
    ctx.strokeStyle = settings.color;
    ctx.lineWidth = settings.width;
    ctx.stroke();
  };
}


interface Styles {
  color: string;
  width: number;
}
