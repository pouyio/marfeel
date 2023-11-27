import { screen, render } from "@testing-library/react";
import { ArticleDetail } from "./ArticleDetail";

describe("ArticleDetail component works properly", () => {
  it("Shows all The data", () => {
    const author = "author";
    const image = "https://example-image.com";
    const url = "https://example-url.com";

    render(<ArticleDetail author={author} image={image} url={url} />);

    const imageElement = screen.getByAltText("detail-image");

    expect(imageElement).toHaveAttribute("src", image);
    expect(screen.getByText(author)).toBeTruthy();
    expect(screen.getByText(url)).toBeTruthy();
  });
});
