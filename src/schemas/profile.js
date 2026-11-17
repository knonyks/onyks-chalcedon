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
            autoupdate: false,
            interval: 60,
        },
        web_manager:
        {
            address: ''
        },
        // database:
        // {
        //     autoupdate: false,
        //     interval: 60
        // }
    }
}

export const schemas = {
    profile
}