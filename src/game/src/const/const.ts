export type TankToken = {
  tokenId: number,
  tankCode: string
}

export type CONST_TYPE = {
  THETANKS_CONTRACT: string,
  USER_TANKS: TankToken[],
  CURRENT_TANK: TankToken | undefined,
  INVENTORY: string[],
  TANK_SIZE: number,
  ITEM_SIZE: number,
}

export let CONST: CONST_TYPE = {
  THETANKS_CONTRACT: 'KT1PBnKhi3ptAfx65GEDNBPobyiqTHDobwvN',
  USER_TANKS: [],
  CURRENT_TANK: undefined,
  INVENTORY: [],
  TANK_SIZE: 60,
  ITEM_SIZE: 50,
};
