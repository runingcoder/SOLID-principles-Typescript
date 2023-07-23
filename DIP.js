"use strict";
//  IN the SRP.ts file, we have implemented good dependency inversion principle.
// By creating an interface RegistrationFeeCalculator that has a method that is implemented by
// every class that implements it. 
// And we used that interface in the TeamRepository class. So now, we can add the methods of
//  all the classes that implement the method defined in teh interface.
// A bad implementation of DIP would be that TeamRepository class would directly depend on the 
// other classes like:
// export class TeamRepository {
//     private teams: Team[];
//     private privateCollegeRegistrationFeeCalculator: PrivateCollegeRegistrationFeeCalculator;
//     private govCollegeRegistrationFeeCalculator: GovCollegeRegistrationFeeCalculator;
//     private internationalCollegeRegistrationFeeCalculator: InternationalCollegeRegistrationFeeCalculator;
//     constructor() {
//       this.teams = LocalStorageService.getItem<Team[]>("teamList") || [];
//       this.privateCollegeRegistrationFeeCalculator = new PrivateCollegeRegistrationFeeCalculator();
//       this.govCollegeRegistrationFeeCalculator = new GovCollegeRegistrationFeeCalculator();
//       this.internationalCollegeRegistrationFeeCalculator = new InternationalCollegeRegistrationFeeCalculator();
//     }
//     calculateFeeFunction(team: Team) {
//       const background = team.background;
//       let calculator: RegistrationFeeCalculator;
//       if (background === 'Private') {
//         calculator = this.privateCollegeRegistrationFeeCalculator;
//       } else if (background === 'Governmental') {
//         calculator = this.govCollegeRegistrationFeeCalculator;
//       } else if (background === 'International') {
//         calculator = this.internationalCollegeRegistrationFeeCalculator;
//       } else {
//         throw new Error(`No registration fee calculator found for college type: ${background}`);
//       }
//       team.registrationFee = calculator.calculateFee(team.appearanceFrequency);
//     }
//     // Rest of the code...
//   }
