// IN SRP class, I have used, --->
// private monetaryRewardProvider: RewardProvider;
// private giftCardRewardProvider: RewardProvider;
// constructor() {
//     this.monetaryRewardProvider = new MonetaryRewardProvider();
//     this.giftCardRewardProvider = new GiftCardRewardProvider();
//     this.teams = LocalStorageService.getItem<Team[]>("teamList") || [];
// }
// we can see that both the objects are being created with reference to RewardProvider interface
//  which is the parent class, and then we are assigning the objects to the respective subclasses.
// In this way,we are using the object of the parent class to refer to the objects of the child class.
// and that is a simple example of LSP principle that states,
// Although I admit i couldn't find a proper example for this principle, but i think this is a good example
// as it uses the method described in the parent class in the child classes .
// "Derived classes must be substitutable for their base classes."


export class RewardProvider {
    provideReward(points: number){
        return points;
    };
  }
  
  export class MonetaryRewardProvider extends RewardProvider {
    provideReward(points: number): number {
      // Calculate the monetary reward
      if (points <= 0) {
        return 0;
      }
  
      const monetaryReward = Math.min(Math.floor(points / 50) * 10, 30);
      return monetaryReward;
    }
  }
  
  export class GiftCardRewardProvider extends RewardProvider {
    provideReward(points: number): number {
      // Calculate the number of gift cards
      if (points <= 300) {
        return 0;
      }
  
      const giftCards = Math.floor((points - 300) / 75);
      return giftCards;
    }
  }
  