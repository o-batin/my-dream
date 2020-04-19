import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GridService} from "../../services/grid.service";
import {DrawerService, Point} from "../../services/drawer.service";
import {EuclidService} from "../../services/euclid.service";
import {AffineService} from "../../services/affine.service";
import {ProjectiveService} from "../../services/projective.service";

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html',
  styleUrls: ['./lab1.component.scss']
})
export class Lab1Component implements OnInit, AfterViewInit {

  parametersForm: FormGroup;

  @ViewChild('canvasElement', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(
    private gridService: GridService,
    private fb: FormBuilder,
    private drawerService: DrawerService,
    private euclidService: EuclidService,
    private affineService: AffineService,
    private projectiveService: ProjectiveService
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
      outerRectangleWidth: ['10'],
      rotationX: ['0'],
      rotationY: ['0'],
      angle: ['0'],
      transformX: ['0'],
      transformY: ['0'],
      e1: ['1, 0, 0'],
      e2: ['0, 1, 0']
    });
    this.parametersForm.valueChanges.subscribe(
      ({
         centerX, centerY, radiusInner,
         circleRectangleWidth, circleRectangleHeight,
         outerSmallCircleRadius, outerBigCircleRadius,
         outerRectangleWidth, rotationX, rotationY,
         angle, transformX, transformY, e1, e2
       }) => {
        centerX = +centerX;
        centerY = +centerY;
        radiusInner = +radiusInner;
        circleRectangleWidth = +circleRectangleWidth;
        circleRectangleHeight = +circleRectangleHeight;
        outerSmallCircleRadius = +outerSmallCircleRadius;
        outerBigCircleRadius = +outerBigCircleRadius;
        outerRectangleWidth = +outerRectangleWidth;
        rotationX = +rotationX;
        rotationY = +rotationY;
        angle = +angle;
        transformX = +transformX;
        transformY = +transformY;
        e1 = e1.split(',').map(val => +val);
        e2 = e2.split(',').map(val => +val);

        this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.gridService.drawGrid(this.canvas.nativeElement, this.ctx, e1, e2);

        // DETAIL
        const points: Point[] = [];
        this.ctx.beginPath();
        points.push({x: circleRectangleWidth, y: -radiusInner - circleRectangleHeight});
        const startCircleAngle = Math.acos(circleRectangleWidth / radiusInner) * 180 / Math.PI;
        const circlePoints = this.drawerService.createCircle(radiusInner, 90 - startCircleAngle, 90);
        points.push(...circlePoints);
        const innerDetailPoints = [];
        const innerDetailBreakpoints = [];

        innerDetailPoints.push({x: centerX, y: centerY - radiusInner - circleRectangleHeight});
        points.forEach(({x, y}) => innerDetailPoints.push({
          x: x + centerX, y: y + centerY
        }));
        innerDetailBreakpoints.push(innerDetailPoints.length);
        innerDetailPoints.push({x: centerX, y: centerY - radiusInner - circleRectangleHeight});
        points.forEach(({x, y}) => innerDetailPoints.push({
          x: -x + centerX, y: y + centerY
        }));
        innerDetailBreakpoints.push(innerDetailPoints.length);
        innerDetailPoints.push({x: centerX, y: centerY + radiusInner + circleRectangleHeight});
        points.forEach(({x, y}) => innerDetailPoints.push({
          x: x + centerX, y: -y + centerY
        }));
        innerDetailBreakpoints.push(innerDetailPoints.length)
        innerDetailPoints.push({x: centerX, y: centerY + radiusInner + circleRectangleHeight});
        points.forEach(({x, y}) => innerDetailPoints.push({
          x: -x + centerX, y: -y + centerY
        }));


        let euclidTransformationsInner = this.euclidService.euclidTransformations(innerDetailPoints, {
          x: rotationX + centerX,
          y: rotationY + centerY,
          angle: angle
        }, {x: transformX, y: transformY});

        if (e1.length === 3 && e2.length === 3) {
          euclidTransformationsInner = euclidTransformationsInner.map(point => {
            return this.affineService.transformation({e1: e1, e2: e2}, point)
          });
        } else if (e1.length === 4 && e2.length === 4) {
          euclidTransformationsInner = euclidTransformationsInner.map(point => {
            return this.projectiveService.transformation({e1: e1, e2: e2}, point)
          });
        }

        this.ctx.moveTo(euclidTransformationsInner[0].x, euclidTransformationsInner[0].y);
        euclidTransformationsInner.forEach((val, index) => {
          if (innerDetailBreakpoints.includes(index)) {
            this.ctx.moveTo(val.x, val.y);
          } else {
            this.ctx.lineTo(val.x, val.y);
          }
        });


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


        const outerDetailPoints = [];
        const outerDetailBreakpoints = [];
        outerDetailPoints.push({x: centerX, y: centerY - outerSmallCircleRadius});
        outerPoints.forEach(({x, y}) => outerDetailPoints.push({
          x: x + centerX, y: y + centerY
        }));
        outerDetailBreakpoints.push(outerDetailPoints.length);
        outerDetailPoints.push({x: centerX, y: centerY - outerSmallCircleRadius});
        outerPoints.forEach(({x, y}) => outerDetailPoints.push({
          x: -x + centerX, y: y + centerY
        }));
        outerDetailBreakpoints.push(outerDetailPoints.length);
        outerDetailPoints.push({x: centerX, y: centerY + outerSmallCircleRadius});
        outerPoints.forEach(({x, y}) => outerDetailPoints.push({
          x: x + centerX, y: -y + centerY
        }));
        outerDetailBreakpoints.push(outerDetailPoints.length);
        outerDetailPoints.push({x: centerX, y: centerY + outerSmallCircleRadius});
        outerPoints.forEach(({x, y}) => outerDetailPoints.push({
          x: -x + centerX, y: -y + centerY
        }));

        let euclidTransformationsOuter = this.euclidService.euclidTransformations(outerDetailPoints, {
          x: rotationX + centerX,
          y: rotationY + centerY,
          angle: angle
        }, {x: transformX, y: transformY});

        if (e1.length === 3 && e2.length === 3) {
          euclidTransformationsOuter = euclidTransformationsOuter.map(point => {
            return this.affineService.transformation({e1: e1, e2: e2}, point)
          });
        } else if (e1.length === 4 && e2.length === 4) {
          euclidTransformationsOuter = euclidTransformationsOuter.map(point => {
            return this.projectiveService.transformation({e1: e1, e2: e2}, point)
          });
        }

        this.ctx.moveTo(euclidTransformationsOuter[0].x, euclidTransformationsOuter[0].y);
        euclidTransformationsOuter.forEach((val, index) => {
          if (outerDetailBreakpoints.includes(index)) {
            this.ctx.moveTo(val.x, val.y);
          } else {
            this.ctx.lineTo(val.x, val.y);
          }
        });

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
