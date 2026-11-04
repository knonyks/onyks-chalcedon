const export_profile_from_base64 = (profile) =>
{
    return btoa(unescape(encodeURIComponent(JSON.stringify(profile))))
}

const import_profile_from_base64 = (text) =>
{
    return JSON.parse(decodeURIComponent(escape(atob(text))))
}