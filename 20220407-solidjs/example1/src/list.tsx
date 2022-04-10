import { For, createSignal, createMemo } from "solid-js";

export interface IListProps {
  items: Array<string>;
  renderItem?: (item: string) => Element;
}

function defaultRenderer(item: string) {
  return <li>{item}</li>
}

export default function List(props: IListProps) {
  const { items, renderItem=defaultRenderer } = props;
  const [ filter, setFilter ] = createSignal('');
  const visibleItems = createMemo(() => items.filter(item => item.includes(filter())));

  return (
    <div>
      <input type="text" value={filter()} onInput={(e) => setFilter(e.currentTarget.value)} />
      <p>Filtering by "{filter()}"</p>
      <ul>
        <For each={visibleItems()}>
          {(item, _index) => (
            renderItem(item)
          )}
        </For>
      </ul>
      <ul>
        {visibleItems().map(renderItem)}
      </ul>
    </div>
  );
}

