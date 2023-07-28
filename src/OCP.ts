// bad Example:
//  
// function calculateRegistrationFee(collegeType: string, appearanceFrequency: number): number {
//   let baseFee = 100; 
//   if (collegeType === "private") {
//     baseFee = 150; 
//   }
//   const discountPercentage = 0.1; 
//   const discountedFee = baseFee - (baseFee * discountPercentage * appearanceFrequency);

//   return Math.max(discountedFee, 0); // }

  // and just invoking this function like;
//  const newTeam: Team = {
//   collegeName: "ABC College",
//   appearanceFrequency: 5,
//   email: "team@example.com",
//   background: "private",
//   registrationFee: calculateRegistrationFee("private", 5) ------ here!!
// };

// // Register the new team and store the registration fee
// teamRepository.registerTeam(newTeam);

//BUT IF IN THE FUTURE, IF YOU HAVE NEW CATEGORIES OF TYPES OF COLLEGES, 
// THEN YOU WILL HAVE TO CHANGE THE CODE IN THIS FUNCTION. SO RATHER THAN THAT, 
// MAKE A CLASS FOR EACH TYPE AND CREATE OWN FUNCTIONS, SO THAT IT IS EXTENDABLE AND NOT MODIFIABLE,
// WHICH ABIDES BY THE RULE OF OPEN-CLOSED PRINCIPLE IN SOLID. //


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
  