const {calculate , Sum} = require("../maths")

test("1. Should calculate the tip" ,  ()=>{
    const total = calculate(50 , .25);
    expect(total).toBe(12.5)

})
test("2. Async test demo " , async ()=> {
    let sum = await Sum(3,2);
    expect(sum).toBe(5);
}) 