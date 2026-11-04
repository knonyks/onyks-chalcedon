import { ref } from "vue"

export const useProfileSelector = () =>
{
    const items = ref([])
    const current_index = ref(-1)


    const handle_change = (event) =>
    {
        const detail = event?.detail ?? {}
        const selected_value = detail.value ?? -1

        current_index.value = detail.selected ? selected_value : -1
    }

    return {items, current_index, handle_change}
}