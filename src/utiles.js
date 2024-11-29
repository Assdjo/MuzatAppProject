export function sendUser(params) {
    let currentUser = params
    currentUser.isAuthenticated = true
    sessionStorage.setItem('user', JSON.stringify(currentUser))
}
export function recupUser() {
    const receive = sessionStorage.getItem('user')
    return JSON.parse(receive)
}
export function deleteUser() {
    sessionStorage.removeItem('user')
}