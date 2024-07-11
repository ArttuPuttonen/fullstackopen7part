import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import AddBlogForm from "./AddBlogForm";

test("renders content", () => {
  const blog = {
    title: "Joo",
    url: "http://joo.fi",
    votes: 2,
    user: {
      username: "joo",
      name: "Joo",
      id: "123",
    },
    author: "Author",
  };

  render(<Blog blog={blog} />);
  screen.debug();

  const titleElement = screen.getByText("Joo Author");
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "Joo",
    url: "http://joo.fi",
    votes: 2,
    user: {
      username: "joo",
      name: "Joo",
      id: "123",
    },
    author: "Author",
  };

  const mockHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      updateBlog={mockHandler}
      setSuccessMessage={vi.fn()}
      setErrorMessage={vi.fn()}
    />,
  );

  const user = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("form calls createBlog with correct details when a new blog is created", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<AddBlogForm createBlog={createBlog} />);

  const titleInput = screen.getByLabelText("title");
  const authorInput = screen.getByLabelText("author");
  const urlInput = screen.getByLabelText("url");
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "Test Title");
  await user.type(authorInput, "Test Author");
  await user.type(urlInput, "http://testurl.com");
  await user.click(sendButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith({
    title: "Test Title",
    author: "Test Author",
    url: "http://testurl.com",
  });
});
