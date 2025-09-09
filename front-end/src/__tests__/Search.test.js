import apiClient from "../axios/axiosConfig";

//Test that the API searches the database
test('Search API works correctly', async () => {

  const response = await apiClient.post('/books/title/', { title: "The Poet X" });
  expect(response.data.length).toBeGreaterThan(0);

});