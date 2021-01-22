export default ({
  route,
  redirect,
}) => {
  route.matched.forEach((item, index) => {
    item.meta.title = route.meta[index].title || '';
  })
}
