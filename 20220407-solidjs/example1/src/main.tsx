import { For, createSignal, createMemo } from "solid-js";
import { createStore } from 'solid-js/store';
import { render } from "solid-js/web";

interface TodoItem {
  text: string;
  done: boolean;
}

interface IListProps {
  items: Array<TodoItem>;
  renderItem?: (item: TodoItem) => Element;
}

const [state, setState] = createStore({ todos: [
  { text: 'learn solid', done: false },
] });

function addTodo() {
  setState('todos', todos => [...todos, { text: 'new item', done: false }]);
  console.log(state);
}


function toggle(index: number) {
  setState('todos', index, 'done',  (c: boolean) => !c);
}

function defaultRenderer(item: TodoItem, index: number) {
  return (
    <li>
      <p>{() => { console.count('render'); return "a"} }</p>
      <input type="checkbox" checked={item.done} onInput={() => toggle(index)} />
      {item.text}
    </li>
  )
}

function List(props: IListProps) {
  const { items, renderItem=defaultRenderer } = props;
  const [ filter, setFilter ] = createSignal('');
  const visibleItems = createMemo(() => state.todos.filter(i => i.text.includes(filter())));

  return (
    <div>
      <input type={filter()} onInput={(e) => setFilter(e.currentTarget.value)} />
      <p>{JSON.stringify(visibleItems())}</p>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        <For each={visibleItems()}>
          {(item, index) => (
            renderItem(item, index())
          )}
        </For>
      </ul>
      <ul>
      {visibleItems().map(renderItem)}
      </ul>
    </div>
  );
}

function App() {
  return (
    <List items={state.todos} />
  )
}

render(() => <App />, document.getElementById("app"));

