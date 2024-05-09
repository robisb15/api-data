const App =require ("../api/index.js");

const port = process.env.PORT || 3000;
App.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
