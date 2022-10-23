const validateURL = (url: string) => {
    const re = /^((http|https):\/\/)?[a-zA-Z0-9-_.]+(\.[a-zA-Z0-9-_.]+)+([a-zA-Z0-9-_.\/?=&#]+)?$/; // regexr.com/70mr1
    return re.test(url);
};
const TIME_OUT = 10000;
export { validateURL, TIME_OUT };
