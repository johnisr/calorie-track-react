export const setDataFilter = (dataFilter = 0) => ({
  type: 'SET_DATA_FILTER',
  dataFilter,
});

export const addCarbohydratesFilter = (filter = 0) => ({
  type: 'ADD_CARBOHYDRATES_FILTER',
  filter,
})
export const removeCarbohydratesFilter = (filter = 0) => ({
  type: 'REMOVE_CARBOHYDRATES_FILTER',
  filter,
})
export const addProteinFilter = (filter = 0) => ({
  type: 'ADD_PROTEIN_FILTER',
  filter,
})
export const removeProteinFilter = (filter = 0) => ({
  type: 'REMOVE_PROTEIN_FILTER',
  filter,
})
export const addFatFilter = (filter = 0) => ({
  type: 'ADD_FAT_FILTER',
  filter,
})
export const removeFatFilter = (filter = 0) => ({
  type: 'REMOVE_FAT_FILTER',
  filter,
})