import R from "ramda";
export default (root, args, ctx, info) => {
  console.log(info);
  let result = {};
  info.fieldNodes.forEach((field) => {
    field.selectionSet.selections.forEach((selection) => {
      const name = selection.name.value;
      result[name] = {}
    })
  });
  return result;
}
