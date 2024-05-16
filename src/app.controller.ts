import { Controller, Get, Param, Query } from "@nestjs/common";
import { AppService, UserTransactionData } from "./app.service";
import { AggregatedUserData } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users/:id')
  getAggregatedUserData(
    @Param('id') userId: string,
  ): AggregatedUserData | undefined {
    return this.appService.getAggregatedUserData(userId);
  }

  @Get('payouts')
  getUserPayouts() {
    return this.appService.getUsersPayouts();
  }

  // This endpoint should be in the transaction service, here for POC purposes
  @Get('transactions')
  getTransactionData(
    // @Query('startDate') _startDate?: string,
  // @Query('endDate') _endDate?: string,
  ) {
    const data: UserTransactionData = {
      items: [
        {
          id: '41bbdf81-735c-4aea-beb3-3e5f433a30c5',
          userId: '074092',
          createdAt: '2023-03-16T12:33:11.000Z',
          type: 'payout',
          amount: 30,
        },
        {
          id: '41bbdf81-735c-4aea-beb3-3e5fasfsdfef',
          userId: '074092',
          createdAt: '2023-03-12T12:33:11.000Z',
          type: 'spent',
          amount: 12
        },
        {
          id: '41bbdf81-735c-4aea-beb3-342jhj234nj234',
          userId: '074092',
          createdAt: '2023-03-15T12:33:11.000Z',
          type: 'earned',
          amount: 1.2,
        },
      ],
      meta: {
        totalItems: 1200,
        itemCount: 3,
        itemsPerPage: 3,
        totalPages: 400,
        currentPage: 1,
      },
    }
    return data;
  }
}
