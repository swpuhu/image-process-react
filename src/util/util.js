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
    return r / Math.PI * 180;
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
            y1: (containerHeight - height) / 2,

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


function loadImages(srcs) {
    let promises = [];
    for (let src of srcs) {
        promises.push(loadImage);
    }

    return promises.all((images) => {
        return images;
    })

}

async function openFiles(store, files, actions) {
    let first = true;
    for (let i = 0; i < files.length; i++) {
        let state = store.getState();
        let file = files[i];
        let url = URL.createObjectURL(file);
        let image = await loadImage(url);
        URL.revokeObjectURL(url);
        store.dispatch(actions.addLayer());
        if (i === 0 && !state.init.width && !state.init.height) {
            let main = document.querySelector('.main');
            if (main) {
                let domWidth = main.offsetWidth - 50;
                let domHeight = main.offsetHeight - 50;
                let zoomX = domWidth / image.width;
                let zoomY = domHeight / image.height;
                store.dispatch(actions.init(image.width, image.height, clamp(Math.min(zoomX, zoomY), 0, 1)));
            }
            
        } 
        if (i === files.length - 1) {
            let state = store.getState();
            let uuid = state.layers[state.layers.length - 1].id;
            store.dispatch(actions.setCurrentLayer(uuid));
        }
    }
}


function uuid(len = 16, radix = 16) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

export default {
    getSingleton,
    generateStamp,
    deletePostfix,
    downloadBase64,
    loadImage,
    loadImages,
    r2d,
    d2r,
    throttle,
    debounce,
    deepCopy,
    autoAdaption,
    clamp,
    openFiles,
    uuid
}