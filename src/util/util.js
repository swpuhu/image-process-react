function getSingleton(fn) {
    let ret;
    return function () {
        if (ret) {
            return ret;
        }
        return ret = new fn(arguments);
    }
}


const generateStamp = (function () {
    let canvas = document.createElement('canvas');
    let cacheWidth, cacheHeight;
    let context = canvas.getContext('2d');
    return function (image, width = 80, height = 50) {    
        if (width !== cacheWidth || height !== cacheHeight) {
            cacheWidth = width;
            cacheHeight = height;
            canvas.width = cacheWidth;
            canvas.height = cacheHeight;
        }
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        return canvas.toDataURL();

    }
}());


function deletePostfix(filename) {
    let arr = filename.split('.');
    return arr[0];
}


function downloadBase64(src, title) {
    let binStr = atob(src.split(',')[1]),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }

    let blob = new Blob([arr]);

    let a = document.createElement('a');
    a.download = title;
    a.href = URL.createObjectURL(blob);
    a.onclick = function () {
        requestAnimationFrame(function () {
            URL.revokeObjectURL(a.href);
        })
    }
    a.click();
}



function loadImage(src) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.src = src;
    })
}


/**
 * @description 弧度转角度
 * @param {number} r 弧度 
 */
function r2d(r) {
    return r  / Math.PI * 180;
}

/**
 * @description 角度转弧度
 * @param {number} d 角度
 */
function d2r(d) {
    return d * Math.PI / 180;
}


function throttle(fn, delay = 50) {
    let timer;
    return function () {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            clearTimeout(timer);
            timer = null;
        }, delay);
    }
}


function debounce(fn, delay = 50) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    }
}

function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

function deepCopy(obj) {
    let ret;
    if (isArray(obj)) {
        ret = [];
        for (let item of obj) {
            if (isArray(item) || isObject(item)) {
                ret.push(deepCopy(item));
            } else {
                ret.push(item);
            }
        }
    } else {
        ret = {};
        for (let key in obj) {
            if (isArray(obj[key]) || isObject(obj[key])) {
                ret[key] = deepCopy(obj[key]);
            } else {
                ret[key] = obj[key];
            }
        }
    }

    return ret;
}


function autoAdaption(width, height, containerWidth, containerHeight) {
    let aspect = width / height;
    let containerAspect = containerWidth / containerHeight;
    let style = {};
    if (width <= containerWidth && height <= containerHeight) {
        // No Adaptione: 
        style = {
            x1: (containerWidth - width) / 2,
            y1: (containerHeight - height ) / 2,        

            x2: (containerWidth + width) / 2,
            y2: (containerHeight - height) / 2,

            x3: (containerWidth + width) / 2,
            y3: (containerHeight + height) / 2,

            x4: (containerWidth - width) / 2,
            y4: (containerHeight + height) / 2,
            
            rotate: 0
        }
    } else if (aspect >= containerAspect) {
        // Horizontal Adaption
        style = {
            x1: 0,
            y1: (containerHeight - (containerWidth / aspect)) / 2,

            x2: containerWidth,
            y2: (containerHeight - (containerWidth / aspect)) / 2,

            x3: containerWidth,
            y3: (containerHeight + (containerWidth / aspect)) / 2,

            x4: 0,
            y4: (containerHeight + (containerWidth / aspect)) / 2,
            
            rotate: 0
        }

    } else {
        style = {
            x1: (containerWidth - (containerHeight * aspect)) / 2,
            y1: 0,

            x2: (containerWidth + (containerHeight * aspect)) / 2,
            y2: 0,

            x3: (containerWidth + (containerHeight * aspect)) / 2,
            y3: containerHeight,

            x4: (containerWidth - (containerHeight * aspect)) / 2,
            y4: containerHeight,
            rotate: 0
        }
    }
    return style;
    
}


function clamp(x, min, max) {
    if (x < min) {
        x = min;
    } else if (x > max) {
        x = max;
    }
    return x;
}


function openFiles(store, files, init) {
    let first = true;
    for (let file of files) {
        let url = URL.createObjectURL(file);
        let image = new Image();
        image.onload = function () {
            if (first) {
                let main = document.querySelector('.main');
                if (main) {
                    let domWidth = main.offsetWidth - 50;
                    let domHeight = main.offsetHeight - 50;
                    let zoomX = domWidth / image.width;
                    let zoomY = domHeight / image.height;
                    store.dispatch(init(image.width, image.height, clamp(Math.min(zoomX, zoomY), 0, 1)));
                    first = false;
                }
            }
            URL.revokeObjectURL(url);
        }
        image.src = url;
    }
}

export default {
    getSingleton,
    generateStamp,
    deletePostfix,
    downloadBase64,
    loadImage,
    r2d,
    d2r,
    throttle,
    debounce,
    deepCopy,
    autoAdaption,
    clamp,
    openFiles
}