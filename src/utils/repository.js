import { invoke } from '@tauri-apps/api/core';


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const pull = async (path, login, password, url) =>
{
    console.log(path, login, password, url)
	try
	{
        console.log('aaaa')
		const repositoryExists = await invoke('is_svn_repository',
		{
			svnFolderPath: path
		})
        console.log('bbb')
        console.log(repositoryExists)
		if (repositoryExists)
		{
			let x = await invoke('svn_update',
			{
				svnFolderPath: path,
				login,
				password
			})
            console.log('xxx', x)
		}
		else
		{
			let x = await invoke('svn_checkout',
			{
				svnFolderPath: path,
				login,
				password,
				url
			})
            console.log('yyy', x)
		}
		return true
	}
	catch (error)
	{
		return false
	}
}

const revert = async () =>
{
	try
	{
		await invoke('svn_revert',
		{
			svnFolderPath: userStore.repository.path
		})
		return true
	}
	catch (error)
	{
		return false
	}
}

const push = async () =>
{
	try
	{
		const svnFolderPath = userStore.repository.path
		await invoke('svn_delete', { svnFolderPath })
		await invoke('svn_add_all', { svnFolderPath })
		await invoke('svn_commit',
		{
			svnFolderPath,
			login: userStore.login,
			password: userStore.password,
			commitName: userStore.login + userStore.password
		})
		return true
	}
	catch (error)
	{
		return false
	}
}

export const repository = {
    pull,
    revert,
    push
}