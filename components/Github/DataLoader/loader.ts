export const uiState = reactive({
    isSimpleLoading: false,
    isAfterTextLoading: false,
    closeSimple: () => {
        uiState.isSimpleLoading = false
    },
    closeAsync: () => {
        uiState.isAfterTextLoading = false
    },
})
