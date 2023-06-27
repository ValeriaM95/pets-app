export default function SelectLimit({ onChange }) {
  return (
    <select onChange={onChange}>
      <option value="5">Limit: 5</option>
      <option value="10">Limit: 10</option>
      <option value="15">Limit: 15</option>
    </select>
  );
}
