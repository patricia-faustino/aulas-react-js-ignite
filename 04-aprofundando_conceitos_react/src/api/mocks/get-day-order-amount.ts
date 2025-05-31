import { http, HttpResponse } from "msw";
import { GetDayOrdersAmountResponse } from "../get-day-orders-amount";

export const getDayOrderAmountMock = http.get<
  never,
  never,
  GetDayOrdersAmountResponse
>("/metrics/day-order-amount", () => {
  return HttpResponse.json({
    amount: 20,
    diffFromYesterday: -5,
  });
});
