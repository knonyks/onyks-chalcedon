import { ref } from "vue"

export const usePanels = (count) =>
{
    const items = ref(Array(count).fill(false))
    const current_opened = ref(-1)

    const toggle = (index = -1) =>
    {
        if (current_opened.value === index)
        {
            items.value[index] = !items.value[index]
            current_opened.value = items.value[index] ? index : -1
        }
        else
        {
            if (current_opened.value !== -1)
            {
                items.value[current_opened.value] = false
                setTimeout(() =>
                {
                    current_opened.value = index
                    items.value[index] = true
                }, 300)
            }
            else
            {
                current_opened.value = index
                items.value[index] = true
            }
        }
    }

    return { items, toggle }
}