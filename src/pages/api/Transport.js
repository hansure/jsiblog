import axios from 'axios'
import axiosRetry from 'axios-retry'
import { error } from 'next/dist/build/output/log'

axiosRetry(axios, { retries: Number.MAX_SAFE_INTEGER })
const baseUrl = 'http://localhost:5000/'
// const baseUrl = 'https://dev.deventsmiddleware.k8s.sandboxaddis.com/';

const Transport = {
  HTTP: {
    getAllData: () =>
      axios({
        url: baseUrl + 'blogs',
        method: 'GET',
      }),
    createEventReq: (data) =>
      axios({
        url: baseUrl + 'blogs',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }),

    getAllEventReq: () =>
      axios({
        url: baseUrl + 'blogs',
        method: 'GET',
      }),

    getReqByID: (id) =>
      axios({
        url: baseUrl + 'blogs/' + id,
        method: 'GET',
      }),
    deleteReqByID: (uuid) =>
      axios({
        url: baseUrl + 'blogs/' + uuid,
        method: 'DELETE',
      }),
    updateEventReq: (uuid, data) =>
      axios({
        url: baseUrl + 'blogs/' + uuid,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }),
    // getToken: () =>
    //   axios({
    //     url: baseUrl + 'events/token',
    //     method: 'Get',
    //   }),
  },
}

export default Transport
