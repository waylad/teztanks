import { TempleWallet } from '@temple-wallet/dapp'
import { CONST, TankToken } from '../const/const'
import { MichelsonMap } from '@taquito/taquito'
import { bytes2Char, char2Bytes } from '@taquito/utils'

declare var window: any
let tezTanks: any
let accountPkh: string

export const connectWallet = async () => {
  try {
    const available = await TempleWallet.isAvailable()
    if (!available) {
      throw new Error('Temple Wallet not installed')
    }

    const wallet = new TempleWallet('TezTanks')
    await wallet.connect('ithacanet', { forcePermission: true })
    const tezos = wallet.toTezos()

    accountPkh = await tezos.wallet.pkh()
    const accountBalance = await tezos.tz.getBalance(accountPkh)
    console.log(`address: ${accountPkh}, balance: ${accountBalance}`)

    tezTanks = await tezos.wallet.at(CONST.THETANKS_CONTRACT)
  } catch (err) {
    console.error(err)
  }
}

export const getTanks = async () => {
  const tezTanksStorage = await tezTanks.storage()
  console.log('tezTanksStorage', tezTanksStorage)

  // const ledger = await tezTanksStorage.assets.ledger.get(accountPkh);
  // console.log('ledger', ledger)

  const token_metadata = await tezTanksStorage.assets.token_metadata.get(126)
  console.log('token_metadata', token_metadata)

  CONST.USER_TANKS = [
    {
      tokenId: token_metadata.token_id.toNumber(),
      tankCode: bytes2Char(token_metadata.token_info.get('tankCode')),
    },
    // {
    //   tokenId: tankId2,
    //   tankCode: tankCode2,
    // },
    // {
    //   tokenId: tankId3,
    //   tankCode: tankCode3,
    // },
    // {
    //   tokenId: tankId4,
    //   tankCode: tankCode4,
    // },
  ]
  console.log(CONST.USER_TANKS)
}

export const mintTank = async () => {
  const tokenId = 126 //Math.floor(Math.random() * 1000000)
  const address = accountPkh
  const amount = 1
  const metadata = MichelsonMap.fromLiteral({
    tankCode: char2Bytes('0000'),
  })

  const operation = await tezTanks.methods.mint(address, amount, metadata, tokenId).send()
  const confirmation = await operation.confirmation()
  console.log(confirmation)
  //await getTanks()

  // const metadata = MichelsonMap.fromLiteral({
  //   new_name: char2Bytes('0000'),
  // })
  // const operation = await tezTanks.methods.update_metadata(metadata).send()
}

export const upgradeTank = async (tank: TankToken) => {
  const metadata = MichelsonMap.fromLiteral({
    tankCode: char2Bytes(tank.tankCode),
  })
  const operation = await tezTanks.methods.update_metadata(metadata).send()
  const confirmation = await operation.confirmation()
  console.log(confirmation)
}
