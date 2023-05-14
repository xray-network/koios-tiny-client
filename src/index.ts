import axios, { Axios, AxiosError, AxiosResponse, GenericAbortSignal } from "axios"
import * as KoiosTypes from "./types"
import methods from "./methods"

export default class KoiosTinyClient {
  public client: Axios
  public methods: ReturnType<typeof methods>

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL })
    this.client.interceptors.response.use(
      (response: AxiosResponse): any => {
        return {
          success: response,
        }
      },
      (error: AxiosError): { error: KoiosTypes.IError } => {
        return {
          error: {
            type: error?.response ? "error" : error?.request ? "no-response" : "bad-request",
            message: error.message,
            name: error.name,
            error,
          },
        }
      }
    )
    this.methods = methods(this.client)
  }
}
