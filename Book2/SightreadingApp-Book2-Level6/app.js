// Each entry corresponds to one measure (1-8).
// Measures with 'part1'/'part2' display one image from each subfolder.
// Measures with 'images' display a single randomly chosen image.
const MEASURE_MAP = [
  {
    folder: 'Start',
    part1: ['A-A1-G1.jpg','A-A1.jpg','A-E1-A1.jpg','A-E1-E1.jpg','A-E1-G1.jpg','A-E1.jpg','A1-E1-A1.jpg'],
    part2: ['A1- B1.jpg','A1-B-C1.jpg','A1-E-A1.jpg','A1-E-B1.jpg','A1-G1-F1.jpg','B1-A1-G1.jpg','B1-G1-B1.jpg','B1-G1.jpg','E1-A-E1.jpg'],
  },
  {
    folder: 'Measure 2',
    images: ['A1-A1-B1.jpg','A1-A1-G1.jpg','A1-A1.jpg','A1-B1-C1.jpg','A1-C1.jpg','A1-D-E1.jpg','A1-D1-C1.jpg','A1-E1-C1.jpg','A1-F1-A1.jpg','C1-A1-B1.jpg','GS1-A1-B1.jpg'],
  },
  {
    folder: 'Measure 3',
    part1: ['B1-A1.jpg','B1-C1-B1.jpg','B1-C1-D1.jpg','B1-D-G1.jpg','B1-D1-C1.jpg','B1-G-A1.jpg','C1-D1-C1.jpg','D1-D1-C1.jpg'],
    part2: ['B1-A1-G1.jpg','B1-C1-B1.jpg','B1-C1-D1.jpg','B1-D1-C1.jpg','C1-B1-G1.jpg','C1-E1-D1.jpg','D1-B1-D1.jpg','D1-B1-G1.jpg','D1-C1-B1.jpg'],
  },
  {
    folder: 'Measure 4',
    images: ['A1-B1-C1.jpg','A1-C1-E2.jpg','A1-E-E2.jpg','A1-E1-C1.jpg','A1-E2-C1.jpg','A1-E2.jpg','A1-F2-E2.jpg'],
  },
  {
    folder: 'Break (m.5)',
    part1: ['B1-A1.jpg','B1-C1-B1.jpg','B1-C1-D1.jpg','B1-D-G1.jpg','B1-D1-C1.jpg','B1-G-A1.jpg','C1-D1-C1.jpg','D1-D1-C1.jpg'],
    part2: ['B1-A1-G1.jpg','B1-C1-B1.jpg','B1-C1-D1.jpg','B1-D1-C1.jpg','C1-B1-G1.jpg','C1-E1-D1.jpg','D1-B1-D1.jpg','D1-B1-G1.jpg','D1-C1-B1.jpg'],
  },
  {
    folder: 'Measure 6',
    part1: ['B1-C1-D1.jpg','C1-A1-B1.jpg','C1-C1-D1.jpg','C1-D1-B1.jpg','C1-D1-C1.jpg','C1-D1-E1.jpg','D1-E1-F1.jpg','E2-D1-C1.jpg'],
    part2: ['C1-D-C1.jpg','D1-C1-B1.jpg','D1-E2-F2.jpg','E2-F2-E2.jpg','F2-E2-D1.jpg','F2-F2.jpg','G2-F2-E2.jpg','G2-F2.jpg'],
  },
  {
    folder: 'Measure 7',
    images: ['A1-C1-A1.jpg','C1-B1-A1-B1-C1.jpg','C1-D1-E1.jpg','E.2-C1-A-.jpg','E2-A1-B-C1.jpg','E2-C1-A1.jpg','E2-D1-C-A1.jpg','E2-D1-C1-B1-A-.jpg'],
  },
  {
    folder: 'Measure 8',
    images: ['B.1`-G1-E1.jpg','B1-C1-D1-G1.jpg','B1`-G1-E1.jpg','D1-B1-A1-G1.jpg','D1-B1-G1.jpg','D1-G1-A1-B1.jpg','D1-G1-E1.jpg','E2-E1-G1.jpg'],
  },
  {
    folder: 'Final',
    images: ['1.jpg','2.jpg'],
  },
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateActivity() {
  const rows = [
    document.getElementById('row1'),
    document.getElementById('row2')
  ];

  rows.forEach(row => row.innerHTML = '');

  MEASURE_MAP.forEach(({ folder, images, part1, part2 }, index) => {
    const rowIndex = index < 4 ? 0 : 1;

    if (part1 && part2) {
      [[getRandom(part1), '1'], [getRandom(part2), '2']].forEach(([file, part]) => {
        const img = document.createElement('img');
        img.src = `images/${folder}/Part ${part}/${file}`;
        rows[rowIndex].appendChild(img);
      });
    } else {
      const img = document.createElement('img');
      img.src = `images/${folder}/${getRandom(images)}`;
      rows[rowIndex].appendChild(img);
    }
  });
}
