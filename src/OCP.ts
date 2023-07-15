// bad Example:
//  
// function calculateRegistrationFee(collegeType: string, appearanceFrequency: number): number {
//   let baseFee = 100; // Base fee for governmental and international colleges
//   if (collegeType === "private") {
//     baseFee = 150; // Higher base fee for private colleges
//   }

//   // Apply a discount based on the appearance frequency
//   const discountPercentage = 0.1; // 10% discount for each appearance
//   const discountedFee = baseFee - (baseFee * discountPercentage * appearanceFrequency);

//   return Math.max(discountedFee, 0); // Ensure the fee is not negative
// }

// and just invoking this function like;
//  const newTeam: Team = {
//   collegeName: "ABC College",
//   appearanceFrequency: 5,
//   email: "team@example.com",
//   background: "private",
//   registrationFee: calculateRegistrationFee("private", 5) --- here!!
// };

// // Register the new team and store the registration fee
// teamRepository.registerTeam(newTeam);

//  But if in future, if you have new categories of types of college, then you will have to change the 
// code in this function. So rather than that, make class for each type and make own functions, so that
// it is extendable and not modifiable which abides by the rule of Open Close Principle in SOLID.



export interface RegistrationFeeCalculator {
    calculateFee(appearanceFrequency: number): string;
  }
  
  export class PrivateCollegeRegistrationFeeCalculator implements RegistrationFeeCalculator {
    calculateFee(appearanceFrequency: number): string {
      const baseFee = 35000;
      const discountPercentage = 0.1;
      const discountedFinalFee = baseFee - baseFee * discountPercentage * (1+ (100* appearanceFrequency)/baseFee);  
      const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
      return formattedFee;    }
  }
  
  export class GovCollegeRegistrationFeeCalculator implements RegistrationFeeCalculator {
    calculateFee(appearanceFrequency: number): string {
      const baseFee = 25000;
      const discountPercentage = 0.2;
      const discountedFinalFee = baseFee - baseFee * discountPercentage * (1+ (100* appearanceFrequency)/baseFee);  
  
      const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
      return formattedFee;    }
  }
  
  export class InternationalCollegeRegistrationFeeCalculator implements RegistrationFeeCalculator {
    calculateFee(appearanceFrequency: number): string {
      const baseFee = 60000;
      const discountPercentage = 0.05;
      const discountedFinalFee = baseFee - baseFee * discountPercentage * (1+ (100* appearanceFrequency)/baseFee);  
      const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
      return formattedFee;    }
  }
  