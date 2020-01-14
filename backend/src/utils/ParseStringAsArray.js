export default (arrayAsString) => {
  return arrayAsString.split(',').map(a => a.trim());
}
