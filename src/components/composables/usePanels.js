import { onScopeDispose, ref } from "vue"

export const usePanels = (count) =>
{
    const items = ref(Array(count).fill(false))
    const current_opened = ref(-1)
    let switch_timeout

    onScopeDispose(() => clearTimeout(switch_timeout))

    const toggle = (index = -1) =>
    {
        if (index !== -1 && (!Number.isInteger(index) || index < 0 || index >= items.value.length))
        {
            return
        }

        clearTimeout(switch_timeout)
        switch_timeout = undefined

        if (index === -1)
        {
            items.value.fill(false)
            current_opened.value = -1
            return
        }

        const previous = current_opened.value
        const was_open = previous !== -1 && items.value[previous]

        if (previous === index && was_open)
        {
            items.value[index] = false
            current_opened.value = -1
            return
        }

        if (previous !== -1)
        {
            items.value[previous] = false
        }

        if (was_open && previous !== index)
        {
            current_opened.value = -1
            switch_timeout = setTimeout(() =>
            {
                current_opened.value = index
                items.value[index] = true
                switch_timeout = undefined
            }, 100)
            return
        }

        current_opened.value = index
        items.value[index] = true
    }

    return { items, toggle }
}