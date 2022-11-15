const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        // Pass the clearTimeout() at first time, use clearTimeout at second time
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};
