export interface BioTacticalRallyFrame {
  frame: number;
  t: number;
  lineSupport: number;
  rmsePx: number;
  near: [number, number];
  far: [number, number];
  ball: [number, number] | null;
  recoveryTarget: [number, number];
}

export const BIO_TACTICAL_COURT_DIMS = { widthM: 10.97, lengthM: 23.77 } as const;

/** Real 60fps monocular homography rally sample (frames 0–470, CC0 match clip). */
export const BIO_TACTICAL_RALLY_FRAMES: BioTacticalRallyFrame[] = [
  {
    "frame": 0,
    "t": 0,
    "lineSupport": 0.84,
    "rmsePx": 3.5,
    "near": [
      1.27,
      24.97
    ],
    "far": [
      7.74,
      -4.73
    ],
    "ball": [
      0.08,
      28
    ],
    "recoveryTarget": [
      4.3,
      24.4
    ]
  },
  {
    "frame": 10,
    "t": 0.17,
    "lineSupport": 0.85,
    "rmsePx": 3.4,
    "near": [
      1.27,
      24.97
    ],
    "far": [
      7.74,
      -4.73
    ],
    "ball": [
      3.93,
      28
    ],
    "recoveryTarget": [
      5.14,
      24.4
    ]
  },
  {
    "frame": 20,
    "t": 0.33,
    "lineSupport": 0.85,
    "rmsePx": 3.5,
    "near": [
      1.4,
      24.73
    ],
    "far": [
      7.4,
      -2.11
    ],
    "ball": [
      9.02,
      28
    ],
    "recoveryTarget": [
      6.26,
      24.4
    ]
  },
  {
    "frame": 30,
    "t": 0.5,
    "lineSupport": 0.83,
    "rmsePx": 3.5,
    "near": [
      1.53,
      24.68
    ],
    "far": [
      7.35,
      -3.17
    ],
    "ball": [
      -1.27,
      -4
    ],
    "recoveryTarget": [
      4,
      24.4
    ]
  },
  {
    "frame": 40,
    "t": 0.67,
    "lineSupport": 0.84,
    "rmsePx": 3.5,
    "near": [
      1.8,
      24.71
    ],
    "far": [
      7.21,
      -1.7
    ],
    "ball": [
      2.41,
      11.64
    ],
    "recoveryTarget": [
      4.81,
      24.4
    ]
  },
  {
    "frame": 50,
    "t": 0.83,
    "lineSupport": 0.84,
    "rmsePx": 3.5,
    "near": [
      2.39,
      24.75
    ],
    "far": [
      7.12,
      -0.22
    ],
    "ball": [
      1.43,
      13.18
    ],
    "recoveryTarget": [
      4.59,
      24.4
    ]
  },
  {
    "frame": 60,
    "t": 1,
    "lineSupport": 0.85,
    "rmsePx": 3.4,
    "near": [
      2.45,
      24.61
    ],
    "far": [
      7.11,
      0.28
    ],
    "ball": [
      -2,
      6.64
    ],
    "recoveryTarget": [
      3.84,
      24.4
    ]
  },
  {
    "frame": 70,
    "t": 1.17,
    "lineSupport": 0.85,
    "rmsePx": 3.4,
    "near": [
      2.5,
      24.61
    ],
    "far": [
      7.33,
      -2.57
    ],
    "ball": [
      -2,
      5.88
    ],
    "recoveryTarget": [
      3.84,
      24.4
    ]
  },
  {
    "frame": 80,
    "t": 1.33,
    "lineSupport": 0.85,
    "rmsePx": 3.3,
    "near": [
      2.84,
      24.7
    ],
    "far": [
      7.43,
      -2.07
    ],
    "ball": null,
    "recoveryTarget": [
      5.48,
      24.4
    ]
  },
  {
    "frame": 90,
    "t": 1.5,
    "lineSupport": 0.83,
    "rmsePx": 3.5,
    "near": [
      3.25,
      24.79
    ],
    "far": [
      7.52,
      -0.57
    ],
    "ball": [
      -2,
      -4
    ],
    "recoveryTarget": [
      3.84,
      24.4
    ]
  },
  {
    "frame": 100,
    "t": 1.67,
    "lineSupport": 0.85,
    "rmsePx": 3.4,
    "near": [
      3.34,
      24.76
    ],
    "far": [
      7.76,
      -0.53
    ],
    "ball": [
      -2,
      -4
    ],
    "recoveryTarget": [
      3.84,
      24.4
    ]
  },
  {
    "frame": 110,
    "t": 1.83,
    "lineSupport": 0.83,
    "rmsePx": 3.6,
    "near": [
      3.47,
      24.88
    ],
    "far": [
      7.97,
      -0.37
    ],
    "ball": [
      4.3,
      -4
    ],
    "recoveryTarget": [
      5.22,
      24.4
    ]
  },
  {
    "frame": 120,
    "t": 2,
    "lineSupport": 0.84,
    "rmsePx": 3.4,
    "near": [
      3.51,
      24.76
    ],
    "far": [
      8.39,
      -0.25
    ],
    "ball": [
      8.2,
      -4
    ],
    "recoveryTarget": [
      6.08,
      24.4
    ]
  },
  {
    "frame": 130,
    "t": 2.17,
    "lineSupport": 0.83,
    "rmsePx": 3.4,
    "near": [
      3.74,
      24.88
    ],
    "far": [
      8.51,
      0.5
    ],
    "ball": null,
    "recoveryTarget": [
      5.48,
      24.4
    ]
  },
  {
    "frame": 140,
    "t": 2.33,
    "lineSupport": 0.83,
    "rmsePx": 3.5,
    "near": [
      3.91,
      24.92
    ],
    "far": [
      9.27,
      -2.44
    ],
    "ball": [
      8.49,
      -4
    ],
    "recoveryTarget": [
      6.15,
      24.4
    ]
  },
  {
    "frame": 150,
    "t": 2.5,
    "lineSupport": 0.82,
    "rmsePx": 3.7,
    "near": [
      4.18,
      25.08
    ],
    "far": [
      9.56,
      -1.82
    ],
    "ball": [
      11.32,
      -4
    ],
    "recoveryTarget": [
      6.77,
      24.4
    ]
  },
  {
    "frame": 160,
    "t": 2.67,
    "lineSupport": 0.8,
    "rmsePx": 3.8,
    "near": [
      4.3,
      25.37
    ],
    "far": [
      9.8,
      -0.64
    ],
    "ball": [
      13,
      -4
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  },
  {
    "frame": 170,
    "t": 2.83,
    "lineSupport": 0.82,
    "rmsePx": 3.7,
    "near": [
      4.27,
      25.35
    ],
    "far": [
      11.2,
      -5.94
    ],
    "ball": [
      13,
      -4
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  },
  {
    "frame": 180,
    "t": 3,
    "lineSupport": 0.84,
    "rmsePx": 3.6,
    "near": [
      4.16,
      25.42
    ],
    "far": [
      10.96,
      -0.79
    ],
    "ball": [
      -2,
      28
    ],
    "recoveryTarget": [
      3.84,
      24.4
    ]
  },
  {
    "frame": 190,
    "t": 3.17,
    "lineSupport": 0.83,
    "rmsePx": 3.7,
    "near": [
      4.16,
      25.42
    ],
    "far": [
      11.05,
      -0.77
    ],
    "ball": [
      2.46,
      28
    ],
    "recoveryTarget": [
      4.82,
      24.4
    ]
  },
  {
    "frame": 200,
    "t": 3.33,
    "lineSupport": 0.84,
    "rmsePx": 3.5,
    "near": [
      3.94,
      25.41
    ],
    "far": [
      11.05,
      -0.77
    ],
    "ball": [
      5.08,
      28
    ],
    "recoveryTarget": [
      5.4,
      24.4
    ]
  },
  {
    "frame": 210,
    "t": 3.5,
    "lineSupport": 0.83,
    "rmsePx": 3.6,
    "near": [
      3.94,
      25.41
    ],
    "far": [
      10.87,
      -1.48
    ],
    "ball": [
      13,
      28
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  },
  {
    "frame": 220,
    "t": 3.67,
    "lineSupport": 0.83,
    "rmsePx": 3.7,
    "near": [
      3.94,
      25.41
    ],
    "far": [
      10.75,
      -3.73
    ],
    "ball": [
      1.33,
      2.66
    ],
    "recoveryTarget": [
      4.57,
      24.4
    ]
  },
  {
    "frame": 230,
    "t": 3.83,
    "lineSupport": 0.84,
    "rmsePx": 3.6,
    "near": [
      3.94,
      25.41
    ],
    "far": [
      9.81,
      -1.37
    ],
    "ball": [
      2.98,
      20.64
    ],
    "recoveryTarget": [
      4.93,
      24.4
    ]
  },
  {
    "frame": 240,
    "t": 4,
    "lineSupport": 0.85,
    "rmsePx": 3.5,
    "near": [
      3.48,
      25.35
    ],
    "far": [
      9.01,
      -0.86
    ],
    "ball": null,
    "recoveryTarget": [
      5.48,
      24.4
    ]
  },
  {
    "frame": 250,
    "t": 4.17,
    "lineSupport": 0.84,
    "rmsePx": 3.7,
    "near": [
      3.46,
      25.11
    ],
    "far": [
      8.92,
      -1.44
    ],
    "ball": null,
    "recoveryTarget": [
      5.48,
      24.4
    ]
  },
  {
    "frame": 260,
    "t": 4.33,
    "lineSupport": 0.81,
    "rmsePx": 3.7,
    "near": [
      3.64,
      24.81
    ],
    "far": [
      8.47,
      -1.15
    ],
    "ball": null,
    "recoveryTarget": [
      5.48,
      24.4
    ]
  },
  {
    "frame": 270,
    "t": 4.5,
    "lineSupport": 0.8,
    "rmsePx": 3.8,
    "near": [
      3.55,
      24.74
    ],
    "far": [
      8.12,
      -3.54
    ],
    "ball": [
      13,
      28
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  },
  {
    "frame": 280,
    "t": 4.67,
    "lineSupport": 0.83,
    "rmsePx": 3.6,
    "near": [
      3.5,
      24.93
    ],
    "far": [
      7.84,
      -1.1
    ],
    "ball": [
      13,
      28
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  },
  {
    "frame": 290,
    "t": 4.83,
    "lineSupport": 0.83,
    "rmsePx": 3.6,
    "near": [
      3.44,
      25.03
    ],
    "far": [
      6.83,
      -1.74
    ],
    "ball": [
      -2,
      -4
    ],
    "recoveryTarget": [
      3.84,
      24.4
    ]
  },
  {
    "frame": 300,
    "t": 5,
    "lineSupport": 0.85,
    "rmsePx": 3.4,
    "near": [
      3.52,
      25.03
    ],
    "far": [
      6.01,
      -5.87
    ],
    "ball": [
      -2,
      -4
    ],
    "recoveryTarget": [
      3.84,
      24.4
    ]
  },
  {
    "frame": 310,
    "t": 5.17,
    "lineSupport": 0.84,
    "rmsePx": 3.4,
    "near": [
      3.65,
      25.07
    ],
    "far": [
      5.08,
      -0.6
    ],
    "ball": [
      0.86,
      0.15
    ],
    "recoveryTarget": [
      4.47,
      24.4
    ]
  },
  {
    "frame": 320,
    "t": 5.33,
    "lineSupport": 0.83,
    "rmsePx": 3.7,
    "near": [
      4.17,
      24.96
    ],
    "far": [
      5.08,
      -0.6
    ],
    "ball": [
      -2,
      -4
    ],
    "recoveryTarget": [
      3.84,
      24.4
    ]
  },
  {
    "frame": 330,
    "t": 5.5,
    "lineSupport": 0.79,
    "rmsePx": 4,
    "near": [
      4.52,
      25.14
    ],
    "far": [
      2.83,
      -5.51
    ],
    "ball": null,
    "recoveryTarget": [
      5.48,
      24.4
    ]
  },
  {
    "frame": 340,
    "t": 5.67,
    "lineSupport": 0.78,
    "rmsePx": 4.4,
    "near": [
      4.67,
      25.11
    ],
    "far": [
      2.83,
      -5.51
    ],
    "ball": null,
    "recoveryTarget": [
      5.48,
      24.4
    ]
  },
  {
    "frame": 350,
    "t": 5.83,
    "lineSupport": 0.79,
    "rmsePx": 4.4,
    "near": [
      5.05,
      25.03
    ],
    "far": [
      2.83,
      -5.51
    ],
    "ball": [
      13,
      28
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  },
  {
    "frame": 360,
    "t": 6,
    "lineSupport": 0.77,
    "rmsePx": 4.4,
    "near": [
      5.18,
      24.94
    ],
    "far": [
      0.16,
      -4.94
    ],
    "ball": [
      8.89,
      28
    ],
    "recoveryTarget": [
      6.23,
      24.4
    ]
  },
  {
    "frame": 370,
    "t": 6.17,
    "lineSupport": 0.81,
    "rmsePx": 3.8,
    "near": [
      5.39,
      24.85
    ],
    "far": [
      0.16,
      -4.94
    ],
    "ball": [
      5.55,
      28
    ],
    "recoveryTarget": [
      5.5,
      24.4
    ]
  },
  {
    "frame": 380,
    "t": 6.33,
    "lineSupport": 0.81,
    "rmsePx": 3.7,
    "near": [
      6.2,
      24.75
    ],
    "far": [
      0.16,
      -4.94
    ],
    "ball": [
      13,
      -4
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  },
  {
    "frame": 390,
    "t": 6.5,
    "lineSupport": 0.83,
    "rmsePx": 3.6,
    "near": [
      7.18,
      24.25
    ],
    "far": [
      0.16,
      -4.94
    ],
    "ball": [
      9.15,
      5.05
    ],
    "recoveryTarget": [
      6.29,
      24.4
    ]
  },
  {
    "frame": 400,
    "t": 6.67,
    "lineSupport": 0.83,
    "rmsePx": 3.5,
    "near": [
      7.56,
      24.21
    ],
    "far": [
      0.16,
      -4.94
    ],
    "ball": [
      9.14,
      14.74
    ],
    "recoveryTarget": [
      6.29,
      24.4
    ]
  },
  {
    "frame": 410,
    "t": 6.83,
    "lineSupport": 0.84,
    "rmsePx": 3.4,
    "near": [
      8.21,
      23.85
    ],
    "far": [
      0.16,
      -4.94
    ],
    "ball": [
      13,
      4.86
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  },
  {
    "frame": 420,
    "t": 7,
    "lineSupport": 0.85,
    "rmsePx": 3.4,
    "near": [
      8.6,
      23.81
    ],
    "far": [
      0.89,
      -3.96
    ],
    "ball": [
      13,
      -4
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  },
  {
    "frame": 430,
    "t": 7.17,
    "lineSupport": 0.86,
    "rmsePx": 3.3,
    "near": [
      8.81,
      23.75
    ],
    "far": [
      1.28,
      -3.53
    ],
    "ball": null,
    "recoveryTarget": [
      5.48,
      24.4
    ]
  },
  {
    "frame": 440,
    "t": 7.33,
    "lineSupport": 0.88,
    "rmsePx": 3.1,
    "near": [
      8.84,
      23.47
    ],
    "far": [
      1.99,
      -4.55
    ],
    "ball": [
      -2,
      28
    ],
    "recoveryTarget": [
      3.84,
      24.4
    ]
  },
  {
    "frame": 450,
    "t": 7.5,
    "lineSupport": 0.86,
    "rmsePx": 3.3,
    "near": [
      9.18,
      23.27
    ],
    "far": [
      2.82,
      -2.15
    ],
    "ball": [
      -0.46,
      28
    ],
    "recoveryTarget": [
      4.18,
      24.4
    ]
  },
  {
    "frame": 460,
    "t": 7.67,
    "lineSupport": 0.86,
    "rmsePx": 3.2,
    "near": [
      9.15,
      23.45
    ],
    "far": [
      2.87,
      -1.84
    ],
    "ball": [
      4.41,
      28
    ],
    "recoveryTarget": [
      5.25,
      24.4
    ]
  },
  {
    "frame": 470,
    "t": 7.83,
    "lineSupport": 0.88,
    "rmsePx": 3.1,
    "near": [
      9.2,
      23.42
    ],
    "far": [
      2.46,
      -2.87
    ],
    "ball": [
      13,
      28
    ],
    "recoveryTarget": [
      7.14,
      24.4
    ]
  }
];
