export const export_profile_to_base64 = (profile) =>
{
    return btoa(unescape(encodeURIComponent(JSON.stringify(profile))))
}

export const import_profile_from_base64 = (text) =>
{
    return JSON.parse(decodeURIComponent(escape(atob(text))))
}