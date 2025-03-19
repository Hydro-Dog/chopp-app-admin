// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { GeneralAnalyticsData, ChosenIdAnalyticsData } from '@shared/types';

// import { axiosPrivate } from '@store/middleware';

// export type AnalyticsData = GeneralAnalyticsData | ChosenIdAnalyticsData;

// export const fetchAnalyticsData = createAsyncThunk<AnalyticsData, { productsId?: string }>(
//   'analytics/fetchAnalyticsData',
//   async ({ productsId }) => {
//     const url = productsId ? `analytics/orders/${productsId}` : 'analytics/orders';
//     const response = await axiosPrivate.get<AnalyticsData>(url);
//     return response.data;
//   },
// );
