export default () => {
    const numberString = Number(new Date()).toString();
    const lastNumber = numberString[numberString.length - 1];
    const slicedNumber = numberString.slice(0, numberString.length - 1);
    return Number(lastNumber + slicedNumber).toString(36);
}
