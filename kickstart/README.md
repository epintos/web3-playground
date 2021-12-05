## Campaign Contract

- The compile script adds the whole compiled contracts to the `build` folder. Those files are used in the tests and the deploy script. We do this to avoid compiling the contracts every time a test runs.
- The deploy script only deploys the CampaignFactory contract that has a method to create a new Campaign contract. We do that so the crator of the campaign pays the transaction gas instead of us. We

## NextJS

- Every file in the [pages][./pages] folder is rendered as a new view by Next. The file name corresponds to the page url.
- You can start Next by running `npm run dev`.
- index.js is the home page by default.
