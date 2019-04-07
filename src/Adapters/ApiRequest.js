export function APIRequest(type, data) {

    if (type === 'service_type') {

      return  fetch("http://localhost:49567/api/service-types")
              .then(res => res.json())
    } 

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
