import { invoke } from '@tauri-apps/api/core';


const pull = async (path, login, password, url) =>
{
	try
	{
		const repositoryExists = await invoke('is_svn_repository',
		{
			svnFolderPath: path
		})
		if (repositoryExists)
		{
			await invoke('svn_update',
			{
				svnFolderPath: path,
				login,
				password
			})
		}
		else
		{
			await invoke('svn_checkout',
			{
				svnFolderPath: path,
				login,
				password,
				url
			})
		}
		return true
	}
	catch (error)
	{
		return false
	}
}

const revert = async (path) =>
{
	try
	{
		await invoke('svn_revert',
		{
			svnFolderPath: path
		})
		return true
	}
	catch (error)
	{
		return false
	}
}

const push = async (path, login, password) =>
{
	try
	{
		const svnFolderPath = path
		await invoke('svn_delete', { svnFolderPath })
		await invoke('svn_add_all', { svnFolderPath })
		await invoke('svn_commit',
		{
			svnFolderPath,
			login,
			password,
			commitName: login + password
		})
		return true
	}
	catch (error)
	{
		return false
	}
}

const reset = async (path) =>
{
	try
	{
		await invoke('svn_cleanup',
		{
			svnFolderPath: path
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
    push,
    reset
}