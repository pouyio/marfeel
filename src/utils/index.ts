import { Traffic } from "../types";

export const transformChartData = (data: Traffic) => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  return { labels, values };
};
