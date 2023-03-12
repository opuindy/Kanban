export const newStyle = (isCompleted, theme) =>
  isCompleted && theme === 'light'
    ? {
        color: 'hsl(216, 15%, 57%)',
        textDecoration: 'line-through',
        textDecorationColor: 'black',
      }
    : isCompleted && theme === 'dark'
    ? {
        color: 'hsl(216, 15%, 57%)',
        textDecoration: 'line-through',
        textDecorationColor: 'white',
      }
    : undefined;

export const iD = () => new Date().getTime().toString().slice(-6);

export const title = (title) => {
  return `Delete this ${title}?`;
};

export const text = (text, title) => {
  return `  Are you sure you want to delete the
          ' ${text} ' ${title}? This action will remove all
          columns and tasks and cannot be reversed.`;
};
export const taskTexts = (text, title) => {
  return `  Are you sure you want to delete the
          ' ${text} ' ${title}? This action will remove this
          task and all subtasks associated with it and cannot be reversed.`;
};
export const taskTitle = (title) => {
  return `Delete this ${title}?`;
};
