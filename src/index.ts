process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { soap, ClientSSLSecurity, Client } from 'strong-soap';
import { join } from 'path';
import * as Promise from 'bluebird';
import { DevicePool } from './models';
import { DPFactory } from './device-pool';
import { InitFactory } from './init'

export class AXLClient {
  public config: any;
  public soapClientOptions: any;
  public client: Client;
  public wsUri: string;
  constructor({ host, user, pass, version }) {
    const wsDir = '/axlsqltoolkit/schema/',
      wsFn = 'AXLAPI.wsdl';
    if(version >= 12.5) {
      this.wsUri = `${wsDir}12.0/${wsFn}`;
    } else {
      this.wsUri = `${wsDir + version}/${wsFn}`;
    }
    this.wsUri = join(__dirname, this.wsUri)
    this.config = { host, user, pass };
    this.soapClientOptions = {};
  }
  createClient() {
    return new Promise((resolve, reject) =>
      soap.createClient(
        this.wsUri,
        this.soapClientOptions,
        (e, client: Client) => {
          client.setEndpoint('https://' + this.config.host + ':8443/axl/');
          client.setSecurity(new ClientSSLSecurity('', '', {
            auth: { user: this.config.user, pass: this.config.pass },
            strictSSL: false,
            rejectUnauthorized: false
          }));
          this.client = client;
          this.client.on('request', request => {
            console.log(request)
          });
          this.client.on('response', resp => {
            console.log(resp);
          })
          resolve()
        }))
  }
  handleResponse(resp: any) {
    const { return: { row }} = resp;
    // console.log(row)
    if(resp && resp.statusCode) {
      const axlCode = resp.body.match(/<axlcode>(.*)<\/axlcode>/)[1],
        axlMessage = resp.body.match(/<axlmessage>(.*)<\/axlmessage>/)[1];
      return { statusCode: resp.statusCode, axlCode, axlMessage };
    }
  }
  createDpInstance(): DPFactory {
    return new DPFactory(this);
  }
  normalizeUUID(id) {
    return id
      .replace(/\{/,'')
      .replace(/\}/,'')
  }
}

const axl = new AXLClient({
  host: '198.18.133.3',
  pass: 'dCloud123!',
  user: 'administrator',
  version: '12.0'
});

axl.createClient().then(() => {
  InitFactory(axl.client);
  // const dp = axl.createDpInstance();
  // dp.get({ name: 'dCloud_DP' }).then(console.log);
  // const newDp: DevicePool = {
  //   name: 'Test_DP2',
  //   autoSearchSpaceName: 'dCloud_CSS',
  //   dateTimeSettingName: 'CMLocal',
  //   callManagerGroupName: 'dCloud_CMGroup',
  //   mediaResourceListName: 'dCloud_MRGL',
  //   regionName: 'dCloud_Region',
  //   srstName: 'dCloud SRST Gateway',
  //   locationName: 'dCloud_Location',
  //   connectionMonitorDuration: '-1'
  // };
  // dp.add(newDp).then(console.log)
  /**
   * OK
   */
})