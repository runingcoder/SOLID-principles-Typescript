// So, for OCP principle, it says class has to be open for extension but closed for modification.
// Extensions in this case are the various fee calculator method logic for difference type of colleges
// or background, and modification is as seen as the main class which is MainFeeCalculator class.
// so, in this case, when there is a new type of college, we first make a class for that 
//  and call it(loose coupling) in the main class depending on the type and
// and so in this way, not much modification is seen in the main class.
// SO, this is a violation of OCP principle.
// the solution will be in the next commit.
// and since we created and interface for the fee calculator, we can easily add more fee calculator 
// classes that implements the interface and call it in the main class.
export class MainFeeCalculator {
    constructor() { }
    createCalculator(background, appearanceFrequency) {
        switch (background) {
            case 'Private':
                return new PrivateCollegeRegistrationFeeCalculator(appearanceFrequency);
            case 'Governmental':
                return new GovCollegeRegistrationFeeCalculator(appearanceFrequency);
            case 'International':
                return new InternationalCollegeRegistrationFeeCalculator(appearanceFrequency);
            // Add more cases for additional fee calculator types
            default:
                throw new Error(`Unsupported background: ${background}`);
        }
    }
}
export class PrivateCollegeRegistrationFeeCalculator {
    constructor(appearanceFrequency) {
        this.appearanceFrequency = appearanceFrequency;
    }
    calculateFee() {
        const baseFee = 35000;
        const discountPercentage = 0.1;
        const discountedFinalFee = baseFee - baseFee * discountPercentage * (1 + (100 * this.appearanceFrequency) / baseFee);
        const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
        return formattedFee;
    }
}
export class GovCollegeRegistrationFeeCalculator {
    constructor(appearanceFrequency) {
        this.appearanceFrequency = appearanceFrequency;
    }
    calculateFee() {
        const baseFee = 25000;
        const discountPercentage = 0.2;
        const discountedFinalFee = baseFee - baseFee * discountPercentage * (1 + (100 * this.appearanceFrequency) / baseFee);
        const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
        return formattedFee;
    }
}
export class InternationalCollegeRegistrationFeeCalculator {
    constructor(appearanceFrequency) {
        this.appearanceFrequency = appearanceFrequency;
    }
    calculateFee() {
        const baseFee = 60000;
        const discountPercentage = 0.05;
        const discountedFinalFee = baseFee - baseFee * discountPercentage * (1 + (100 * this.appearanceFrequency) / baseFee);
        const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
        return formattedFee;
    }
}
