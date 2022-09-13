// import * as dogs from "../public/breeds-50 - breeds.json"
const dogs = require("../public/breeds-50-lower - breeds.json")

let predictions = [{"className": "Bichon Frise", "probability": 0.85966796875}, {"className": "chow, chow chow", "probability": 0.9408203125}, {"className": "Labrador Retriever", "probability": 0.9552001953125}]

const formatting = () => {

    const format = () => {
        let formattedPredictions = []
        // console.log(Object.keys(dogs).length)
        predictions.forEach((prediction) => {
            for(let i=0; i<Object.keys(dogs).length; i++) {
                // console.log(dogs[i].nameLower, "456789")
                if (prediction.className.toLowerCase().includes(dogs[i].nameLower) && prediction.probability > 0) {
                    formattedPredictions.push(dogs[i].breed)
                    // console.log(formattedPredictions)
                }
            }
        })
    }
    
    format()
}
formatting()

let newArray = []
for (let i=0; i<Object.keys(dogs).length; i++){
    if (predictions[0].className.toLowerCase().includes(dogs[i].nameLower)) {
        newArray.push(predictions[0])
    }
    if (predictions[1].className.toLowerCase().includes(dogs[i].nameLower)) {
        newArray.push(predictions[1])
    }
    if (predictions[2].className.toLowerCase().includes(dogs[i].nameLower)) {
        newArray.push(predictions[2])
    }
}

console.log(newArray)