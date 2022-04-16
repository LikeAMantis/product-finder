function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function range(startAt = 0, size, step = 1) {
    return [...Array(size).keys()].map((i) => i * step + startAt);
}

export { classNames, range };
