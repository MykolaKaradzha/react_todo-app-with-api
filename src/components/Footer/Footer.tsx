import React, { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[];
  filter: Filter;
  removeTodo: (todoId: number) => void;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const Footer: FC<Props> = ({
  todos,
  filter,
  setFilter,
  removeTodo,
}) => {
  const handleOnClickFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    setFilter(event.currentTarget.innerText as Filter);
  };

  const filterNames = Object.values(Filter);

  const activeTodos = todos.filter(todo => !todo.completed);

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      if (!todo.completed) {
        return;
      }

      removeTodo(todo.id);
    });
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {activeTodos.length === 1 ? '1 item left' : `${activeTodos.length} items left`}
      </span>

      <nav className="filter">
        {filterNames.map(filterName => (
          <a
            key={filterName}
            href={filterName === Filter.ALL ? '#/' : `#/${filterName}`}
            onClick={handleOnClickFilter}
            className={classNames('filter__link', {
              selected: filter === filterName,
            })}
          >
            {filterName}
          </a>
        ))}
      </nav>

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
