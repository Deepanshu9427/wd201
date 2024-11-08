const todoList = require("../todo"); // Adjust the path if needed

describe("Todo List Tests", () => {
  let todos;
  const formattedDate = (d) => d.toISOString().split("T")[0];
  const today = formattedDate(new Date());
  const yesterday = formattedDate(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const tomorrow = formattedDate(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  beforeEach(() => {
    todos = todoList();
  });

  test("Should add a new todo", () => {
    const todoItem = {
      title: "Test add todo",
      dueDate: today,
      completed: false,
    };
    todos.add(todoItem);
    expect(todos.all.length).toBe(1);
    expect(todos.all[0]).toEqual(todoItem);
  });

  test("Should mark a todo as complete", () => {
    const todoItem = {
      title: "Test mark complete",
      dueDate: today,
      completed: false,
    };
    todos.add(todoItem);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    todos.add({ title: "Overdue Task", dueDate: yesterday, completed: false });
    todos.add({ title: "Due Today Task", dueDate: today, completed: false });
    const overdueItems = todos.overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].dueDate).toBe(yesterday);
  });

  test("Should retrieve due today items", () => {
    todos.add({ title: "Task 1", dueDate: today, completed: false });
    todos.add({ title: "Task 2", dueDate: today, completed: true });
    const dueTodayItems = todos.dueToday();
    expect(dueTodayItems.length).toBe(2);
    expect(dueTodayItems.every((item) => item.dueDate === today)).toBe(true);
  });

  test("Should retrieve due later items", () => {
    todos.add({ title: "Future Task", dueDate: tomorrow, completed: false });
    todos.add({
      title: "Another Future Task",
      dueDate: tomorrow,
      completed: true,
    });
    const dueLaterItems = todos.dueLater();
    expect(dueLaterItems.length).toBe(2);
    expect(dueLaterItems.every((item) => item.dueDate === tomorrow)).toBe(true);
  });
});
