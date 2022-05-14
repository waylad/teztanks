export type TankToken = {
  tokenId: number,
  tankCode: string
}

export type CONST_TYPE = {
  TEZTANKS_CONTRACT: string,
  USER_TANKS: TankToken[],
  CURRENT_TANK: TankToken | undefined,
  INVENTORY: string[],
  TANK_SIZE: number,
  ITEM_SIZE: number,
}

export let CONST: CONST_TYPE = {
  TEZTANKS_CONTRACT: '0xd4F41e807db3fc1dB431ED5f90D7331cf3b1524D',
  USER_TANKS: [],
  CURRENT_TANK: undefined,
  INVENTORY: [],
  TANK_SIZE: 60,
  ITEM_SIZE: 50,
};
