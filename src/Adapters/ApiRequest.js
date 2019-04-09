//helper function to fetch from API
export function APIRequest(type, data) {

    //fetches service_types from API
    if (type === 'service_type') {

      return  fetch("http://localhost:49567/api/service-types")
              .then(res => res.json())
    } 

    //submits assistance request and returns response
    else if (type === 'assistance-requests') {

      const POST = 'POST'

      const HEADERS = { 
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }

      const body = JSON.stringify(
        {
          "assistance_request": {
            "contact": {
              "first_name": data.firstName,
              "last_name": data.lastName,
              "email": data.email
            },
            "service_type": data.serviceRequest,
            "description": data.bodyRequest
          }
        }      
      )

      return fetch("http://localhost:49567/api/assistance-requests", {
        method: POST,
        headers: HEADERS,
        body: body
      })
    }

    else {
      return 'no argument provided'
    }
}
