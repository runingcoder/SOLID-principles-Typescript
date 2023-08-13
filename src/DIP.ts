// For bad implementation, we can have this, 
// export class MainFeeCalculator {   
//     constructor() {} 
//      createCalculator(background: string, appearanceFrequency: number): RegistrationFeeCalculator {
//       switch (background) {
//         case 'Private':
//           return new PrivateCollegeRegistrationFeeCalculator(appearanceFrequency);
//         case 'Governmental':
//           return new GovCollegeRegistrationFeeCalculator(appearanceFrequency);
//         case 'International':
//           return new InternationalCollegeRegistrationFeeCalculator(appearanceFrequency);
//         // Add more cases for additional fee calculator types
//         default:
//           throw new Error(`Unsupported background: ${background}`);
//       }
//     }
//   }

// Here, the higher level module is dependent on the lower level module directly.
// So, for a good implementation, look in the OCP.ts file.
