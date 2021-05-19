import account from './modules/account'
import transaction from './modules/transaction'
import user from './modules/user'
// const debug = process.env.NODE_ENV !== 'production'

export default {
  modules: {
    account,
    transaction,
    user
  },
//   strict: debug
}