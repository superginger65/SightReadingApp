const KEY = 'C major';
const METER = '3-8';

// Each entry corresponds to one measure (1-16).
// 'folder' is the subfolder name under images/C major/3-8/
// 'images' lists the valid numbered image files in that folder.
const MEASURE_MAP = [
  { folder: 'Measure 1',                    images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 2, 7,8, 15',           images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 3,4,11, 12',           images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 3,4,11, 12',           images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 5, 13 (Break Points)', images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 6, 14',                images: [1,2,3,5,6,7,8,9,10,11,12,13,14,15] },
  { folder: 'Measure 2, 7,8, 15',           images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 2, 7,8, 15',           images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 9 (break Point)',       images: [1,2,3,4,5,6,7] },
  { folder: 'Measure 10',                   images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 3,4,11, 12',           images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 3,4,11, 12',           images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 5, 13 (Break Points)', images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 6, 14',                images: [1,2,3,5,6,7,8,9,10,11,12,13,14,15] },
  { folder: 'Measure 2, 7,8, 15',           images: [1,2,3,4,5,6,7,8,9] },
  { folder: 'Measure 16',                   images: [1,2,3] },
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateActivity() {
  const rows = [
    document.getElementById('row1'),
    document.getElementById('row2'),
    document.getElementById('row3'),
    document.getElementById('row4'),
  ];

  rows.forEach(row => row.innerHTML = '');

  MEASURE_MAP.forEach(({ folder, images }, index) => {
    const rowIndex = Math.floor(index / 4);
    const imageNum = getRandom(images);
    const src = `images/${KEY}/${METER}/${folder}/${imageNum}.jpg`;

    const img = document.createElement('img');
    img.src = src;
    rows[rowIndex].appendChild(img);
  });
}
