export interface authData {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_expires_in: string;
  token_type: string;
}

export interface Auth {
  grantType: string;
  token: string | null;
}

export interface logout {
  refresh_token: string | null;
  isInactive?: boolean;
  success?: boolean;
}

export interface IRefreshData {
  auth: Auth
  expires_in: string | null;
}

export interface userData {
  cifNumber: string;
  clientId: string;
  clientIdType: string;
}
export interface audit {
  moduleName: string;
  eventName: string;
  channelName: string;
  browserName: string;
  osVersion: string;
  ipAddress: string;
}
