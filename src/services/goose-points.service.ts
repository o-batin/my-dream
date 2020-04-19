import {Injectable} from '@angular/core';
import {Point} from "./drawer.service";

@Injectable({
  providedIn: 'root'
})
export class GoosePointsService {
  points: Point[] = [
    {x: 549, y: 643},
    {x: 541, y: 616},
    {x: 537, y: 592},
    {x: 519, y: 564},

    {x: 519, y: 564},
    {x: 488, y: 514},
    {x: 465, y: 491},
    {x: 433, y: 462},

    {x: 433, y: 462},
    {x: 410, y: 442},
    {x: 391, y: 424},
    {x: 383, y: 407},

    {x: 383, y: 407},
    {x: 377, y: 396},
    {x: 374, y: 387},
    {x: 373, y: 385},

    {x: 373, y: 385},
    {x: 367, y: 383},
    {x: 362, y: 381},
    {x: 353, y: 381},

    {x: 353, y: 381},
    {x: 350, y: 381},
    {x: 351, y: 377},
    {x: 354, y: 375},

    {x: 354, y: 375},
    {x: 357, y: 374},
    {x: 362, y: 374},
    {x: 372, y: 369},

    {x: 372, y: 369},
    {x: 389, y: 369},
    {x: 400, y: 369},
    {x: 409, y: 369},

    {x: 409, y: 369},
    {x: 431, y: 370},
    {x: 443, y: 369},
    {x: 452, y: 367},

    {x: 452, y: 367},
    {x: 458, y: 368},
    {x: 468, y: 373},
    {x: 482, y: 379},

    {x: 482, y: 379},
    {x: 491, y: 382},
    {x: 498, y: 383},
    {x: 508, y: 388},

    {x: 508, y: 388},
    {x: 520, y: 391},
    {x: 529, y: 392},
    {x: 541, y: 398},

    {x: 541, y: 398},
    {x: 557, y: 402},
    {x: 568, y: 404},
    {x: 577, y: 406},

    {x: 577, y: 406},
    {x: 585, y: 409},
    {x: 595, y: 410},
    {x: 600, y: 410},

    {x: 600, y: 410},
    {x: 609, y: 412},
    {x: 623, y: 411},
    {x: 633, y: 412},

    {x: 633, y: 412},
    {x: 639, y: 413},
    {x: 654, y: 411},
    {x: 670, y: 410},

    {x: 670, y: 410},
    {x: 678, y: 407},
    {x: 693, y: 401},
    {x: 699, y: 394},

    {x: 699, y: 394},
    {x: 704, y: 393},
    {x: 703, y: 389},
    {x: 699, y: 384},

    {x: 699, y: 384},
    {x: 693, y: 380},
    {x: 683, y: 373},
    {x: 672, y: 366},

    {x: 672, y: 366},
    {x: 661, y: 363},
    {x: 637, y: 357},
    {x: 625, y: 356},

    {x: 625, y: 356},
    {x: 607, y: 354},
    {x: 595, y: 354},
    {x: 590, y: 352},

    {x: 590, y: 352},
    {x: 584, y: 348},
    {x: 573, y: 339},
    {x: 564, y: 332},

    {x: 564, y: 332},
    {x: 550, y: 324},
    {x: 538, y: 315},
    {x: 526, y: 306},

    {x: 526, y: 306},
    {x: 516, y: 297},
    {x: 510, y: 294},
    {x: 509, y: 289},

    {x: 509, y: 289},
    {x: 504, y: 291},
    {x: 498, y: 297},
    {x: 492, y: 303},

    {x: 492, y: 303},
    {x: 489, y: 305},
    {x: 485, y: 307},
    {x: 481, y: 311},

    {x: 481, y: 311},
    {x: 481, y: 322},
    {x: 481, y: 326},
    {x: 471, y: 334},

    {x: 471, y: 334},
    {x: 467, y: 341},
    {x: 460, y: 346},
    {x: 456, y: 353},

    {x: 456, y: 353},
    {x: 456, y: 359},
    {x: 456, y: 364},
    {x: 455, y: 366},

    {x: 455, y: 366},
    {x: 455, y: 356},
    {x: 457, y: 351},
    {x: 462, y: 346},

    {x: 462, y: 346},
    {x: 467, y: 341},
    {x: 474, y: 332},
    {x: 479, y: 327},

    {x: 479, y: 327},
    {x: 480, y: 322},
    {x: 480, y: 315},
    {x: 480, y: 311},

    {x: 480, y: 311},
    {x: 477, y: 309},
    {x: 469, y: 305},
    {x: 460, y: 298},

    {x: 460, y: 298},
    {x: 448, y: 293},
    {x: 441, y: 290},
    {x: 433, y: 285},

    {x: 433, y: 285},
    {x: 427, y: 284},
    {x: 421, y: 282},
    {x: 415, y: 281},

    {x: 415, y: 281},
    {x: 411, y: 279},
    {x: 408, y: 273},
    {x: 407, y: 267},

    {x: 407, y: 267},
    {x: 407, y: 264},
    {x: 402, y: 259},
    {x: 400, y: 257},

    {x: 400, y: 257},
    {x: 392, y: 251},
    {x: 388, y: 249},
    {x: 382, y: 244},

    {x: 382, y: 244},
    {x: 374, y: 242},
    {x: 366, y: 239},
    {x: 358, y: 239},

    {x: 358, y: 239},
    {x: 350, y: 240},
    {x: 347, y: 241},
    {x: 352, y: 243},

    {x: 352, y: 243},
    {x: 355, y: 249},
    {x: 356, y: 253},
    {x: 356, y: 258},

    {x: 356, y: 258},
    {x: 355, y: 265},
    {x: 353, y: 267},
    {x: 352, y: 270},

    {x: 352, y: 270},
    {x: 348, y: 268},
    {x: 342, y: 264},
    {x: 332, y: 262},

    {x: 332, y: 262},
    {x: 322, y: 258},
    {x: 312, y: 258},
    {x: 298, y: 257},

    {x: 298, y: 257},
    {x: 290, y: 257},
    {x: 278, y: 261},
    {x: 266, y: 268},

    {x: 266, y: 268},
    {x: 258, y: 275},
    {x: 248, y: 282},
    {x: 246, y: 285},

    {x: 246, y: 285},
    {x: 244, y: 288},
    {x: 242, y: 290},
    {x: 242, y: 291},

    {x: 242, y: 291},
    {x: 243, y: 289},
    {x: 248, y: 285},
    {x: 256, y: 276},

    {x: 256, y: 276},
    {x: 267, y: 268},
    {x: 279, y: 263},
    {x: 291, y: 258},

    {x: 291, y: 258},
    {x: 302, y: 257},
    {x: 310, y: 258},
    {x: 322, y: 259},

    {x: 322, y: 259},
    {x: 334, y: 263},
    {x: 346, y: 267},
    {x: 352, y: 270},

    {x: 352, y: 270},
    {x: 359, y: 272},
    {x: 361, y: 275},
    {x: 371, y: 280},

    {x: 371, y: 280},
    {x: 378, y: 282},
    {x: 380, y: 284},
    {x: 384, y: 284},

    {x: 384, y: 284},
    {x: 388, y: 284},
    {x: 389, y: 282},
    {x: 388, y: 280},

    {x: 388, y: 280},
    {x: 385, y: 279},
    {x: 383, y: 278},
    {x: 383, y: 274},

    {x: 383, y: 274},
    {x: 385, y: 271},
    {x: 386, y: 270},
    {x: 390, y: 269},

    {x: 390, y: 269},
    {x: 395, y: 266},
    {x: 398, y: 266},
    {x: 401, y: 264},

    {x: 401, y: 264},
    {x: 406, y: 264},
    {x: 408, y: 268},
    {x: 412, y: 274},

    {x: 412, y: 274},
    {x: 423, y: 278},
    {x: 427, y: 280},
    {x: 434, y: 283},

    {x: 434, y: 283},
    {x: 441, y: 286},
    {x: 445, y: 287},
    {x: 457, y: 293},

    {x: 457, y: 293},
    {x: 462, y: 296},
    {x: 469, y: 300},
    {x: 473, y: 302},

    {x: 473, y: 302},
    {x: 477, y: 304},
    {x: 478, y: 305},
    {x: 481, y: 306},

    {x: 481, y: 306},
    {x: 484, y: 307},
    {x: 488, y: 306},
    {x: 491, y: 303},

    {x: 491, y: 303},
    {x: 498, y: 296},
    {x: 502, y: 291},
    {x: 505, y: 290},

    {x: 505, y: 290},
    {x: 508, y: 289},
    {x: 508, y: 287},
    {x: 506, y: 284},

    {x: 506, y: 284},
    {x: 502, y: 277},
    {x: 502, y: 273},
    {x: 498, y: 266},

    {x: 498, y: 266},
    {x: 490, y: 251},
    {x: 483, y: 239},
    {x: 474, y: 228},

    {x: 474, y: 228},
    {x: 463, y: 219},
    {x: 455, y: 209},
    {x: 446, y: 204},

    {x: 446, y: 204},
    {x: 435, y: 195},
    {x: 413, y: 183},
    {x: 397, y: 176},

    {x: 397, y: 176},
    {x: 386, y: 172},
    {x: 376, y: 168},
    {x: 360, y: 165},

    {x: 360, y: 165},
    {x: 340, y: 163},
    {x: 326, y: 165},
    {x: 295, y: 173},

    {x: 295, y: 173},
    {x: 281, y: 186},
    {x: 245, y: 213},
    {x: 225, y: 243},

    {x: 225, y: 243},
    {x: 218, y: 254},
    {x: 209, y: 272},
    {x: 194, y: 310},

    {x: 194, y: 310},
    {x: 181, y: 351},
    {x: 181, y: 364},
    {x: 181, y: 377},

    {x: 181, y: 377},
    {x: 181, y: 389},
    {x: 181, y: 408},
    {x: 185, y: 431},

    {x: 185, y: 431},
    {x: 187, y: 440},
    {x: 187, y: 444},
    {x: 186, y: 444},

    {x: 186, y: 444},
    {x: 180, y: 444},
    {x: 166, y: 442},
    {x: 153, y: 439},

    {x: 153, y: 439},
    {x: 143, y: 436},
    {x: 126, y: 434},
    {x: 111, y: 434},

    {x: 111, y: 434},
    {x: 98, y: 432},
    {x: 90, y: 432},
    {x: 86, y: 431},

    {x: 86, y: 431},
    {x: 96, y: 434},
    {x: 120, y: 437},
    {x: 130, y: 436},

    {x: 130, y: 436},
    {x: 142, y: 438},
    {x: 152, y: 439},
    {x: 168, y: 443},

    {x: 168, y: 443},
    {x: 179, y: 445},
    {x: 188, y: 448},
    {x: 188, y: 445},

    {x: 188, y: 445},
    {x: 189, y: 448},
    {x: 193, y: 455},
    {x: 199, y: 467},

    {x: 199, y: 467},
    {x: 207, y: 480},
    {x: 214, y: 492},
    {x: 218, y: 502},

    {x: 218, y: 502},
    {x: 226, y: 511},
    {x: 230, y: 515},
    {x: 236, y: 522},

    {x: 236, y: 522},
    {x: 240, y: 528},
    {x: 247, y: 534},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},

    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
    {x: 250, y: 538},
  ];

  constructor() {
  }

}
