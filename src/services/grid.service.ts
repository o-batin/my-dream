import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor() {
  }


  drawGrid({width, height}: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.drawGridLines(
      width,
      height,
      20,
      ctx,
      {
        color: '#c5c5c5',
        width: 1
      }
    );
    this.drawGridLines(
      width,
      height,
      100,
      ctx,
      {
        color: '#b2b2b2',
        width: 2
      }
    )
  }

  private drawGridLines(width: number, height: number, iter: number, ctx: CanvasRenderingContext2D, settings: Styles) {
    ctx.beginPath();
    for (let x = 0; x < width; x += iter) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += iter) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
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
