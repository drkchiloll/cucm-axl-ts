import { ObjectClass } from './index';
export interface DevicePool extends ObjectClass {
  autoSearchSpaceName?: ObjectClass|string;
  dateTimeSettingName?: ObjectClass|string;
  callManagerGroupName?: ObjectClass|string;
  mediaResourceListName?: ObjectClass|string;
  regionName?: ObjectClass|string;
  srstName?: ObjectClass|string;
  connectionMonitorDuration?: string;
  locationName?: ObjectClass|string;
  revertPriority?: string;
  singleButtonBarge?: string;
  joinAcrossLines?: string;
  callingPartyNationalPrefix?: string;
  callingPartyInternationalPrefix?: string;
  callingPartyUnknownPrefix?: string;
  callingPartySubscribePrefix?: string;
  calledPartyNationalPrefix?: string;
  calledPartyInternationalPrefix?: string;
  calledPartyUnknownPrefix?: string;
  calledPartySubscribePrefix?: string;
  localRouteGroup?: ObjectClass|string;
  automatedAlternateRoutingCssName?: ObjectClass|string;
  aarNeighborhoodName?: ObjectClass|string;
  mobilityCssName?: ObjectClass|string;
  physicalLocationName?: ObjectClass|string;
  deviceMobilityGroupName?: ObjectClass|string;
  cgpnTransformationCssName?: ObjectClass|string;
  cdpnTransformationCssName?: ObjectClass|string;
  geoLocationName?: ObjectClass|string;
  geoLocationFilterName?: ObjectClass|string;
  elinGroup?: ObjectClass|string;
}

export interface AddDevicePool {
  devicePool: {
    name: ObjectClass['name'];
    autoSearchSpaceName?: ObjectClass['name'];
    dateTimeSettingName?: ObjectClass['name'];
    callManagerGroupName?: ObjectClass['name'];
    mediaResourceListName?: ObjectClass['name'];
    regionName?: ObjectClass['name'];
    srstName?: ObjectClass['name'];
    connectionMonitorDuration?: string;
    locationName?: ObjectClass['name'];
    revertPriority?: string;
    singleButtonBarge?: string;
    joinAcrossLines?: string;
    callingPartyNationalPrefix?: string;
    callingPartyInternationalPrefix?: string;
    callingPartyUnknownPrefix?: string;
    callingPartySubscribePrefix?: string;
    calledPartyNationalPrefix?: string;
    calledPartyInternationalPrefix?: string;
    calledPartyUnknownPrefix?: string;
    calledPartySubscribePrefix?: string;
    localRouteGroup?: ObjectClass['name']
  }
}