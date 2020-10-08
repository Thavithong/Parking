import { DOWNLOAD_FROM_SERVER } from '../constants/type'

export const downLoadData = (data, ip) => {
  return {
    type: DOWNLOAD_FROM_SERVER,
    data,
    ip
  }
}