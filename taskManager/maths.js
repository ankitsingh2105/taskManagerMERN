const calculate = (total, tipPercent) => {
    const tip = parseFloat(total) * parseFloat(tipPercent);
    return tip;
}
async function Sum(a,b){
    return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(a+b);
        },2000)
    })
}

module.exports = {
    calculate,
    Sum 
};