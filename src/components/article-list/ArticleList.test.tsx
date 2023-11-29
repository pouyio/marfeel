import { render, screen } from "@testing-library/react";
import { useInView } from "react-intersection-observer";
import { BrowserRouter } from "react-router-dom";
import { ArticleList } from "./ArticleList";

const ARTICLES_MOCK = [
  {
    id: "b9301529-0b42-460c-b80f-a232ec88fcf0",
    url: "https://www.example.com/article32",
    author: "Rebecca",
    image_url: "https://picsum.photos/600/400?buster=0.22587954294044343",
    geo: "ES",
    daily_traffic: [],
    totalTraffic: 16133,
  },
  {
    id: "a96d386e-f14d-472f-91ad-7baa22a2fe14",
    url: "https://www.example.com/article52",
    author: "Maximilian",
    image_url: "https://picsum.photos/600/400?buster=0.5147817679570514",
    geo: "ES",
    daily_traffic: [],
    totalTraffic: 15179,
  },
  {
    id: "8ee7bc40-0fca-4711-afa4-6b1521326003",
    url: "https://www.example.com/article19",
    author: "Maximilian",
    image_url: "https://picsum.photos/600/400?buster=0.8843947620454646",
    geo: "IT",
    daily_traffic: [],
    totalTraffic: 14649,
  },
  {
    id: "846f831c-dfd9-4267-ae96-1d3f624e8237",
    url: "https://www.example.com/article11",
    author: "Maria",
    image_url: "https://picsum.photos/600/400?buster=0.5302718928152648",
    geo: "IT",
    daily_traffic: [],
    totalTraffic: 14353,
  },
  {
    id: "34b8307f-d67a-44b0-8522-c1473440a19a",
    url: "https://www.example.com/article21",
    author: "Rebecca",
    image_url: "https://picsum.photos/600/400?buster=0.13363220818431332",
    geo: "FR",
    daily_traffic: [],
    totalTraffic: 14302,
  },
  {
    id: "9e444b9b-0eb9-49d9-99d4-924d8d1abf48",
    url: "https://www.example.com/article70",
    author: "Agencies",
    image_url: "https://picsum.photos/600/400?buster=0.42006374927232315",
    geo: "IT",
    daily_traffic: [],
    totalTraffic: 14302,
  },
  {
    id: "82454150-3e16-4638-bdcf-5c140c2382f9",
    url: "https://www.example.com/article20",
    author: "Agencies",
    image_url: "https://picsum.photos/600/400?buster=0.8108890975771246",
    geo: "US",
    daily_traffic: [],
    totalTraffic: 14194,
  },
  {
    id: "609591cb-f4d8-4d31-b213-015e749f6bcb",
    url: "https://www.example.com/article12",
    author: "John",
    image_url: "https://picsum.photos/600/400?buster=0.3942911458935514",
    geo: "US",
    daily_traffic: [],
    totalTraffic: 14183,
  },
  {
    id: "b230baaa-d8e9-4713-8e12-e7cf5c720679",
    url: "https://www.example.com/article96",
    author: "Rebecca",
    image_url: "https://picsum.photos/600/400?buster=0.004426555960636236",
    geo: "FR",
    daily_traffic: [],
    totalTraffic: 13988,
  },
  {
    id: "821a86d2-f42b-4714-ba9e-82f2c13f1fa0",
    url: "https://www.example.com/article84",
    author: "Maria",
    image_url: "https://picsum.photos/600/400?buster=0.5414698859728544",
    geo: "ES",
    daily_traffic: [],
    totalTraffic: 13737,
  },
];

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

describe("ArticleList component works properly", () => {
  it("renders one link per article", () => {
    const refMock = jest.fn();
    const inViewMock = true;

    (useInView as jest.Mock).mockReturnValue({
      ref: refMock,
      inView: inViewMock,
    });

    render(
      <BrowserRouter>
        <ArticleList articles={ARTICLES_MOCK} onLoadMore={() => {}} />
      </BrowserRouter>
    );

    ARTICLES_MOCK.forEach((article) => {
      const expectedHref = `/${article.id}?`;
      const linkElement = screen.getByTestId(`article-link-${article.id}`);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", expectedHref);
    });
  });
});
