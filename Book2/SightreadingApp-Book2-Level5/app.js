// Each entry corresponds to one measure (1-8).
// Measures 7 and 8 are the 1st and 2nd endings respectively.
// 'folder' is the subfolder name under images/
// 'images' lists the valid numbered image files in that folder.
const MEASURE_MAP = [
  { folder: 'Start',                        images: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { folder: 'Measure 2 and 5 (break point)', images: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { folder: 'Measure 3',                    images: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { folder: 'Measure 4',                    images: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { folder: 'Measure 2 and 5 (break point)', images: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { folder: 'Measure 6',                    images: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { folder: '1st ending',                   images: [1,2,3,4,5,6,7,8,9] },
  { folder: '2nd ending',                   images: [1] },
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateActivity() {
  const rows = [
    document.getElementById('row1'),
    document.getElementById('row2'),
  ];

  rows.forEach(row => row.innerHTML = '');

  MEASURE_MAP.forEach(({ folder, images }, index) => {
    const rowIndex = Math.floor(index / 4);
    const imageNum = getRandom(images);
    const src = `images/${folder}/${imageNum}.jpg`;

    const img = document.createElement('img');
    img.src = src;
    rows[rowIndex].appendChild(img);
  });
}
