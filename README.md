# [🌍 MARFEEL 🚀](https://marfeel.fly.dev/)

Solution to the full stack test

## Considerations about my solution

- The strategy I used is to store the state in the URL, which is sufficient for this case. Only the pagination and article id are needed. While React context or Redux state are more powerful, they are also more complex.
- Since there is no explicit requirement to make a REST API, I have made only two endpoints coupled to the two screens, avoiding making one for each resource (articles and traffic) for simplicity and performance. In case there is a requirement to serve data to more clients, it could be decoupled with one endpoint per resource and several queries from each client/page/screen.
- I added pagination in the backend because the amount of data may be too large to load it all in the frontend. This decision means that the traffic calculation has to be done in the backend as well. In case there was no pagination, the traffic calculation could have been done on the client and the api would only return articles.
- I added some simple smoke and unit tests.
- Added basic CI/CD through github actions and [fly.io](https://fly.io/)

## Possible improvements

- Move `@types` dependencies to `devDependencies` and clean dependencies not used.
- Use a more powerful lib for http queries like react-query. Not used in this case for simplicity.
- Add stories for the new components created.
- Add manifest.json file and create a PWA.
- Add tests in the backend
- Cover more cases with testing
- Versioning, changelog, semantic-release
