export default function union(arr1, arr2){
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  const newArr = [...arr1];
  arr2.forEach((item) => {
    if (!arr1.includes(item)) {
      newArr.push(item);
    }
  });
  return newArr;
};
