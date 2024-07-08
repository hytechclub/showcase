const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentX = 0;
let currentY = 0;
let color = 'black';
let brushSize = 5;
let isBucket = false;
let bucketInUse = false;

class PixelNeighbor
  {
    constructor(x, y)
    {
      this.x = x;
      this.y = y;
    }
  }

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
  bucketInUse = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('click', (e) => {
  if (isBucket)
  {
  fillBucket(e.offsetX,e.offsetY,color);
  }
});
canvas.addEventListener('mouseup', () => isDrawing = false, bucketInUse = false);
canvas.addEventListener('mouseout', () => isDrawing = false, bucketInUse = false);

function draw(e) {
  currentX = e.offsetX;
  currentY = e.offsetY;
    /*if (isBucket && isDrawing)
    {
      //console.log("AAA")
      fillBucket(e.offsetX, e.offsetY, color);
    }*/
  if (!isDrawing)
  {
    bucketInUse = false;
  }
  //console.log(bucketInUse)
    if (!isDrawing || isBucket) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function setBucket()
{
  isBucket = true;
}

function changeColor(newColor) {
    document.getElementById(color).style.border = 'none';
    color = newColor;
  document.getElementById(color).style.border = 'double';
}

function changeBrushSize(newSize) {
  isBucket = false;
    brushSize = newSize;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function exists(arr, search) {
    return arr.some(row => row.includes(search));
}

function fillBucket(x, y, newColor) {
  
  bucketInUse = true;
    let canvas = document.getElementById('canvas');
    //let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let width = canvas.width;
    let height = canvas.height;
  //console.log(x,y, width, height
    let neighborMap = [];
    let newNeighborMap = []
  let blankMap = [];
  for (let i = 0; i < width; i++) {
    neighborMap[i] = [];
    newNeighborMap[i] = [];
    blankMap[i] = [];
    for (let j = 0; j < height; j++) {
      neighborMap[i][j] = 0;
      newNeighborMap[i][j] = 0;
      blankMap[i][j] = 0;
    }
  }
  let aliveNeighbors = [new PixelNeighbor(x, y)];
  let newNeighbors = [];
  ctx.fillStyle = newColor;
  for(let thread = 0; thread < 10; thread++)
    {
  for (let i = 0; i < aliveNeighbors.length; i++)
    {
      let currentNeighborColor = getImageColor(aliveNeighbors[i].x, aliveNeighbors[i].y, width, imageData);
      
      if (aliveNeighbors[i].y > 0)
      {
        let neighborNorth = getImageColor(aliveNeighbors[i].x, aliveNeighbors[i].y-1, width, imageData);
        
        if (compareColors(currentNeighborColor,neighborNorth))
        {
          //console.log("Bob's my friend :)")
            newNeighbors.push(new PixelNeighbor(aliveNeighbors[i].x, aliveNeighbors[i].y-1));
          
        }
      }
      if (aliveNeighbors[i].y < height)
      {
        let neighborSouth = getImageColor(aliveNeighbors[i].x, aliveNeighbors[i].y+1, width, imageData);
        if (compareColors(currentNeighborColor,neighborSouth))
        {
            newNeighbors.push(new PixelNeighbor(aliveNeighbors[i].x, aliveNeighbors[i].y+1));
        }
      }
      if (aliveNeighbors[i].x > 0)
      {
        let neighborWest = getImageColor(aliveNeighbors[i].x-1, aliveNeighbors[i].y, width, imageData);
        if (compareColors(currentNeighborColor,neighborWest))
        {
            newNeighbors.push(new PixelNeighbor(aliveNeighbors[i].x-1, aliveNeighbors[i].y));
        }
      }
      if (aliveNeighbors[i].x < width)
      {
        let neighborEast = getImageColor(aliveNeighbors[i].x+1, aliveNeighbors[i].y, width, imageData);
        if (compareColors(currentNeighborColor,neighborEast))
        {
            newNeighbors.push(new PixelNeighbor(aliveNeighbors[i].x+1, aliveNeighbors[i].y));
        }
      }
      ctx.fillRect(aliveNeighbors[i].x,aliveNeighbors[i].y,1,1);
      
      aliveNeighbors = [...newNeighbors];
      ctx.fillRect(aliveNeighbors[i].x,aliveNeighbors[i].y,1,1);
      newNeighbors = [];
      console.log(newNeighbors)
    }
    }
    const originalColor = getImageColor(x, y, width, imageData);
    if (originalColor === newColor) {
        return;
    }
  
  neighborMap[x][y] = 1;
 // console.log(exists(neighborMap,1))
  //console.log(getImageColor(x, y-1, width, imageData));

  //FAILED ALGORITHM PROTOTYPE USE NEW ONE ABOVE
    /*for (let thread = 0; thread < 30; thread++)
    {
      //console.log("Aea")
      for(let i = 0; i < width; i++)
        {
          for (let j = 0; j < height; j++)
            {
              
              if (neighborMap[i][j] === 1)
              {
                ctx.fillStyle = newColor;
                ctx.fillRect(i, j, 1, 1);
                //console.log("test")
                if (j > 0)
                {
                  let originalColorNorth = getImageColor(i, j-1, width, imageData);
                  //console.log(originalColor,originalColorNorth)
                  if (compareColors(originalColor,originalColorNorth))
                  {
                    newNeighborMap[i][j-1] = 1;
                  }
                }
                if (j < height - 1)
                {
                  let originalColorSouth = getImageColor(i, j+1, width, imageData);
                  if (compareColors(originalColor,originalColorSouth))
                  {
                    newNeighborMap[i][j+1] = 1;
                  }
                }
                if (i > 0)
                {
                  let originalColorWest = getImageColor(i-1, j, width, imageData);
                  if (compareColors(originalColor, originalColorWest))
                  {
                    newNeighborMap[i-1][j] = 1;
                  }
                }
                if (i < width)
                {
                  let originalColorEast = getImageColor(i+1, j, width, imageData);
                  //console.log(originalColor,originalColorEast);
                  if (compareColors(originalColor,originalColorEast))
                  {
                    newNeighborMap[i+1][j] = 1;
                  }
                }
                
                
              }
              
              
            }
        }
      neighborMap = newNeighborMap.map(function(arr) {
        return arr.slice();
      });
      console.log(exists(neighborMap,1), exists(newNeighborMap,1))
      
      newNeighborMap = blankMap.map(function(arr) {
      return arr.slice();
      });
            
            // Count how many times 1 is mentioned on neighborMap
            let oneCount = neighborMap.reduce((total, row) => total + row.filter(item => item === 1).length, 0);
            console.log("Number of times '1' is mentioned on neighborMap: ", oneCount);
      }*/
  
        /*const position = stack.pop();
        const curColor = getImageColor(position.x, position.y, width, imageData);

        if (curColor === originalColor) {
            setColor(position.x, position.y, width, newColor, imageData);
            stack.push({x: position.x - 1, y: position.y});
            stack.push({x: position.x + 1, y: position.y});
            stack.push({x: position.x, y: position.y - 1});
            stack.push({x: position.x, y: position.y + 1});
        }
    }*/

    //ctx.putImageData(imageData, 0, 0);
}

function getImageColor(x, y, width, imageData) {
    const index = (y * width + x) * 4;
    return {
        red: imageData.data[index], 
        green: imageData.data[index + 1], 
        blue: imageData.data[index + 2], 
        alpha: imageData.data[index + 3]
    };
}

function setColor(x, y, width, color, imageData) {
    const index = (y * width + x) * 4;
    imageData.data[index] = color.red;
    imageData.data[index + 1] = color.green;
    imageData.data[index + 2] = color.blue;
    imageData.data[index + 3] = color.alpha;
}

function compareColors(col1,col2)
{
  return col1.red === col2.red && col1.green === col2.green && col1.blue === col2.blue && col1.alpha === col2.alpha;
}