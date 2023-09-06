/* eslint-disable */

function PathDisciplineUnit({ onChange, idx }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Discipline Name"
        name="disciplineName"
        onChange={(e) => onChange(e, idx)}
      />
    </div>
  );
}

export default PathDisciplineUnit;
