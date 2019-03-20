import * as Promise from 'bluebird';

export const InitFactory = client => {
  const axlport = client.describe().AXLAPIService.AXLPort;
  const methods = Object.keys(axlport);
  let objectClass: string;
  return Promise.reduce(methods, (cls: any, method: string) => {
    let temp = method.startsWith('add') ? method.split('add')[1]:
      method.startsWith('update') ? method.split('update')[1]:
      method.startsWith('get') ? method.split('get')[1]:
      method.startsWith('remove') ? method.split('remove')[1]:
      method.startsWith('list') ? method.split('list')[1]: method;

    if(!objectClass) {
      objectClass = temp;
      cls[objectClass] = {};
    } else if(objectClass != temp) {
      objectClass = temp;
      cls[objectClass] = {};
    }

    let methElements = axlport[method].input.body.elements;
    return Promise.reduce(methElements, (o: any, melem: any) => {
      if(melem.qname.name === 'returnedTags') {
        return Promise.map(melem.elements, (rtag: any) =>
          rtag.qname.name
        ).then(returnedTags => {
          cls[objectClass]['properties'] = returnedTags;
          return o;
        })
      } else if(melem.qname.name === 'name') {
        o[melem.qname.name] = { type: 'string' };
      } else if(melem.qname.name === 'uuid') {
        cls[objectClass]['uuid'] = { type: 'string' };
      }
      return o;
    }, {}).then(props => {
      return cls; 
    })
  }, {}).then((properties) => {
    console.log(JSON.stringify(properties));
    return properties;
  })
}