let offset;
let piece;
let resolution = 50;
function preload(){
    // piece = loadImage('assets/download.jpeg')
    piece = loadImage('assets/piece2.jpg')
}
function setup() {
    createCanvas(piece.width,piece.height);    
    minSize = (piece.width < piece.height) ? piece.width : piece.height
    cellSize = minSize / resolution
    offset = createSlider(-10, 10, 1, 1)
}

function draw() {
    background(255);
    // image(piece, 0, 0)
    for(let cornerX = 0; cornerX + cellSize <= piece.width; cornerX += cellSize){
        for(let cornerY = 0; cornerY + cellSize <= piece.height; cornerY += cellSize){
            let subImage = piece.get(cornerX, cornerY, cellSize, cellSize)
            subImage.loadPixels()
            let r = 0;
            let g = 0;
            let b = 0;
            let count = 0;
            for(let i = 0; i < subImage.width; i++){
                for(let j = 0; j < subImage.height; j++){
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
            push()
            noStroke()
            fill(r, g, b)
            // rect(cornerX, cornerY, cellSize, cellSize)
            ellipse(cornerX + cellSize / 2, cornerY + cellSize / 2, cellSize / random(1, 2), cellSize / random(1,2))
            pop()
        }
    }
}