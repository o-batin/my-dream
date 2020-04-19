import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GridService} from "../../services/grid.service";
import {GoosePointsService} from "../../services/goose-points.service";
import {RoosterPointsService} from "../../services/rooster-points.service";
import {Point} from "../../services/drawer.service";
import {EuclidService} from "../../services/euclid.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AffineService} from "../../services/affine.service";
import {ProjectiveService} from "../../services/projective.service";

@Component({
  selector: 'app-lab2',
  templateUrl: './lab2.component.html',
  styleUrls: ['./lab2.component.scss']
})
export class Lab2Component implements OnInit, AfterViewInit {

  @ViewChild('canvasElement', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  parametersForm: FormGroup;

  constructor(
    private gridService: GridService,
    private goosePointsService: GoosePointsService,
    private roosterPointsService: RoosterPointsService,
    private euclidService: EuclidService,
    private affineService: AffineService,
    private projectiveService: ProjectiveService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.parametersForm = this.fb.group({
      transformX: ['0'],
      transformY: ['0'],
      e1: ['1, 0, 0'],
      e2: ['0, 1, 0']
    });
  }

  ngAfterViewInit(): void {
    const canvasElement = this.canvas.nativeElement;
    canvasElement.width = 801;
    canvasElement.height = 801;
    this.ctx = canvasElement.getContext('2d');
    this.drawRooster();
  }

  drawRooster(): void {
    const points = this.roosterPointsService.points;
    this.processDrawing(points);
  }

  drawGoose(): void {
    const points = this.goosePointsService.points;
    this.processDrawing(points);
  }

  processDrawing(points: Point[]): void {
    let {e1, e2} = this.parametersForm.getRawValue();
    e1 = e1.split(',').map(val => +val);
    e2 = e2.split(',').map(val => +val);
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.gridService.drawGrid(this.canvas.nativeElement, this.ctx, e1, e2);
    const groupedPoints = this.groupPoints(points);
    groupedPoints.forEach(element => this.drawCurveLines(element));
  }

  drawCurveLines(points: Point[]): void {
    let {e1, e2, transformX, transformY} = this.parametersForm.getRawValue();
    e1 = e1.split(',').map(val => +val);
    e2 = e2.split(',').map(val => +val);
    points = this.euclidService.euclidTransformations(points, {
      x: 0,
      y: 0,
      angle: 0
    }, {x: +transformX, y: +transformY});

    if (e1.length === 3 && e2.length === 3) {
      points = points.map(point => {
        return this.affineService.transformation({e1: e1, e2: e2}, point)
      });
    } else if (e1.length === 4 && e2.length === 4) {
      points = points.map(point => {
        return this.projectiveService.transformation({e1: e1, e2: e2}, point)
      });
    }

    const xPoints = points.map(point => point.x);
    const yPoints = points.map(point => point.y);

    let startPoint = points[0];

    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";

    for (let i = 0; i < 1; i += 0.01) {
      const endPointX = this.cubicBezierCurve(xPoints, i);
      const endPointY = this.cubicBezierCurve(yPoints, i);
      this.ctx.beginPath();
      this.ctx.moveTo(startPoint.x, startPoint.y);
      this.ctx.lineTo(endPointX, endPointY);
      this.ctx.stroke();
      this.ctx.closePath();
      startPoint = {x: endPointX, y: endPointY};
    }

  };

  cubicBezierCurve(numbers: number[], t: number): number {
    const [P0, P1, P2, P3] = numbers;
    const coefficient = 1 - t;
    return coefficient ** 3 * P0 + 3 * coefficient ** 2 * t * P1 + 3 * coefficient * t ** 2 * P2 + t ** 3 * P3;
  };

  groupPoints(points: Point[]): Point[][] {
    const result: Point[][] = [];
    let tmp: Point[] = [];
    points.forEach((item) => {
      tmp.push(item);
      if (tmp.length === 4) {
        result.push(tmp);
        tmp = [];
      }
    });
    return result;
  }

  transformRoosterToGoose(): void {
    const totalStep = 25;

    let startImage = this.roosterPointsService.points;

    let endImage = this.goosePointsService.points;

    const pointsDifference = endImage.map((point, i) => {
      const x = point.x - startImage[i].x;
      const y = point.y - startImage[i].y;
      return {x, y};
    });

    for (let step = 0; step < totalStep; step++) {
      setTimeout(() => {
        startImage = startImage.map((point, index) => {
          const x = point.x + pointsDifference[index].x / totalStep;
          const y = point.y + pointsDifference[index].y / totalStep;
          return {x, y};
        })
        this.processDrawing(startImage);
      }, 150 * step);
    }
  }
}
