let totalFrames = 120
let piece
let colors = []
let resolution = 100
function preload () {
  // piece = loadImage('assets/download.jpeg')
  piece = loadImage('assets/piece2.jpg')
}
function setup () {
  createCanvas(piece.width, piece.height)
  minSize = piece.width < piece.height ? piece.width : piece.height
  cellSize = minSize / resolution
  for (
    let cornerX = 0;
    cornerX + cellSize <= piece.width;
    cornerX += cellSize
  ) {
    for (
      let cornerY = 0;
      cornerY + cellSize <= piece.height;
      cornerY += cellSize
    ) {
      let subImage = piece.get(cornerX, cornerY, cellSize, cellSize)
      subImage.loadPixels()
      let r = 0
      let g = 0
      let b = 0
      let count = 0
      for (let i = 0; i < subImage.width; i++) {
        for (let j = 0; j < subImage.height; j++) {
          let index = (i + j * subImage.width) * 4
          index = floor(index)
          r += subImage.pixels[index]
          g += subImage.pixels[index + 1]
          b += subImage.pixels[index + 2]
          count++
        }
      }
      r /= count
      g /= count
      b /= count
      colors.push([r, g, b])
    }
  }
}
function draw () {
  background(0)
  let x = mouseX
  let y = mouseY
  let diagonal = sqDistance(0, 0, width, height)
  // image(piece, 0, 0)
  let reColor = []
  
      let percent = frameCount % totalFrames / totalFrames
      let angle = TWO_PI * percent
  for (
    let cornerX = 0;
    cornerX + cellSize <= piece.width;
    cornerX += cellSize
  ) {
    for (
      let cornerY = 0;
      cornerY + cellSize <= piece.height;
      cornerY += cellSize
    ) {
      c = colors.shift()
      push()
      noStroke()
      fill(c[0], c[1], c[2])
      // rect(cornerX, cornerY, cellSize, cellSize)
      let centreX = cornerX + cellSize
      let centreY = cornerY + cellSize / 2
      // let distance = sqDistance(centreX, centreY, x, y)
      // let sf = map(distance, 0, diagonal, 1, 5)
      let randomness = noise(centreX, centreY, 10 * Math.sin(angle))
      // let randomness = random(0, 1)
      let radius = cellSize * randomness /// sf
      ellipse(centreX, centreY, radius, radius, 2)
      pop()
      reColor.push(c)
    }
  }
  if(frameCount < totalFrames){
    saveFrames('output/gif-'+nf(frameCount, 3), 'jpg')
    console.log('frame='+frameCount)
    console.log('percent=',percent)
  }else if(frameCount == totalFrames){
    exit()
  }
  colors = reColor
}
function sqDistance (x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
}
