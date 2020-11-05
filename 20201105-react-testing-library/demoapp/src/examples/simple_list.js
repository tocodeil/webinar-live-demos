export default function SimpleList(props) {
  const { items, renderLine } = props;

  return (
    <ul className="my-cool-list">
      {items.map(renderLine)}
    </ul>
  );
}

SimpleList.defaultProps = {
  renderLine(item, index) {
    return (<li key={index}>{item}</li>);
  }
};

