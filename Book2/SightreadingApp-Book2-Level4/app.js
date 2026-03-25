let CURRENT_KEY = 'E blues';

// Each array has 8 entries (2 rows x 4 measures).
// 'folder' is the subfolder name under images/<key>/
// 'images' lists the valid numbered image files in that folder.
const MEASURE_MAPS = {
  'E blues': [
    { folder: 'Start',            images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 2 & 6',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 3 & 8',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 4 & 7',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 5 (break)', images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 2 & 6',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 4 & 7',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Final',           images: [1] },
  ],
  'E minor pop': [
    { folder: 'Start',            images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 2 & 7',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 3 & 6',   images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 4 & 8',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 5 (break)', images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 3 & 6',   images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 2 & 7',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Final',           images: [1] },
  ],
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function selectKey(key) {
  CURRENT_KEY = key;
}

function generateActivity() {
  const rows = [
    document.getElementById('row1'),
    document.getElementById('row2'),
  ];

  rows.forEach(row => row.innerHTML = '');

  MEASURE_MAPS[CURRENT_KEY].forEach(({ folder, images }, index) => {
    const rowIndex = Math.floor(index / 4);
    const imageNum = getRandom(images);
    const src = `images/${CURRENT_KEY}/${folder}/${imageNum}.jpg`;

    const img = document.createElement('img');
    img.src = src;
    rows[rowIndex].appendChild(img);
  });
}
