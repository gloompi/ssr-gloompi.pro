import { Map, Record, OrderedMap } from 'immutable'

export function httpChanger(url){
  let httpsTest = /https/i
  if(httpsTest.test(url)) return url
  return url.replace(/http/i, 'https')
}

export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function arrToImmObj(arr, DataRec = Map, id = 'id'){
  return arr.reduce((acc, elem) => {
    return acc.set(elem[id], new DataRec(elem))
  }, new Map({}))
}

export function ObjToImmArr(obj){
  return obj.valueSeq().toArray()
}

export function arrToObj(arr){
  return arr.reduce((acc, elem) => {
    acc[elem.id] = elem
    return acc
  }, {})
}

export function ObjToArr(obj){
  return Object.keys(obj).map(id = obj[id])
}

export function createMarkup(content) {
  return {__html: content}
}

export function scrollIt(element, offset = 0) {
  window.scrollTo({
    'behavior': 'smooth',
    'left': 0,
    'top': element.offsetTop + offset
  })
}

export function splitBy3(numb) {
  const numbarr = []
  numb = numb + ''
  for(let i = numb.length; i > 0; i-=3){
    numbarr.push(numb.slice(i-3 <= 0 ? 0 : i-3 , i))
  }
  return numbarr.reverse().join(' ')
}

export const movingStars = (canvas, txtInfinity) => {
  const ctx = canvas.getContext('2d')
  const stars = []
  let dir = Math.PI
  let w
  let h
  let widthModulo
  let heightModulo
  let grad
  const starCount = 2000
  const starSize = 3
  const attractorSize = 100
  const starSize2 = starSize / 2
  const attractorSize2 = attractorSize / 2
  const scrollSpeed = 1
  const directionChangeRate = 1
  const pointer = { x : 0, y : 0}
  const randI = (min, max = min + (min = 0)) => (Math.random() * (max - min) + min) | 0
  const randG = (p) => Math.random() * Math.random() * Math.random()
  const ease = (v,p=2) => Math.pow(v < 0 ? 0 : v > 1 ? 1 : v, p);
  const doFor = (count, callback) => {let i = 0; while (i < count) { callback(i ++) } }
  pageResize()
  function pageResize(){
      w = canvas.width = innerWidth
      h = canvas.height = innerHeight
      widthModulo = w + starSize + attractorSize
      heightModulo = h + starSize + attractorSize
      let bounds = txtInfinity.getBoundingClientRect()
      pointer.x = w / 2
      pointer.y = h / 2
      txtInfinity.style.top = (((h - bounds.height) / 2) | 0) + 'px'
      txtInfinity.style.left = (((w - bounds.width) / 2) | 0) + 'px'
      grad = ctx.createLinearGradient(w,h,0,0)
      doFor(16,i=>{
        const c = ((i/15) * 32) | 0
        grad.addColorStop(ease(i/15,1/4),'rgb(0,0,'+c+')')  
      })  
      grad.addColorStop(0,'#020202')
      grad.addColorStop(1,'#000')
  }

  for (let i = 0; i < starCount; i++) {
    const z = randG()
    //z = Math.abs(z-0.5) * 2
    const col = Math.min(255,((200 * z)|0 )+ 60)
    stars.push({
      x: randI(w * 1000),
      y: randI(h * 1000),
      v: z  + 0.5,
      col : 'rgb('+col+','+col+','+col+')',
    })
  }
  stars.sort((a,b)=>a.v - b.v)  // sort from back to front

  function animation (timer) {
    let star, dx, dy, x, y, i, xx, yy, d
    if(w !== innerWidth || h !== innerHeight){
      pageResize() 
    }

    // set the direction to make stars move in long circles
    dir = Math.sin((timer / 13289) * directionChangeRate ) * Math.PI  

    //clears background
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'

    // get direction vector
    dx = Math.cos(dir) * scrollSpeed
    dy = Math.sin(dir) * scrollSpeed
    for (let i = 0; i < starCount; i += 1) {
      star = stars[i]
      ctx.fillStyle = star.col
      // move the star
      star.x += star.v * dx
      star.y += star.v * dy
      // make sure that stars are rendered on the current viewport
      x = ((star.x % widthModulo) + widthModulo) % widthModulo - (starSize2 + attractorSize2)
      y = ((star.y % heightModulo) + heightModulo) % heightModulo - (starSize2 + attractorSize2)
      xx = pointer.x - x
      yy = pointer.y - y
      d = Math.sqrt(xx * xx + yy * yy)
      x -= (xx / d) * attractorSize2 * star.v
      y -= (yy / d) * attractorSize2 *  star.v
      // draw the star
      ctx.fillRect(x, y, starSize * star.v, starSize * star.v)
    }
    ctx.globalCompositeOperation = 'source-over'
    requestAnimationFrame(animation)
  }
  requestAnimationFrame(animation)
}