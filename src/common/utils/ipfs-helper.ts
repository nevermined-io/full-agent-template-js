import IpfsHttpClientLite from 'ipfs-http-client-lite'

export interface IpfsConnectionParameters {
  gatewayUrl: string
  projectId?: string
  projectSecret?: string
  authToken?: string
}

export default class IpfsHelper {
  private ipfsGateway: string
  private authToken: string

  constructor(ipfsOptions: IpfsConnectionParameters) {
    this.ipfsGateway = ipfsOptions.gatewayUrl
    this.authToken = this.getAuthToken(ipfsOptions)
  }

  private getAuthToken(ipfsOptions: IpfsConnectionParameters): string {
    if (this.authToken) return this.authToken
    if (ipfsOptions.authToken) return ipfsOptions.authToken
    if (!ipfsOptions.projectId || !ipfsOptions.projectSecret) {
      return undefined
    } else {
      return Buffer.from(
        `${ipfsOptions.projectId}:${ipfsOptions.projectSecret}`
      ).toString('base64')
    }
  }

  async add(content: any): Promise<string> {
    const ipfs = IpfsHttpClientLite({
      apiUrl: this.ipfsGateway,
      ...(this.authToken && {
        headers: { Authorization: `Basic ${this.authToken}` }
      })
    })
    const addResult = await ipfs.add(content)
    return addResult[0].hash
  }

  async get(cid: string): Promise<string> {
    const url =
      this.ipfsGateway + '/api/v0/cat?arg=' + cid.replace('cid://', '')
    const options = {
      method: 'POST',
      ...(this.authToken && {
        headers: { Authorization: `Basic ${this.authToken}` }
      })
    }

    return fetch(url, options)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            `${res.status}: ${res.statusText} - ${await res.text()}`
          )
        }
        return res.text()
      })
      .catch((err) => {
        throw err
      })
  }
}
