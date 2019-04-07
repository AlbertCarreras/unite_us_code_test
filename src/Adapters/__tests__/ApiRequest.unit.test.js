import { APIRequest } from '../ApiRequest'
 
describe('API Request adapter', () => {

  beforeEach(() => {
    fetch.resetMocks()
  })
 
  it('calls service-request api and returns data to me', () => {

    let mockResponse = { "data": [
                    {
                        "display_name": "Benefits",
                        "id": "benefits"
                    },
                    {
                        "display_name": "Employment",
                        "id": "employment"
                    },
                    {
                        "display_name": "Healthcare",
                        "id": "healthcare"
                    },
                    {
                        "display_name": "Housing",
                        "id": "housing"
                    },
                    {
                        "display_name": "Legal",
                        "id": "legal"
                    }
                    ]
                }

    fetch.mockResponseOnce(JSON.stringify(mockResponse))
 
    //assert on the response
    APIRequest('service_type').then(res => {
      expect(res.data).toEqual(mockResponse.data)
    })
 
    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:49567/api/service-types')
  })


  it('successfully calls assistance-requests api and returns message', () => {

    let mockResponse = {
      "echo": {
          "assistance_request": {
              "service_type": "benefits",
              "description": "The friend in my adversity I shall always cherish most. I can better trust those who have helped to relieve the gloom of my dark hours than those who are so ready to enjoy with me the sunshine of my prosperity.",
              "contact": {
                  "first_name": "Ulysses",
                  "last_name": "Grant",
                  "email": "ulysses@union.mil"
              }
          }
      },
      "message": "Your assistance request has been successfully submitted."
    }

    fetch.mockResponseOnce(JSON.stringify(mockResponse))


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
              "first_name": "FirstName",
              "last_name": "LastName",
              "email": "email@email.com"
            },
            "service_type": "Housing",
            "description": "Description"
          }
        }      
      )

    let data = {
        method: POST,
        headers: HEADERS,
        body: body
      }
 
    // assert on the response
    APIRequest('assistance-requests', data).then(res => res.json()).then(res => {
      expect(res).toHaveProperty('echo')
    })
 
    // assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:49567/api/assistance-requests')
  })

  it('successfully calls assistance-requests api and returns error', () => {

    let mockResponse = {
      "message": "Sorry, you are not authorized to make this request."
  }

    fetch.mockResponseOnce(JSON.stringify(mockResponse))

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
              "first_name": "FirstName",
              "last_name": "LastName",
              "email": "email@email.com"
            },
            "service_type": "Housing",
            "description": "Description"
          }
        }      
      )

    let data = {
        method: POST,
        headers: HEADERS,
        body: body
      }
 
    // assert on the response
    APIRequest('assistance-requests', data).then(res => res.json()).then(res => {
      expect(res).toHaveProperty('message')
    })
 
    // assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:49567/api/assistance-requests')
  })
})