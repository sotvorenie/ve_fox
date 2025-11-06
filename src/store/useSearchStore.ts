import {defineStore} from "pinia";
import {ref} from "vue";

const useSearchStore = defineStore("searchStore", () => {

    // текст в поле поиска
    const searchText = ref('')

    return {
        searchText,
    }
})

export default useSearchStore