import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GridService} from "../services/grid.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DrawerService, Point} from "../services/drawer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  parametersForm: FormGroup;

  @ViewChild('canvasElement', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(
    private gridService: GridService,
    private fb: FormBuilder,
    private drawerService: DrawerService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    const canvasElement = this.canvas.nativeElement;
    canvasElement.width = window.innerWidth - 50;
    canvasElement.height = window.innerHeight - 50;
    this.ctx = canvasElement.getContext('2d');
  }


  createForm() {
    this.parametersForm = this.fb.group({
      centerX: ['400'],
      centerY: ['200'],
      radiusInner: ['20'],
      circleRectangleWidth: ['10'],
      circleRectangleHeight: ['5'],
      outerSmallCircleRadius: ['50'],
      outerBigCircleRadius: ['70'],
      outerRectangleWidth: ['10']
    });
    this.parametersForm.valueChanges.subscribe(
      ({
         centerX, centerY, radiusInner,
         circleRectangleWidth, circleRectangleHeight,
         outerSmallCircleRadius, outerBigCircleRadius,
         outerRectangleWidth
       }) => {
        centerX = +centerX;
        centerY = +centerY;
        radiusInner = +radiusInner;
        circleRectangleWidth = +circleRectangleWidth;
        circleRectangleHeight = +circleRectangleHeight;
        outerSmallCircleRadius = +outerSmallCircleRadius;
        outerBigCircleRadius = +outerBigCircleRadius;
        outerRectangleWidth = +outerRectangleWidth;

        this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.gridService.drawGrid(this.canvas.nativeElement, this.ctx);

        // DETAIL
        const points: Point[] = [];
        this.ctx.beginPath();
        points.push({x: circleRectangleWidth, y: -radiusInner - circleRectangleHeight});
        const startCircleAngle = Math.acos(circleRectangleWidth / radiusInner) * 180 / Math.PI;
        const circlePoints = this.drawerService.createCircle(radiusInner, 90 - startCircleAngle, 90);
        points.push(...circlePoints);


        this.ctx.moveTo(centerX, centerY - radiusInner - circleRectangleHeight);
        points.forEach(({x, y}) => this.ctx.lineTo(x + centerX, y + centerY));
        this.ctx.moveTo(centerX, centerY - radiusInner - circleRectangleHeight);
        points.forEach(({x, y}) => this.ctx.lineTo(-x + centerX, y + centerY));
        this.ctx.moveTo(centerX, centerY + radiusInner + circleRectangleHeight);
        points.forEach(({x, y}) => this.ctx.lineTo(x + centerX, -y + centerY));
        this.ctx.moveTo(centerX, centerY + radiusInner + circleRectangleHeight);
        points.forEach(({x, y}) => this.ctx.lineTo(-x + centerX, -y + centerY));

        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.beginPath();

        const firstTangent = this.drawerService.getCirclePoint(outerBigCircleRadius, 30);
        const {x1, x2} = this.getTangentDistantPoints(firstTangent.x, firstTangent.y, outerRectangleWidth);
        const firstDistantPoint = {
          x: x1,
          y: this.tangentEquation(firstTangent.x, firstTangent.y, x1, outerBigCircleRadius)
        };
        const intersectionFirst = this.getFirstIntersection(
          outerSmallCircleRadius,
          (firstTangent.x / firstTangent.y),
          firstDistantPoint.x,
          -firstDistantPoint.y
        );
        const secondDistantPoint = {
          x: x2,
          y: this.tangentEquation(firstTangent.x, firstTangent.y, x2, outerBigCircleRadius)
        };
        // For small circle
        const secondTangent = this.drawerService.getCirclePoint(outerSmallCircleRadius, 60);
        const intersectionSecond = this.getSecondIntersection(
          outerSmallCircleRadius,
          -secondTangent.y,
          secondTangent.x,
          -secondDistantPoint.y,
          secondDistantPoint.x,
          -firstTangent.y,
          firstTangent.x
        );
        const secondIntersectionValue = this.getSecondIntersectionValue(
          intersectionSecond,
          secondTangent.x,
          -secondTangent.y,
          outerSmallCircleRadius
        );
        const intersectionThird = this.getThirdIntersection(outerRectangleWidth, -secondTangent.y, secondTangent.x, outerSmallCircleRadius);

        const outerPoints: Point[] = [
          {
            x: intersectionFirst,
            y: -outerSmallCircleRadius
          },
          {
            x: firstDistantPoint.x,
            y: firstDistantPoint.y
          },
          {
            x: secondDistantPoint.x,
            y: secondDistantPoint.y
          },
          {
            x: intersectionSecond,
            y: -secondIntersectionValue
          },
          {
            x: intersectionThird,
            y: -outerRectangleWidth
          },
          {
            x: outerBigCircleRadius,
            y: -outerRectangleWidth
          },
          {
            x: outerBigCircleRadius,
            y: 0
          },

        ];
        this.ctx.moveTo(centerX, centerY - outerSmallCircleRadius);
        outerPoints.forEach(({x, y}) => this.ctx.lineTo(x + centerX, y + centerY));
        this.ctx.moveTo(centerX, centerY - outerSmallCircleRadius);
        outerPoints.forEach(({x, y}) => this.ctx.lineTo(-x + centerX, y + centerY));
        this.ctx.moveTo(centerX, centerY + outerSmallCircleRadius);
        outerPoints.forEach(({x, y}) => this.ctx.lineTo(x + centerX, -y + centerY));
        this.ctx.moveTo(centerX, centerY + outerSmallCircleRadius);
        outerPoints.forEach(({x, y}) => this.ctx.lineTo(-x + centerX, -y + centerY));


        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

      }
    )
  }

  tangentEquation(x1: number, y1: number, x: number, r: number) {
    return (-x1 / y1) * x + Math.pow(r, 2) / y1;
  }

  getTangentDistantPoints(x1: number, y1: number, distance: number): { x1: number, x2: number } {
    const a = 1;
    const b = 2 * x1;
    const c = Math.pow(x1, 2) - (Math.pow(distance, 2) / (1 + (-x1 / y1)));
    let discriminant = Math.pow(b, 2) - 4 * a * c;
    return {
      x1: -(-b + Math.sqrt(discriminant)) / (2 * a),
      x2: -(-b - Math.sqrt(discriminant)) / (2 * a)
    };
  }

  getFirstIntersection(smallRadius: number, k: number, x: number, y: number) {
    return smallRadius * -k - y * -k + x;
  }

  getSecondIntersection(radius: number, ydot: number, xdot: number, a1y: number, a1x: number, ay: number, ax: number) {
    return (radius * radius / ydot + a1x * ay / ax - a1y) / (ay / ax + xdot / ydot);
  }

  getThirdIntersection(distance: number, y: number, x: number, radius: number) {
    return -distance * y / x + Math.pow(radius, 2) / x;
  }

  getSecondIntersectionValue(x: number, xdot: number, ydot: number, radius: number) {
    return -xdot / ydot * x + radius * radius / ydot;
  }
}
