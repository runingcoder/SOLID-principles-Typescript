// bad Example:
//  
// function calculateRegistrationFee(collegeType: string, appearanceFrequency: number): number {
//   let baseFee = 100; // Base fee for governmental and international colleges
//   if (collegeType === "private") {
//     baseFee = 150; // Higher base fee for private colleges
//   }
export class PrivateCollegeRegistrationFeeCalculator {
    calculateFee(appearanceFrequency) {
        const baseFee = 150;
        const discountPercentage = 0.1;
        const discountedFinalFee = baseFee - baseFee * discountPercentage * appearanceFrequency;
        return Math.max(discountedFinalFee, 0);
    }
}
export class GovCollegeRegistrationFeeCalculator {
    calculateFee(appearanceFrequency) {
        const baseFee = 100;
        const discountPercentage = 0.2;
        const discountedFinalFee = baseFee - baseFee * discountPercentage * appearanceFrequency;
        return Math.max(discountedFinalFee, 0);
    }
}
export class InternationalCollegeRegistrationFeeCalculator {
    calculateFee(appearanceFrequency) {
        const baseFee = 1000;
        const discountPercentage = 0.05;
        const discountedFinalFee = baseFee - baseFee * discountPercentage * appearanceFrequency;
        return Math.max(discountedFinalFee, 0);
    }
}
