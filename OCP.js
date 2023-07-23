// bad Example:
//  
// function calculateRegistrationFee(collegeType: string, appearanceFrequency: number): number {
//   let baseFee = 100; // Base fee for governmental and international colleges
//   if (collegeType === "private") {
//     baseFee = 150; // Higher base fee for private colleges
//   }
export class PrivateCollegeRegistrationFeeCalculator {
    calculateFee(appearanceFrequency) {
        const baseFee = 35000;
        const discountPercentage = 0.1;
        const discountedFinalFee = baseFee - baseFee * discountPercentage * (1 + (100 * appearanceFrequency) / baseFee);
        const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
        return formattedFee;
    }
}
export class GovCollegeRegistrationFeeCalculator {
    calculateFee(appearanceFrequency) {
        const baseFee = 25000;
        const discountPercentage = 0.2;
        const discountedFinalFee = baseFee - baseFee * discountPercentage * (1 + (100 * appearanceFrequency) / baseFee);
        const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
        return formattedFee;
    }
}
export class InternationalCollegeRegistrationFeeCalculator {
    calculateFee(appearanceFrequency) {
        const baseFee = 60000;
        const discountPercentage = 0.05;
        const discountedFinalFee = baseFee - baseFee * discountPercentage * (1 + (100 * appearanceFrequency) / baseFee);
        const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
        return formattedFee;
    }
}
