
  // So, for OCP principle, it says class has to be open for extension but closed for modification.
  // Extensions in this case are the various fee calculator method logic for difference type of colleges
  // or background, and modification is as seen as the main class which is MainFeeCalculator class.
  // so, in this case, when there is a new type of college, we first make a class for that 
// in the main class, we have called a method that implements factory method pattern to return the
// type of registration fee calculator based on the background of the college that returns the 
// registration fee in the end.


// And as for Dependency Inversion Principle, it says that high level modules should not depend on low level
//  modules so, here, The MainFeeCalculator class depends on the FeeCalculatorFactory interface, not on 
// concrete implementations. This dependency inversion allows you to inject different factory implementations
// without changing the behavior of the MainFeeCalculator class. 
  export class MainFeeCalculator {
    private calculatorFactory: FeeCalculatorFactory;
  
    constructor(calculatorFactory: FeeCalculatorFactory) {
      this.calculatorFactory = calculatorFactory;
    }
  
    calculatetypeAndValue(background: string, appearanceFrequency: number): RegistrationFeeCalculator{
      return this.calculatorFactory.createCalculator(background, appearanceFrequency);
    }
  }
  export interface FeeCalculatorFactory {
    createCalculator(background: string, appearanceFrequency: number): RegistrationFeeCalculator;
  }
  export class SpecificFeeCalculatorFactory implements FeeCalculatorFactory {
    createCalculator(background: string, appearanceFrequency: number): RegistrationFeeCalculator {
      switch (background) {
        case 'Private':
          return new PrivateCollegeRegistrationFeeCalculator(appearanceFrequency);
        case 'Governmental':
          return new GovCollegeRegistrationFeeCalculator(appearanceFrequency);
        case 'International':
          return new InternationalCollegeRegistrationFeeCalculator(appearanceFrequency);
        default:
          throw new Error(`Unsupported background: ${background}`);
      }
    }
  }
  

export interface RegistrationFeeCalculator {
    calculateFee(appearanceFrequency: number): string;
  }
  
  export class PrivateCollegeRegistrationFeeCalculator implements RegistrationFeeCalculator {
    constructor(private appearanceFrequency: number) {
    }
    calculateFee(): string {
      const baseFee = 35000;
      const discountPercentage = 0.1;
      const discountedFinalFee = baseFee - baseFee * discountPercentage * (1+ (100* this.appearanceFrequency)/baseFee);  
      const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
      return formattedFee;    }
  }
  
  export class GovCollegeRegistrationFeeCalculator implements RegistrationFeeCalculator {
    constructor( private appearanceFrequency: number) {
    }
    calculateFee(): string {
      const baseFee = 25000;
      const discountPercentage = 0.2;
      const discountedFinalFee = baseFee - baseFee * discountPercentage * (1+ (100* this.appearanceFrequency)/baseFee);  
  
      const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
      return formattedFee;    }
  }
  
  export class InternationalCollegeRegistrationFeeCalculator implements RegistrationFeeCalculator {
    constructor( private appearanceFrequency: number) {
    }
    calculateFee(): string {  
      const baseFee = 60000;
      const discountPercentage = 0.05;
      const discountedFinalFee = baseFee - baseFee * discountPercentage * (1+ (100* this.appearanceFrequency)/baseFee);  
      const formattedFee = Math.floor(Math.max(discountedFinalFee, 0)).toLocaleString();
      return formattedFee;    }
  }

  