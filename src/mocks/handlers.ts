import { rest } from 'msw'
import { getTranslations, putTranslations } from './responses'
const { REACT_APP_STATIC_BASE_URL } = process.env
let baseURL = REACT_APP_STATIC_BASE_URL
  if (process.env.NODE_ENV === 'development') {
    baseURL = 'https://localhost:3000'
  }

export const handlers = [
    rest.get(`${baseURL}/translations`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(getTranslations),
          )
    }),
    rest.put(`${baseURL}/translations/put`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(putTranslations),
        )
  }),
  ]