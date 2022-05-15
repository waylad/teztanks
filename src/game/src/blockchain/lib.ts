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

  const token_ledger = await tezTanksStorage.assets.token_ledger.get(accountPkh)
  const tokenIds = token_ledger.map((bigNum: any) => bigNum.toNumber())
  console.log('tokenIds', tokenIds)

  for (const tokenId of tokenIds) {
    const token_metadata = await tezTanksStorage.assets.token_metadata.get(tokenId)
    console.log('token_metadata', token_metadata)
    const tankCode = bytes2Char(token_metadata.token_info.get('tankCode'))
    CONST.USER_TANKS.push({
      tokenId,
      tankCode,
    })
  }

  console.log(CONST.USER_TANKS)
}

export const mintTank = async () => {
  const tokenId = Math.floor(Math.random() * 1000000)
  const address = accountPkh
  const amount = 1
  const metadata = MichelsonMap.fromLiteral({
    tankCode: char2Bytes('000'),
    image: char2Bytes('https://teztanks.com/assets/tanks/000.svg'),
  })

  const operation = await tezTanks.methods.mint(address, amount, metadata, tokenId).send()
  const confirmation = await operation.confirmation()
  console.log(confirmation)
  window.location.reload()

  // const metadata = MichelsonMap.fromLiteral({
  //   new_name: char2Bytes('000'),
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
