import { ObjectClass, DevicePool } from './models';
import * as Promise from 'bluebird';
import { AXLClient } from './index';
export class DPFactory {
  private axl: AXLClient;
  constructor(axl: AXLClient) {
    this.axl = axl;
  }
  add(devicePool: DevicePool): Promise<ObjectClass['name']> {
    return this.axl.client.addDevicePool({ devicePool })
      .then(({ result }) => this.axl.normalizeUUID(result.return));
  }
  update() {}
  remove() {}
  get({ name, uuid = undefined }): Promise<DevicePool> {
    return this.axl.client.getDevicePool({ name })
      .then(({ result }) => this.parse(result.return))
  }
  list() {}
  parse({ devicePool }): DevicePool {
    const dp: DevicePool = {
      name: devicePool.name,
      uuid: this.axl.normalizeUUID(devicePool['$attributes'].uuid)
    };
    delete devicePool['$attributes'];
    delete devicePool.name;
    let keys = Object.keys(devicePool);
    return Promise.reduce(keys, (p: DevicePool, key: string) => {
      if(typeof devicePool[key] === 'string') {
        p[key] = devicePool[key];
      } else if(devicePool[key] && devicePool[key]['$attributes']) {
        p[key] = {
          uuid: this.axl.normalizeUUID(devicePool[key]['$attributes'].uuid),
          name: devicePool[key]['$value']
        }
      } else {
        p[key] = undefined;
      }
      return p;
    }, dp);
  }
}