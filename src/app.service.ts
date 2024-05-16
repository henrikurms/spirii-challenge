import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  //TODO: Should be replaced with a real database
  userStore: Map<string, AggregatedUserData> = new Map();

  getAggregatedUserData(userId: string): AggregatedUserData | undefined {
    return this.userStore.get(userId);
  }

  getUsersPayouts(): Array<UserPayout> {
    return [];
  }

  // 5 times every minute, i.e. every 12 seconds
  @Cron('*/12 * * * * *')
  async updateTransactionData() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<UserTransactionData>('http://localhost:3000/transactions')
        .pipe(),
    );

    // @ts-ignore
    const grouped: { [key: string]: UserTransaction[] } = Object.groupBy(
      data.items,
      (item: UserTransaction) => item.userId,
    );
    for (const [key, value] of Object.entries(grouped)) {
      const userData = this.userStore.get(key) ?? {
        balance: 0,
        earned: 0,
        spent: 0,
        payOut: 0,
        paidOut: 0,
      };
      for (const entry of value) {
        switch (entry.type) {
          case 'earned':
            userData.earned += entry.amount;
            break;
          case 'spent':
            userData.spent += entry.amount;
            break;
          case 'payout':
            userData.payOut += entry.amount;
            break;
        }
        console.debug(value);
      }
      //TODO: update balance
      this.userStore.set(key, userData);
    }

    this.userStore.set(this.userStore.size.toString(), {
      balance: 100,
      earned: 100,
      spent: 100,
      payOut: 100,
      paidOut: 100,
    });
  }
}

export type AggregatedUserData = {
  balance: number;
  earned: number;
  spent: number;
  payOut: number;
  paidOut: number;
};

export type UserPayout = {
  userId: string;
  payoutAmount: number;
};

export type UserTransaction = {
  id: string;
  userId: string;
  createdAt: string;
  type: string;
  amount: number;
};

export type UserTransactionData = {
  items: UserTransaction[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}