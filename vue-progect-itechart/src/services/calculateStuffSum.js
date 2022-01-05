const prices = {
  cola: 2,
  chips: 3,
  popcorn: 5,
};

function calculate(stuff) {

    const pricesAdditions = {
    cola: stuff.cola * prices.cola,
    chips: stuff.chips * prices.chips,
    popcorn: stuff.popcorn * prices.popcorn,
    };
    
    const total = Object.values(pricesAdditions).reduce((acc, val) =>{
        acc = acc + val;
        return acc
    }, 0);

    return {
        ...pricesAdditions, total,
    };
}

export default calculate;