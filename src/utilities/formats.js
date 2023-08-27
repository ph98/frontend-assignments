export const formatNumbers = (num) => {


    return Number.isNaN(Number(num)) ? '-' : Number(num).toFixed(3)
}