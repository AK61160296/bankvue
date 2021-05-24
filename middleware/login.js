
export default function (context) {
    const { route } = context;
    if (process.server && route.name != 'index') {
        let token = context.$cookies.get('token')
        let userDetail = {
            userName: token.userName,
            userId: parseInt(token.userId),
        }
        console.log(userDetail)
        context.store.dispatch('user/logIn', userDetail).then(() => {
           console.log('middlewareSuccess')
        });
    }
}