# Considerations about my solution

- The strategy I used is to store the state in the URL, which is sufficient for this case. Only the pagination and article id are needed. While React context or Redux state are more powerful, they are also more complex.
- Since there is no explicit requirement to make a REST API, I have made only two endpoints coupled to the two screens, avoiding making one for each resource (articles and traffic) for simplicity and performance. In case there is a requirement to serve data to more clients, it could be decoupled with one endpoint per resource and several queries from each client/page/screen.
- I added pagination in the backend because the amount of data may be too large to load it all in the frontend. This decision means that the traffic calculation has to be done in the backend as well. In case there was no pagination, the traffic calculation could have been done on the client and the api would only return articles.
- I added some simple smoke and unit tests.

# Possible improvements

- Move `@types` dependencies to `devDependencies` and clean dependencies not used.
- Use a more powerful lib for http queries like react-query. Not used in this case for simplicity.
- Add stories for the new components created.
- Add manifest.json file and create a PWA.
- Add tests in the backend
- Cover more cases with testing

# Fullstack test

The assessment consists in building a dashboard for analyzing publishers site traffic insights.

Dashboard views are

#### Homepage

![Homepage](./public/home.png)

#### Article Detail

![Article Details](./public/detail.png)

All data for feeding the dashboards can be found in `server/dataset.json`. It has the following shape

```json
{
  "traffic_data": [{
    "id": "c0281ed3-160d-4be0-acc7-1dd9a62a4f78",
    "url": "https://www.example.com/article1",
    "author": "Maximilian",
    "image_url": "https://picsum.photos/600/400?buster=0.4005155557173643",
    "geo": "IT",
    "daily_traffic": [{
      "day": 1,
      "hourly_traffic": [{
        "hour": 0,
        "traffic": 743
      }, {
        "hour": 1,
        "traffic": 149
      }, {
        "hour": 2,
        "traffic": 546
      }, {
        "hour": 3,
        "traffic": 812
      }, ...
      {
        "hour": 23,
        "traffic": 768
      }]
    }, ...
    {
      "day": 31,
      "hourly_traffic": [{
        "hour": 0,
        "traffic": 143
      }, ...
      {
        "hour": 23,
        "traffic": 448
      }]
    }]
  }]
}
```

A basic scaffolding with some components is provided too.

```
# start app
$ npm start

# start server
$ npm run api

# start storybook
$ npm run storybook
```

#### Base

![Base](./public/base.png)

#### Components collection

![Components collection](./public/storybook.png)

## Feature requirements

- Global view
  - Traffic is aggregated from all articles
  - Articles data is displayed ordered by traffic
  - Data can be filtered using top bar selector
  - Clicking on an article should navigate to article details view
- Details view
  - Traffic is aggregated from the article
  - Data can be filtered using top bar selector
- Api
  - should use generated dataset as database
- Time selector
  - Should allow to select a value from:
    - Today
    - Yesterday
    - Last seven days
    - This month

![time selector](./public/time-selector.png)
