export async function getStaticPaths() {
  const paths = await axios
    .get(`http://localhost:5000/api/dpost/dpostids`)
    .then(function (response) {
      return response.data;
    });
  return {
    paths,
    fallback: false,
  };
}
