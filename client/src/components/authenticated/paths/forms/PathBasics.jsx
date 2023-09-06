/* eslint-disable react/prop-types */
function PathBasics({ formData, setFormData }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Path Name"
        value={formData.pathName}
        onChange={(event) => setFormData({ ...formData, pathName: event.target.value })}
      />
      <input
        type="text"
        placeholder="Your why"
        value={formData.pathWhy}
        onChange={(event) => setFormData({ ...formData, pathWhy: event.target.value })}
      />
    </div>
  );
}

export default PathBasics;
