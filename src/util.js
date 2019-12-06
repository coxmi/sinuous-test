

export const isFn = (fn = null) => fn && {}.toString.call(fn) === '[object Function]'
export const fn = (fn = null) => isFn(fn) ? fn : function() {}