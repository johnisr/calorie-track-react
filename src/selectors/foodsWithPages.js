export default (foods, { name, sortBy, maxFoodsShown, offset }) => {
  return foods
    .filter((food) => {
      const nameMatch = food.name.toLowerCase().includes(name.toLowerCase());
      return nameMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'usage') {
        return a.timesUsed < b.timesUsed ? 1 : -1;
      } else if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
    })
    .slice((offset * maxFoodsShown), (offset * maxFoodsShown) + maxFoodsShown);
}