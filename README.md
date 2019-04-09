## SERVICE REQUEST FORM

## Demo video
https://www.loom.com/share/94a876174f4044bab850f73a0647bc70

## Technologies

### Front-end
React bootstrapped with create-react-app
Notes on front-end: 

Code organization
- The code is organized in functional folders: container components (./Container), presentational components (./Presentational), libraries and other reusable code (./Adapters), css files and inline style variables (./Styling), and images (./Assets)

App design
- The main reusable component is the independent component `<FormApp />` which is used inside `<App />`. `<App />` simulates a general site with header or `<NavBar />`.
- `<FormApp />` fetches from API service_type after mounting. The app does not use Redux to centralize state (which would be required in a larger application). Instead, it passes state as props to subcomponents. If the API response is not successful, `<FormApp />` does not render `<RequestContainer />`, instead displays an error message.
- `<RequestContainer />` renders `<RequestForm />` which is the component containing the form input fields.  `<RequestContainer />` handles responses after `<RequestForm />` submits requests to API. If successful, it renders `<Confirmation />` instead of `<RequestForm />`.  `<RequestContainer />` also stores a record of all successful responses to prevent double requesting.
`<FormApp />`'s and `<RequestContainer />`'s local state and logic could be moved to the store using Redux as well as some of the logic to the Actions (with Thunk for async functions), making components lighter. It would make the code mode organized, readable, and reusable.
- `<RequestForm />` handles the logic for the form (validating input, validation no-repeated requests, and error responses.)

#### Set up
1. Clone repo.
1. Install dependencies `npm install`.
1. Start your server `npm start`.

#### Test
1. Run your test `npm test`.

Notes on tests: 
- Used built-in Jest testing functionality, jest-fetch-mock for implementing async tests with mock responses, and react-testing-library for testing some component units. 
- Implemented some unit tests for the ApiRequest and Library helper function library.
- For async testing on ApiRequest
- No integration testing was implemented.

### Back-end 
#### Running the Mock API
The mock API is available as downloadable package from [Google Drive](https://drive.google.com/file/d/0Bw30jK82dDYsd0s0eXlPMXZiNnc/view) that can be run without installing any additional dependencies. By default, the API will start on port 49567. You may change that port, using the port flag.

NOTE: You will likely need to set the permissions on the download fake_api file in your terminal. To run from your terminal,

#### make it executable
chmod +x fake_api
#### run the fake API
./fake_api
There is also a Docker Image available for the Fake API, if you'd prefer that route.