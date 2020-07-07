
In the default 'Data Entry' application, the user can write comments on the data and can also indicate them to follow-up. But so far, there is no easy way in the default DHIS2 applications to show these comments or at least to show those should be followed up without accessing the data directly using the specified dimensions.

This is a DHIS2 application which allows the users to list the data values comments and their follow-up status. The users can also edit the follow-up flag directly.

## Main Features
- Listing comments of a dataset and one or more organisation units.
- Listing latest 30-days follow-up comments of all datasets for all organisation units.
- User can edit the follow-up flag directly.

## Notes
* As the DHIS2 web API currently does not support pagination or data filtering for the 'dataValueSets', this app fetches the comments from the data values in the client side which is not very effective in case of handling too much data values.
A possible trick could be done by using 'startDate' and 'endDate' query parameters. In which a function can be developed to only fetch the data values during a limited period of time and then compare if the number of valid comments fetched is enough to be shown, otherwise another query request can be performed to fetch more data values.
SQL Views also seems interesting to be used for this purpose.

* For listing all comments of all organisation units, organisation units groups were used to fetch data because the huge number of organisation units could not pass through the request. Anyway, using the org units groups is not a good choice and could lead to missing or duplicated data. This should be edited in the next improvements.

* The app is under development and should not be used in production.

## Future Improvements
- Show the 'displayName' of the metadata (instead of the id)
- Improve fetching data method.
- Add date range filter.
- Add user filter.
- Add pagination.
- Edit the comment directly from the app.

--------
This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner and runs all available tests found in `/src`.<br />

See the section about [running tests](https://platform.dhis2.nu/#/scripts/test) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
A deployable `.zip` file can be found in `build/bundle`!

See the section about [building](https://platform.dhis2.nu/#/scripts/build) for more information.

## Learn More

You can learn more about the platform in the [DHIS2 Application Platform Documentation](https://platform.dhis2.nu/).

You can learn more about the runtime in the [DHIS2 Application Runtime Documentation](https://runtime.dhis2.nu/).

To learn React, check out the [React documentation](https://reactjs.org/).
