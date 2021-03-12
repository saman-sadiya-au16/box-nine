// const session = JSON.parse(localStorage.getItem('session'));


if (!session) {
    window.location.replace('/auth/login')
}

if(session && session.user.role === 0) {
    window.location.replace('/user')
}