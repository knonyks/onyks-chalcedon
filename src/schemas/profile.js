import get_random_emoji from "../utils/emoji"

const profile = () =>
{
    return {
        name: '',
        avatar: get_random_emoji(),
        username: '',
        password: '',
        path: '',
        repository:
        {
            address: '',
            name: '',
            autoupdate: false,
            interval: 60,
        },
        web_manager:
        {
            address: ''
        },
        database:
        {
            autoupdate: false,
            address: '',
            interval: 60
        }
    }
}

export const schemas = {
    profile
}